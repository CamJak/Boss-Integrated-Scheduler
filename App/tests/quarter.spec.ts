import { test, expect } from '@playwright/test';

test('quarter select works', async ({ page }) => {
  await page.goto('/');

  // more required but this is basic
  await page.getByPlaceholder('Quarter').selectOption('[object Object]');

  // // click the "new" link
  // await page.getByRole('link', { name: 'NEW' }).click();

  // // Expect a title be a string.
  // await expect(page).toHaveTitle(/^BOSS Calendar$/);

  // // check that the URL contains correct data
  // await expect(page).toHaveURL(/.*calendar\?new=true&year=202[2-9]&season=\b(Winter|Spring|Summer|Fall)$/);
});
