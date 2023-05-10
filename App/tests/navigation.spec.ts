import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Scheduler/);
});

test('get started link', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expect a title be a string.
  await expect(page).toHaveTitle(/^BOSS Calendar$/);

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*calendar/);
});

test('new link', async ({ page }) => {
  await page.goto('/');

  // click the "new" link
  await page.getByRole('link', { name: 'NEW' }).click();

  // Expect a title be a string.
  await expect(page).toHaveTitle(/^BOSS Calendar$/);

  // check that the URL contains correct data
  await expect(page).toHaveURL(/.*calendar\?new=true&year=202[2-9]&season=\b(Winter|Spring|Summer|Fall)$/);
});

//test('recent link', async ({ page }) => {});

test('about page', async ({ page }) => {
  await page.goto('/');

  // navigate to about page
  await page.getByRole('link', { name: 'Learn More' }).click();

  // Expect a title to be "About"
  await expect(page).toHaveTitle(/About/);

});

test('about page github link', async ({ page }) => {
  await page.goto('/');

  // navigate to about page
  await page.getByRole('link', { name: 'Learn More' }).click();

  // Expect a title to be "About"
  await expect(page).toHaveTitle(/About/);

  // navigate to github page
  await page.getByRole('link', { name: 'Our project github repo' }).click();

  // expect title
  await expect(page).toHaveTitle(/CamJak\/Boss\-Integrated\-Scheduler:/);

});

