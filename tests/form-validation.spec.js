const { test, expect } = require("@playwright/test");

test.describe("Form Validation Tests", () => {
test('TC-004: Form validation with empty required fields', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/form-validation');
  
  // Натискаме бутона Register без да попълваме полета
  await page.locator('button.btn-primary').click();
  
  // Проверяваме, че сме останали на страницата с формата (URL не се е променил)
  await expect(page).toHaveURL(/form-validation/);
  
  // Проверяваме, че бутонът Register все още е видим (формата не е изпратена)
  await expect(page.locator('button.btn-primary')).toBeVisible();
  
  console.log('✅ TC-004: Empty form validation passed');
});

  test("TC-005: Form submission with valid data", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/form-validation");

    // Попълваме Contact Name
    await page.locator('input[name="ContactName"]').fill("Test User");

    // Попълваме Contact Number
    await page.locator('input[name="contactnumber"]').fill("012-3456789");

    // Попълваме дата
    await page.locator('input[name="pickupdate"]').fill("2025-12-20");

    // Избираме метод на плащане - FIX: използваме label, а не value
    await page
      .locator('select[name="payment"]')
      .selectOption({ label: "cash on delivery" });

    // Изпращаме формата
    await page.locator("button.btn-primary").click();

    // Изчакваме страницата за потвърждение
    await page.waitForURL("**/form-confirmation", { timeout: 10000 });

    // Проверяваме съобщението за успешна регистрация
    const successMessage = page.locator(
      "text=Thank you for validating your ticket"
    );
    await expect(successMessage).toBeVisible();

    console.log("✅ TC-005: Valid form submission passed");
  });
});
