# Playwright [tool] v1.0.0
Microsoft's Playwright is a cross-browser automation framework for end-to-end testing. Drives Chromium, Firefox, and WebKit (Safari) with a single API; supports parallel test execution, automatic waiting, network interception, video recording, and trace viewer for failure debugging. Industry standard E2E choice for new projects.
domain: testing

signature: (testFile: string, config?: PlaywrightConfig) -> TestResult

## External
true

## Package
@playwright/test@^1.40

## Output Type
- **Status**: passed | failed | timedOut | skipped
- **Duration**: milliseconds
- **Errors**: TestError[]
- **Attachments**:
  - screenshot
  - video
  - trace.zip
- **Retries**: integer

## Usage
```
    // playwright.config.ts
    import { defineConfig, devices } from '@playwright/test';

    export default defineConfig({
      testDir: './tests',
      fullyParallel: true,
      retries: process.env.CI ? 2 : 0,
      reporter: [['html'], ['github']],
      use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
      projects: [
        { name: 'chromium', use: devices['Desktop Chrome'] },
        { name: 'firefox',  use: devices['Desktop Firefox'] },
        { name: 'webkit',   use: devices['Desktop Safari'] },
        { name: 'mobile-safari', use: devices['iPhone 14'] },
      ],
      webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
      },
    });

    // tests/checkout.spec.ts
    import { test, expect } from '@playwright/test';

    test('user can complete checkout', async ({ page }) => {
      await page.goto('/products/widget');
      await page.getByRole('button', { name: 'Add to cart' }).click();
      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
      await page.getByRole('button', { name: 'Checkout' }).click();
      // ... fill form, submit, assert success
      await expect(page.getByText('Order confirmed')).toBeVisible({ timeout: 10000 });
    });

    // Accessibility integration via @axe-core/playwright
    import AxeBuilder from '@axe-core/playwright';

    test('homepage has no a11y violations', async ({ page }) => {
      await page.goto('/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  
```

## External
true

## Package
@playwright/test@^1.40

## Output Type
- **Status**: passed | failed | timedOut | skipped
- **Duration**: milliseconds
- **Errors**: TestError[]
- **Attachments**:
  - screenshot
  - video
  - trace.zip
- **Retries**: integer

## Usage
```
    // playwright.config.ts
    import { defineConfig, devices } from '@playwright/test';

    export default defineConfig({
      testDir: './tests',
      fullyParallel: true,
      retries: process.env.CI ? 2 : 0,
      reporter: [['html'], ['github']],
      use: {
        baseURL: 'http://localhost:3000',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
      },
      projects: [
        { name: 'chromium', use: devices['Desktop Chrome'] },
        { name: 'firefox',  use: devices['Desktop Firefox'] },
        { name: 'webkit',   use: devices['Desktop Safari'] },
        { name: 'mobile-safari', use: devices['iPhone 14'] },
      ],
      webServer: {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
      },
    });

    // tests/checkout.spec.ts
    import { test, expect } from '@playwright/test';

    test('user can complete checkout', async ({ page }) => {
      await page.goto('/products/widget');
      await page.getByRole('button', { name: 'Add to cart' }).click();
      await page.getByRole('link', { name: 'Cart' }).click();
      await expect(page.getByRole('heading', { name: 'Cart' })).toBeVisible();
      await page.getByRole('button', { name: 'Checkout' }).click();
      // ... fill form, submit, assert success
      await expect(page.getByText('Order confirmed')).toBeVisible({ timeout: 10000 });
    });

    // Accessibility integration via @axe-core/playwright
    import AxeBuilder from '@axe-core/playwright';

    test('homepage has no a11y violations', async ({ page }) => {
      await page.goto('/');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  
```
