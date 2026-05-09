import { test, expect, type APIRequestContext } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

async function createRestaurant(request: APIRequestContext, suffix = 'restaurant') {
  const response = await request.post(`${BASE_URL}/restaurants`, {
    data: {
      name: `Restaurante ${suffix}`,
      address: `Dirección ${suffix}`,
      openingHours: '09:00',
      closingHours: '22:00',
    },
  });

  expect(response.status()).toBe(201);
  return response.json();
}

test.describe('Restaurant Management API', () => {
  test('Create restaurant returns id and stored fields', async ({ request }) => {
    const restaurant = await createRestaurant(request, '001');

    expect(restaurant).toHaveProperty('id');
    expect(restaurant).toMatchObject({
      name: 'Restaurante 001',
      address: 'Dirección 001',
      openingHours: '09:00',
      closingHours: '22:00',
    });
  });

  test('Create restaurant rejects missing required fields', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/restaurants`, {
      data: {
        name: 'Restaurante inválido',
        address: '',
        openingHours: '09:00',
      },
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty('error');
  });

  test('Create restaurant rejects invalid opening and closing hours', async ({ request }) => {
    let response = await request.post(`${BASE_URL}/restaurants`, {
      data: {
        name: 'Restaurante invalid hours',
        address: 'Dirección inválida',
        openingHours: '22:00',
        closingHours: '09:00',
      },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty('error');

    response = await request.post(`${BASE_URL}/restaurants`, {
      data: {
        name: 'Restaurante invalid format',
        address: 'Dirección inválida',
        openingHours: '9am',
        closingHours: '22:00',
      },
    });
    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty('error');
  });

  test('List restaurants returns created restaurants', async ({ request }) => {
    const restaurantA = await createRestaurant(request, 'list-a');
    const restaurantB = await createRestaurant(request, 'list-b');

    const listResponse = await request.get(`${BASE_URL}/restaurants`);
    expect(listResponse.status()).toBe(200);
    const restaurants = await listResponse.json();
    expect(restaurants.some((item: any) => item.id === restaurantA.id)).toBe(true);
    expect(restaurants.some((item: any) => item.id === restaurantB.id)).toBe(true);
  });

  test('Get restaurant by id and update it', async ({ request }) => {
    const restaurant = await createRestaurant(request, 'update');

    const getResponse = await request.get(`${BASE_URL}/restaurants/${restaurant.id}`);
    expect(getResponse.status()).toBe(200);
    expect(await getResponse.json()).toMatchObject({
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
    });

    const updateResponse = await request.put(`${BASE_URL}/restaurants/${restaurant.id}`, {
      data: {
        name: 'Restaurante Actualizado',
        address: 'Nueva Dirección',
      },
    });
    expect(updateResponse.status()).toBe(200);
    expect(await updateResponse.json()).toMatchObject({
      id: restaurant.id,
      name: 'Restaurante Actualizado',
      address: 'Nueva Dirección',
    });
  });

  test('Table creation fails with non-existent restaurantId', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: '000000000000000000000000',
        number: 1,
        capacity: 4,
        tableType: 'interior',
      },
    });

    expect(response.status()).toBe(400);
    expect(await response.json()).toHaveProperty('error');
  });
});
