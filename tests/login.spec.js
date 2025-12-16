const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {
  
  test('TC-001: Valid login with correct credentials', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    
    // Fill login form
    await page.locator('input[name="username"]').fill('practice');
    await page.locator('input[name="password"]').fill('SuperSecretPassword!');
    
    // Click login button
    await page.locator('button[type="submit"]').click();
    
    // Wait for navigation
    await page.waitForURL('**/secure');
    
    // Verify success message
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    
    // Verify welcome message - FIX: h3 not h2
    await expect(page.locator('h3')).toContainText('Hi, practice!');
    
    console.log('✅ TC-001 Passed');
  });

  test('TC-002: Login with invalid password', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    
    await page.locator('input[name="username"]').fill('practice');
    await page.locator('input[name="password"]').fill('wrongpassword');
    await page.locator('button[type="submit"]').click();
    
    // Verify error message
    await expect(page.locator('#flash')).toContainText('Your password is invalid');
    
    console.log('✅ TC-002 Passed');
  });

  test('TC-003: Login with empty fields', async ({ page }) => {
    await page.goto('https://practice.expandtesting.com/login');
    
    // Click login without filling fields
    await page.locator('button[type="submit"]').click();
    
    // Verify error message is visible
    await expect(page.locator('#flash')).toBeVisible();
    
    console.log('✅ TC-003 Passed');
  });
  
});
