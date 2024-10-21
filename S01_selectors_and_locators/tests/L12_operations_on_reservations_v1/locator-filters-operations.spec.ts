import { test, expect } from "@playwright/test";

test.describe("Locator filters", () => {
  // https://playwright.dev/docs/locators#locator-operators

  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-reservation-v1.html");
  });

  test.describe("Finding element - reservation v1 approaches", () => {
    test("Single button click using options", async ({ page }) => {
      // Arrange:
      const elementRole = "checkbox";
      const btnElementRole = "button";
      const reserveButtonText = "Reserve";
      const checkoutButtonText = "Checkout";
      const expectedMessage = "Reservation for 23.10.2024 with features: Food for total price: 150$";
      const resultsTestId = "dti-results";

      // we can define the locators for the elements
      const checkboxLocator = page.locator('tr').nth(1).locator('td').nth(3).getByRole(elementRole);
      const reserveButtonLocator = page.getByRole(btnElementRole).getByText(reserveButtonText).nth(1);
      const checkoutButtonLocator = page.getByRole(btnElementRole).getByText(checkoutButtonText);

      const resultsLocator = page.getByTestId(resultsTestId);

      // Act:
      await checkboxLocator.check();
      await reserveButtonLocator.click();
      await checkoutButtonLocator.click();

      // Assert:
      await expect(resultsLocator).toHaveText(expectedMessage);
    });
  });
});
