import mongoose, { Document, Model, Schema } from 'mongoose';
import { Restaurant } from '../types/index.js';

export interface RestaurantDocument extends Omit<Restaurant, 'id'>, Document {}

const restaurantSchema = new Schema<RestaurantDocument>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    openingHours: { type: String, required: true },
    closingHours: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

export const RestaurantEntity: Model<RestaurantDocument> =
  mongoose.models.Restaurant || mongoose.model<RestaurantDocument>('Restaurant', restaurantSchema);
