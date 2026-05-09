import { Router } from 'express';
import { RestaurantController } from '../controllers/RestaurantController.js';
import { RestaurantService } from '../services/RestaurantService.js';

const router = Router();
const service = new RestaurantService();
const controller = new RestaurantController(service);

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);

export default router;
