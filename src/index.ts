import express, { Request, Response } from 'express';
import tablesRouter from './modules/tables/routes/tables.routes.js';
import restaurantsRouter from './modules/restaurants/routes/restaurants.routes.js';
import { connectDatabase } from './shared/database.js';
import { config } from './config.js';

const app = express();
const port = config.port;

app.use(express.json());

// Mount routes
app.use('/restaurants', restaurantsRouter);
app.use('/tables', tablesRouter);

// Health check
app.get('/status', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Welcome endpoint
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Table Sync API running' });
});

async function bootstrap(): Promise<void> {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

bootstrap().catch(error => {
  console.error('Application startup failed:', error);
  process.exit(1);
});
