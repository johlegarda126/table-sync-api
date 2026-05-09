import mongoose, { Document, Model, Schema } from 'mongoose';
import { Table } from '../types/index.js';

export interface TableDocument extends Table, Document {}

const tableSchema = new Schema<TableDocument>(
  {
    id: { type: String, required: true, unique: true },
    restaurantId: { type: String, required: true },
    number: { type: Number, required: true },
    capacity: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['disponible', 'reservada', 'ocupada'],
    },
    tableType: {
      type: String,
      required: true,
      enum: ['interior', 'exterior', 'privada', 'familiar'],
    },
    reservationId: { type: String },
  },
  {
    versionKey: false,
  },
);

tableSchema.index({ restaurantId: 1, number: 1 }, { unique: true });

export const TableEntity: Model<TableDocument> =
  mongoose.models.Table || mongoose.model<TableDocument>('Table', tableSchema);
