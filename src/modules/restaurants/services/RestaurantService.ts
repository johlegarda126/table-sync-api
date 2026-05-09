import { Restaurant, CreateRestaurantDTO, UpdateRestaurantDTO } from '../types/index.js';
import { RestaurantEntity } from '../model/RestaurantEntity.js';

export class RestaurantService {
  private model = RestaurantEntity;

  async create(data: CreateRestaurantDTO): Promise<Restaurant> {
    this.validateCreateData(data);

    const created = await this.model.create({
      name: data.name.trim(),
      address: data.address.trim(),
      openingHours: data.openingHours.trim(),
      closingHours: data.closingHours.trim(),
    });

    return this.mapRestaurant(created);
  }

  async getAll(): Promise<Restaurant[]> {
    const restaurants = await this.model.find().lean().exec();
    return restaurants.map(restaurant => this.mapRestaurant(restaurant as any));
  }

  async getById(id: string): Promise<Restaurant> {
    const restaurant = await this.model.findById(id).lean().exec();
    if (!restaurant) {
      throw { status: 404, message: 'Restaurant not found' };
    }
    return this.mapRestaurant(restaurant as any);
  }

  async update(id: string, data: UpdateRestaurantDTO): Promise<Restaurant> {
    const restaurant = await this.model.findById(id).exec();
    if (!restaurant) {
      throw { status: 404, message: 'Restaurant not found' };
    }

    this.validateUpdateData(data, restaurant);

    if (data.name !== undefined) restaurant.name = data.name.trim();
    if (data.address !== undefined) restaurant.address = data.address.trim();
    if (data.openingHours !== undefined) restaurant.openingHours = data.openingHours.trim();
    if (data.closingHours !== undefined) restaurant.closingHours = data.closingHours.trim();

    const updated = await restaurant.save();
    return this.mapRestaurant(updated);
  }

  async exists(id: string): Promise<boolean> {
    if (!id) {
      return false;
    }
    const exists = await this.model.exists({ _id: id });
    return Boolean(exists);
  }

  private validateCreateData(data: CreateRestaurantDTO): void {
    if (!data.name?.trim() || !data.address?.trim() || !data.openingHours?.trim() || !data.closingHours?.trim()) {
      throw { status: 400, message: 'Missing required fields' };
    }
    this.validateHours(data.openingHours.trim(), data.closingHours.trim());
  }

  private validateUpdateData(data: UpdateRestaurantDTO, current: { openingHours: string; closingHours: string }): void {
    if (data.name !== undefined && !data.name.trim()) {
      throw { status: 400, message: 'Name must not be empty' };
    }
    if (data.address !== undefined && !data.address.trim()) {
      throw { status: 400, message: 'Address must not be empty' };
    }

    const openingHours = data.openingHours !== undefined ? data.openingHours.trim() : current.openingHours;
    const closingHours = data.closingHours !== undefined ? data.closingHours.trim() : current.closingHours;

    this.validateHours(openingHours, closingHours);
  }

  private validateHours(openingHours: string, closingHours: string): void {
    if (!this.isValidHourFormat(openingHours) || !this.isValidHourFormat(closingHours)) {
      throw { status: 400, message: 'Invalid hour format, use HH:mm' };
    }

    if (this.toMinutes(openingHours) >= this.toMinutes(closingHours)) {
      throw { status: 400, message: 'openingHours must be before closingHours' };
    }
  }

  private isValidHourFormat(value: string): boolean {
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
  }

  private toMinutes(value: string): number {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
  }

  private mapRestaurant(document: any): Restaurant {
    return {
      id: document._id.toString(),
      name: document.name,
      address: document.address,
      openingHours: document.openingHours,
      closingHours: document.closingHours,
    };
  }
}
