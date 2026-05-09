import { Request, Response } from 'express';
import { RestaurantService } from '../services/RestaurantService.js';
import { CreateRestaurantDTO, UpdateRestaurantDTO } from '../types/index.js';

interface ServiceError {
  status?: number;
  message: string;
}

export class RestaurantController {
  private service: RestaurantService;

  constructor(service: RestaurantService) {
    this.service = service;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data: CreateRestaurantDTO = req.body;
      const restaurant = await this.service.create(data);
      res.status(201).json(restaurant);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  getAll = async (_req: Request, res: Response) => {
    try {
      const restaurants = await this.service.getAll();
      res.json(restaurants);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const restaurant = await this.service.getById(id);
      res.json(restaurant);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const data: UpdateRestaurantDTO = req.body;
      const restaurant = await this.service.update(id, data);
      res.json(restaurant);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };
}
