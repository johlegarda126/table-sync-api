import { Table, TableStatus, CreateTableDTO } from '../types/index.js';
import { TableEntity } from '../model/TableEntity.js';

export class TableService {
  private model = TableEntity;

  async create(data: CreateTableDTO): Promise<Table> {
    this.validateTableData(data);

    const id = `${data.restaurantId}-${data.number}`;
    const existing = await this.model.findOne({ id }).lean().exec();
    if (existing) {
      throw { status: 409, message: 'Table already exists' };
    }

    const created = await this.model.create({
      id,
      restaurantId: data.restaurantId,
      number: data.number,
      capacity: data.capacity,
      tableType: data.tableType,
      status: 'disponible',
    });

    return created.toObject() as Table;
  }

  async getAll(filters?: {
    restaurantId?: string;
    tableType?: string;
    status?: string;
  }): Promise<Table[]> {
    const query: Record<string, unknown> = {};

    if (filters?.restaurantId) {
      query.restaurantId = filters.restaurantId;
    }
    if (filters?.tableType) {
      query.tableType = filters.tableType;
    }
    if (filters?.status) {
      query.status = filters.status;
    }

    const tables = await this.model.find(query).lean().exec();
    return tables as Table[];
  }

  async getById(id: string): Promise<Table> {
    const table = await this.model.findOne({ id }).lean().exec();
    if (!table) {
      throw { status: 404, message: 'Table not found' };
    }
    return table as Table;
  }

  async updateStatus(id: string, newStatus: TableStatus): Promise<Table> {
    const table = await this.model.findOne({ id }).exec();
    if (!table) {
      throw { status: 404, message: 'Table not found' };
    }

    if (!['disponible', 'reservada', 'ocupada'].includes(newStatus)) {
      throw { status: 400, message: 'Invalid status' };
    }

    this.validateTransition(table.status, newStatus);
    table.status = newStatus;

    if (newStatus === 'disponible') {
      table.reservationId = undefined;
    }

    const updated = await table.save();
    return updated.toObject() as Table;
  }

  async reserve(id: string): Promise<{ message: string; reservationId: string }> {
    const table = await this.model.findOne({ id }).exec();
    if (!table) {
      throw { status: 404, message: 'Table not found' };
    }

    if (table.status !== 'disponible') {
      throw { status: 409, message: 'Table not available' };
    }

    table.status = 'reservada';
    table.reservationId = `res-${Date.now()}`;
    await table.save();

    return { message: 'Reserved', reservationId: table.reservationId };
  }

  async occupy(id: string): Promise<{ message: string }> {
    const table = await this.model.findOne({ id }).exec();
    if (!table) {
      throw { status: 404, message: 'Table not found' };
    }

    if (table.status !== 'reservada') {
      throw { status: 409, message: 'Table not reserved' };
    }

    table.status = 'ocupada';
    await table.save();

    return { message: 'Table occupied' };
  }

  async cancelReservation(id: string): Promise<{ message: string }> {
    const table = await this.model.findOne({ id }).exec();
    if (!table) {
      throw { status: 404, message: 'Table not found' };
    }

    if (table.status !== 'reservada') {
      throw { status: 400, message: 'Table not reserved' };
    }

    table.status = 'disponible';
    table.reservationId = undefined;
    await table.save();

    return { message: 'Reservation canceled' };
  }

  private validateTableData(data: CreateTableDTO): void {
    if (!data.restaurantId || !data.number || !data.capacity || !data.tableType) {
      throw { status: 400, message: 'Missing required fields' };
    }

    if (data.capacity < 1 || data.capacity > 11) {
      throw { status: 400, message: 'Capacity must be between 1 and 11' };
    }

    if (!['interior', 'exterior', 'privada', 'familiar'].includes(data.tableType)) {
      throw { status: 400, message: 'Invalid table type' };
    }
  }

  private validateTransition(currentStatus: TableStatus, newStatus: TableStatus): void {
    if (currentStatus === 'disponible' && newStatus === 'ocupada') {
      throw {
        status: 400,
        message: 'Cannot occupy a table directly from available',
      };
    }

    if (currentStatus === 'ocupada' && newStatus === 'reservada') {
      throw {
        status: 400,
        message: 'Cannot reserve an occupied table',
      };
    }
  }
}
