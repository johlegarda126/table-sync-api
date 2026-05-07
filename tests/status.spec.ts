import { test, expect } from "@playwright/test";

test("GET /status returns ok", async ({ request }) => {
  const response = await request.get("/status");
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ status: "ok" });
});
