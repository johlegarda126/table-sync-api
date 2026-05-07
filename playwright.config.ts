import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    headless: true,
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run build && node dist/index.js",
    port: 3000,
    timeout: 30000,
    reuseExistingServer: true,
  },
});
