import { expect, test } from '@playwright/test';

/**
 * Sample e2e test against the current App.tsx wiring (still routes to
 * the example capability — pomodoro routes land at Step 17). Verifies:
 *   1. The app boots and React hydrates.
 *   2. One of the three example-page render states is reachable.
 *   3. A visual baseline is committed for regression detection.
 *
 * When Step 17 lands and App.tsx switches to pomodoro routes, update
 * the assertions below to target the chronos UI (Logo, Menu, MainForm)
 * and re-bake the screenshot baseline with `npm run test:e2e:update`.
 */
test('home page boots and reaches a render state', async ({ page }) => {
  await page.goto('/');
  // Example capability shows one of: Loading..., Error: ..., or the Notes heading.
  await expect(page.locator('body')).toContainText(/Notes|Loading|Error/);
});

test('home page matches the committed visual baseline', async ({ page }) => {
  await page.goto('/');
  // Wait for the page to settle to a stable render state before snapshotting.
  await expect(page.locator('body')).toContainText(/Notes|Loading|Error/);
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('home.png', { fullPage: true });
});
