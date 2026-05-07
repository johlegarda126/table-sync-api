import express, { Request, Response } from "express";

const app = express();
const port = Number(process.env.PORT ?? "3000");

app.get("/status", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Table Sync API running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
