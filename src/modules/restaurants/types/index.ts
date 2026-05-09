export interface Restaurant {
  id: string;
  name: string;
  address: string;
  openingHours: string;
  closingHours: string;
}

export interface CreateRestaurantDTO {
  name: string;
  address: string;
  openingHours: string;
  closingHours: string;
}

export interface UpdateRestaurantDTO {
  name?: string;
  address?: string;
  openingHours?: string;
  closingHours?: string;
}
