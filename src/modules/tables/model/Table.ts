import { Table, TableStatus, TableType } from '../types/index.js';

export class TableModel implements Table {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
  status: TableStatus;
  tableType: TableType;
  reservationId?: string;

  constructor(
    restaurantId: string,
    number: number,
    capacity: number,
    tableType: TableType,
  ) {
    this.id = `${restaurantId}-${number}`;
    this.restaurantId = restaurantId;
    this.number = number;
    this.capacity = capacity;
    this.status = 'disponible';
    this.tableType = tableType;
  }
}
