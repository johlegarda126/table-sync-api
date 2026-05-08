export type TableStatus = 'disponible' | 'reservada' | 'ocupada';
export type TableType = 'interior' | 'exterior' | 'privada' | 'familiar';

export interface Table {
  id: string;
  restaurantId: string;
  number: number;
  capacity: number;
  status: TableStatus;
  tableType: TableType;
  reservationId?: string;
}

export interface CreateTableDTO {
  restaurantId: string;
  number: number;
  capacity: number;
  tableType: TableType;
}

export interface UpdateTableStatusDTO {
  status: TableStatus;
}
