import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Table Management API - Acceptance Criteria", () => {
  test.beforeEach(async ({ request }) => {
    // Reset state before each test by making requests that won't conflict
  });

  test("AC1: When requesting table info, API returns id, restaurantId, number, capacity, status, tableType", async ({
    request,
  }) => {
    const createResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-001",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });

    expect(createResponse.status()).toBe(201);
    const table = await createResponse.json();

    expect(table).toHaveProperty("id");
    expect(table).toHaveProperty("restaurantId", "rest-001");
    expect(table).toHaveProperty("number", 1);
    expect(table).toHaveProperty("capacity", 4);
    expect(table).toHaveProperty("status", "disponible");
    expect(table).toHaveProperty("tableType", "interior");
  });

  test("AC2: When creating a table, API rejects capacity < 1 or > 11", async ({
    request,
  }) => {
    // Test capacity < 1
    const responseBelow = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-002",
        number: 1,
        capacity: 0,
        tableType: "interior",
      },
    });
    expect(responseBelow.status()).toBe(400);
    expect(await responseBelow.json()).toHaveProperty("error");

    // Test capacity > 11
    const responseAbove = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-002",
        number: 2,
        capacity: 12,
        tableType: "interior",
      },
    });
    expect(responseAbove.status()).toBe(400);
    expect(await responseAbove.json()).toHaveProperty("error");

    // Test valid capacity 1-11
    const validResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-002",
        number: 3,
        capacity: 1,
        tableType: "interior",
      },
    });
    expect(validResponse.status()).toBe(201);

    const validResponse11 = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-002",
        number: 4,
        capacity: 11,
        tableType: "interior",
      },
    });
    expect(validResponse11.status()).toBe(201);
  });

  test("AC3: When creating a table, API rejects invalid status values", async ({
    request,
  }) => {
    // Tables are created with 'disponible' status by default
    const response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-003",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response.status()).toBe(201);
    const table = await response.json();
    expect(table.status).toBe("disponible");

    // Try to update with invalid status
    const invalidStatusResponse = await request.put(
      `${BASE_URL}/tables/${table.id}/status`,
      {
        data: { status: "invalid_status" },
      }
    );
    expect(invalidStatusResponse.status()).toBe(400);
  });

  test("AC4: When creating a table, API rejects invalid tableType values", async ({
    request,
  }) => {
    const invalidResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-004",
        number: 1,
        capacity: 4,
        tableType: "invalid_type",
      },
    });
    expect(invalidResponse.status()).toBe(400);
    expect(await invalidResponse.json()).toHaveProperty("error");

    // Test all valid types
    const validTypes = ["interior", "exterior", "privada", "familiar"];
    for (let i = 0; i < validTypes.length; i++) {
      const validResponse = await request.post(`${BASE_URL}/tables`, {
        data: {
          restaurantId: "rest-004",
          number: i + 1,
          capacity: 4,
          tableType: validTypes[i],
        },
      });
      expect(validResponse.status()).toBe(201);
      const table = await validResponse.json();
      expect(table.tableType).toBe(validTypes[i]);
    }
  });

  test("AC5: When reserving a table, its status changes from disponible to reservada", async ({
    request,
  }) => {
    // Create a table
    const createResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-005",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table = await createResponse.json();
    expect(table.status).toBe("disponible");

    // Reserve the table
    const reserveResponse = await request.post(
      `${BASE_URL}/tables/${table.id}/reserve`,
      { data: {} }
    );
    expect(reserveResponse.status()).toBe(200);
    const reserved = await reserveResponse.json();
    expect(reserved.reservationId).toBeDefined();

    // Verify status changed
    const getResponse = await request.get(`${BASE_URL}/tables`, {
      params: { restaurantId: "rest-005" },
    });
    const tables = await getResponse.json();
    const updatedTable = tables.find((t) => t.id === table.id);
    expect(updatedTable.status).toBe("reservada");
  });

  test("AC6: When a reserved table is occupied, its status changes from reservada to ocupada", async ({
    request,
  }) => {
    // Create and reserve a table
    const createResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-006",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table = await createResponse.json();

    // Reserve it
    await request.post(`${BASE_URL}/tables/${table.id}/reserve`, {
      data: {},
    });

    // Occupy it
    const occupyResponse = await request.post(
      `${BASE_URL}/tables/${table.id}/occupy`,
      { data: {} }
    );
    expect(occupyResponse.status()).toBe(200);

    // Verify status changed to ocupada
    const getResponse = await request.get(`${BASE_URL}/tables`, {
      params: { restaurantId: "rest-006" },
    });
    const tables = await getResponse.json();
    const updatedTable = tables.find((t) => t.id === table.id);
    expect(updatedTable.status).toBe("ocupada");
  });

  test("AC7: When querying availability, API returns only tables with status disponible", async ({
    request,
  }) => {
    // Create multiple tables
    const rest007 = "rest-007";
    const table1Response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest007,
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table1 = await table1Response.json();

    const table2Response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest007,
        number: 2,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table2 = await table2Response.json();

    // Reserve one table
    await request.post(`${BASE_URL}/tables/${table1.id}/reserve`, {
      data: {},
    });

    // Query available tables
    const availableResponse = await request.get(`${BASE_URL}/tables`, {
      params: { restaurantId: rest007, status: "disponible" },
    });
    const availableTables = await availableResponse.json();

    // Should only have the unreserved table
    expect(availableTables).toHaveLength(1);
    expect(availableTables[0].id).toBe(table2.id);
    expect(availableTables[0].status).toBe("disponible");
  });

  test("AC8: When listing tables of a restaurant, response includes only tables with that restaurantId", async ({
    request,
  }) => {
    const rest008 = "rest-008";
    const otherRest = "rest-other";

    // Create tables for different restaurants
    await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest008,
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });

    await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest008,
        number: 2,
        capacity: 2,
        tableType: "exterior",
      },
    });

    await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: otherRest,
        number: 1,
        capacity: 6,
        tableType: "privada",
      },
    });

    // Get tables for specific restaurant
    const response = await request.get(`${BASE_URL}/tables`, {
      params: { restaurantId: rest008 },
    });
    const tables = await response.json();

    // Should only have 2 tables for rest008
    expect(tables).toHaveLength(2);
    expect(tables.every((t) => t.restaurantId === rest008)).toBe(true);
  });

  test("AC9: When saving a new table, API validates all required fields", async ({
    request,
  }) => {
    // Missing restaurantId
    let response = await request.post(`${BASE_URL}/tables`, {
      data: {
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response.status()).toBe(400);

    // Missing number
    response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-009",
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response.status()).toBe(400);

    // Missing capacity
    response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-009",
        number: 1,
        tableType: "interior",
      },
    });
    expect(response.status()).toBe(400);

    // Missing tableType
    response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-009",
        number: 1,
        capacity: 4,
      },
    });
    expect(response.status()).toBe(400);

    // All fields present - should succeed
    response = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-009",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response.status()).toBe(201);
  });

  test("Verify duplicate table creation is rejected", async ({ request }) => {
    const rest010 = "rest-010";
    
    // Create first table
    const response1 = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest010,
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response1.status()).toBe(201);

    // Try to create duplicate (same restaurantId and number)
    const response2 = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: rest010,
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    expect(response2.status()).toBe(409);
    expect(await response2.json()).toHaveProperty("error");
  });

  test("Verify state transitions are enforced", async ({ request }) => {
    // Create a table
    const createResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-011",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table = await createResponse.json();

    // Cannot go directly from disponible to ocupada
    const invalidTransition = await request.put(
      `${BASE_URL}/tables/${table.id}/status`,
      { data: { status: "ocupada" } }
    );
    expect(invalidTransition.status()).toBe(400);
    expect(await invalidTransition.json()).toHaveProperty("error");
  });

  test("Verify reservation cancellation returns table to disponible", async ({
    request,
  }) => {
    // Create and reserve a table
    const createResponse = await request.post(`${BASE_URL}/tables`, {
      data: {
        restaurantId: "rest-012",
        number: 1,
        capacity: 4,
        tableType: "interior",
      },
    });
    const table = await createResponse.json();

    await request.post(`${BASE_URL}/tables/${table.id}/reserve`, {
      data: {},
    });

    // Cancel reservation
    const cancelResponse = await request.delete(
      `${BASE_URL}/tables/${table.id}/reserve`
    );
    expect(cancelResponse.status()).toBe(200);

    // Verify status is back to disponible
    const getResponse = await request.get(`${BASE_URL}/tables`, {
      params: { restaurantId: "rest-012" },
    });
    const tables = await getResponse.json();
    const updatedTable = tables.find((t) => t.id === table.id);
    expect(updatedTable.status).toBe("disponible");
    expect(updatedTable.reservationId).toBeUndefined();
  });
});
