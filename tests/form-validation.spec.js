const { test, expect } = require("@playwright/test");

test.describe("Form Validation Tests", () => {
test('TC-004: Form validation with empty required fields', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/form-validation');
  
  // Click Register without filling any fields
  await page.locator('button.btn-primary').click();
  
  // Verify we are still on the form page (URL didn't change)
  await expect(page).toHaveURL(/form-validation/);
  
  // Verify the Register button is still visible (form didn't submit)
  await expect(page.locator('button.btn-primary')).toBeVisible();
  
  console.log('✅ TC-004: Empty form validation passed');
});

  test("TC-005: Form submission with valid data", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/form-validation");

    // Fill Contact Name
    await page.locator('input[name="ContactName"]').fill("Test User");

    // Fill Contact Number
    await page.locator('input[name="contactnumber"]').fill("012-3456789");

    // Fill Date
    await page.locator('input[name="pickupdate"]').fill("2025-12-20");

    // Select Payment Method - FIX: use label not value
    await page
      .locator('select[name="payment"]')
      .selectOption({ label: "cash on delivery" });

    // Submit form
    await page.locator("button.btn-primary").click();

    // Wait for confirmation page
    await page.waitForURL("**/form-confirmation", { timeout: 10000 });

    // Verify success message
    const successMessage = page.locator(
      "text=Thank you for validating your ticket"
    );
    await expect(successMessage).toBeVisible();

    console.log("✅ TC-005: Valid form submission passed");
  });
});
