import { defineConfig, devices } from '@playwright/test';
//import 'dotenv/config';
import { urls } from './config/urls.js';
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
     timeout: 60000,
     
  use: {
 viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },        baseURL: urls.baseURL,
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
        
     
    },
  /* Run tests in files in parallel */
 fullyParallel: true,
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,
workers: 4, // Forces 4 workers regardless of process.env.CI
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
    }
  },
  ],

});
