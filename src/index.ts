import express, { Request, Response } from "express";

const app = express();
const port = Number(process.env.PORT ?? "3000");

app.use(express.json());

interface Table {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
  status: 'disponible' | 'reservada' | 'ocupada';
  tableType: 'interior' | 'exterior' | 'privada' | 'familiar';
  reservationId?: string;
}

const tables: Table[] = [];

// Create table
app.post("/tables", (req: Request, res: Response) => {
  const { restaurantId, number, capacity, tableType } = req.body;
  if (!restaurantId || !number || !capacity || !tableType) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  if (capacity < 1 || capacity > 11) {
    return res.status(400).json({ error: "Capacity must be between 1 and 11" });
  }
  if (!['interior', 'exterior', 'privada', 'familiar'].includes(tableType)) {
    return res.status(400).json({ error: "Invalid table type" });
  }
  const id = `${restaurantId}-${number}`;
  if (tables.find(t => t.id === id)) {
    return res.status(409).json({ error: "Table already exists" });
  }
  const table: Table = { id, restaurantId, number, capacity, status: 'disponible', tableType };
  tables.push(table);
  res.status(201).json(table);
});

// Get tables with filters
app.get("/tables", (req: Request, res: Response) => {
  let filtered = tables;
  const { restaurantId, tableType, status } = req.query;
  if (restaurantId) {
    filtered = filtered.filter(t => t.restaurantId === restaurantId);
  }
  if (tableType) {
    filtered = filtered.filter(t => t.tableType === tableType);
  }
  if (status) {
    filtered = filtered.filter(t => t.status === status);
  }
  res.json(filtered);
});

// Update table status
app.put("/tables/:id/status", (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!['disponible', 'reservada', 'ocupada'].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const table = tables.find(t => t.id === id);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }
  // Validate transitions
  if (table.status === 'disponible' && status === 'ocupada') {
    return res.status(400).json({ error: "Cannot occupy a table directly from available" });
  }
  if (table.status === 'ocupada' && status === 'reservada') {
    return res.status(400).json({ error: "Cannot reserve an occupied table" });
  }
  table.status = status;
  if (status === 'disponible') {
    delete table.reservationId;
  }
  res.json(table);
});

// Reserve table
app.post("/tables/:id/reserve", (req: Request, res: Response) => {
  const { id } = req.params;
  const table = tables.find(t => t.id === id);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }
  if (table.status !== 'disponible') {
    return res.status(409).json({ error: "Table not available" });
  }
  table.status = 'reservada';
  table.reservationId = `res-${Date.now()}`; // Simple ID
  res.json({ message: "Reserved", reservationId: table.reservationId });
});

// Cancel reservation
app.delete("/tables/:id/reserve", (req: Request, res: Response) => {
  const { id } = req.params;
  const table = tables.find(t => t.id === id);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }
  if (table.status !== 'reservada') {
    return res.status(400).json({ error: "Table not reserved" });
  }
  table.status = 'disponible';
  delete table.reservationId;
  res.json({ message: "Reservation canceled" });
});

// Occupy table
app.post("/tables/:id/occupy", (req: Request, res: Response) => {
  const { id } = req.params;
  const table = tables.find(t => t.id === id);
  if (!table) {
    return res.status(404).json({ error: "Table not found" });
  }
  if (table.status !== 'reservada') {
    return res.status(409).json({ error: "Table not reserved" });
  }
  table.status = 'ocupada';
  res.json({ message: "Table occupied" });
});

app.get("/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Table Sync API running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
