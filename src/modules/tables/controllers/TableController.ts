import { Request, Response } from 'express';
import { TableService } from '../services/TableService.js';
import { CreateTableDTO, UpdateTableStatusDTO } from '../types/index.js';

interface ServiceError {
  status?: number;
  message: string;
}

export class TableController {
  private service: TableService;

  constructor(service: TableService) {
    this.service = service;
  }

  create = async (req: Request, res: Response) => {
    try {
      const data: CreateTableDTO = req.body;
      const table = await this.service.create(data);
      res.status(201).json(table);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const filters = {
        restaurantId: req.query.restaurantId as string,
        tableType: req.query.tableType as string,
        status: req.query.status as string,
      };
      const tables = await this.service.getAll(filters);
      res.json(tables);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const data: UpdateTableStatusDTO = req.body;
      const table = await this.service.updateStatus(id, data.status);
      res.json(table);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  reserve = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await this.service.reserve(id);
      res.json(result);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  occupy = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await this.service.occupy(id);
      res.json(result);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };

  cancelReservation = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await this.service.cancelReservation(id);
      res.json(result);
    } catch (error: unknown) {
      const serviceError = error as ServiceError;
      res.status(serviceError.status ?? 500).json({ error: serviceError.message ?? 'Internal server error' });
    }
  };
}
