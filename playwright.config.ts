import { defineConfig, devices } from '@playwright/test';

const basePath = process.env.ATLAS_TEST_BASE_PATH || '/triple-m-neuromuscular-atlas/';
const url = `http://127.0.0.1:4173${basePath}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: url, trace: 'retain-on-failure' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url,
    env: { VITE_BASE_PATH: basePath },
    reuseExistingServer: !process.env.CI,
  },
});
