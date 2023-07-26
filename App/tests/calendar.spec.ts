import { test, expect } from "@playwright/test";

test('calendar prefetch', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'NEW' }).click();

  // Expect a title be a string.
  await expect(page).toHaveTitle(/^BOSS Calendar$/);

  await page.locator('#subject').selectOption('[object Object]');
});

// NOTE: A bit error prone. Excluding for now
// test('calendar courses load', async ({ page }) => {
//   await page.goto('/');

//   await page.getByRole('link', { name: 'NEW' }).click();

//   // Expect a title be a string.
//   await expect(page).toHaveTitle(/^BOSS Calendar$/);

//   await page.locator('#subject').selectOption('[object Object]');

//   // Expect a title be a string. (double checking gives time for courses to load)
//   await expect(page).toHaveTitle(/^BOSS Calendar$/);

//   await page.locator('#course').selectOption('[object Object]');
// });

// test('calendar sections load', async ({ page }) => {
//   await page.goto('/');

//   await page.getByRole('link', { name: 'NEW' }).click();
//   const initial: number = await page.getByRole('button', { name: '+' }).count();

//   // Expect a title be a string.
//   await expect(page).toHaveTitle(/^BOSS Calendar$/);

//   await page.locator('#subject').selectOption('[object Object]');

//   await page.locator('#course').selectOption('[object Object]');

//   // let time: number = 0;

//   await page.getByRole('button', { name: '+' }).click();
//   const final:number = await page.getByRole('button', { name: '+' }).count();
//   console.log(final)
//   
//   // while (time < 10) {
//   //   const final:number = await page.getByRole('button', { name: '+' }).count();
//   //   if (final > initial) break;
//   //   page.waitForTimeout(1);
//   //   time++;
//   // }
//   
//   // expect(time < 10).toBeTruthy();
// });

