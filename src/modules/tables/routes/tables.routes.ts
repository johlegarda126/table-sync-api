import { Router } from 'express';
import { TableController } from '../controllers/TableController.js';
import { TableService } from '../services/TableService.js';

const router = Router();
const service = new TableService();
const controller = new TableController(service);

// Create table
router.post('/', controller.create);

// Get tables with filters
router.get('/', controller.getAll);

// Update table status
router.put('/:id/status', controller.updateStatus);

// Reserve table
router.post('/:id/reserve', controller.reserve);

// Occupy table
router.post('/:id/occupy', controller.occupy);

// Cancel reservation
router.delete('/:id/reserve', controller.cancelReservation);

export default router;
