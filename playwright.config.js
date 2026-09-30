import { defineConfig } from '@playwright/test';
export default defineConfig({
    testDir: './tests', fullyParallel: false, workers: 1,
    reporter: [['list'], ['json', { outputFile: 'reports/playwright.json' }]],
    use: { baseURL: process.env.SITE_URL || 'http://127.0.0.1:4173/ong-maos-que-semeiam/', browserName: 'chromium', channel: process.env.PLAYWRIGHT_CHANNEL || undefined, trace: 'retain-on-failure' },
    webServer: process.env.SITE_URL ? undefined : { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI }
});
