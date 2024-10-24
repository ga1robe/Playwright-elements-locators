import { test, expect } from "@playwright/test";

test.describe("Locator filters", () => {
  // https://playwright.dev/docs/locators#locator-operators

  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-reservation-v1.html");
  });

  test.describe("Finding element - reservation v1 approaches", () => {
    test("Single button click using options", async ({ page }) => {
      // Arrange:
      const checkboxElementRole = "checkbox";
      const btnElementRole = "button";
      const reserveBtnText = "Reserve";
      const checkoutBtnText = "Checkout";
      const featureName = "Food";
      const reservationDate = "23.10.2024";
      const expectedMessage = "Reservation for "+reservationDate+" with features: "+featureName+" for total price: 150$";
      const resultsTestId = "dti-results";

      // we can define the locators for the elements
      // const checkboxLocator = page.locator('tr').nth(1).locator('td').nth(3).getByRole(checkboxElementRole);
      const checkboxLocator = page.getByRole("row", {name: featureName}).getByRole(checkboxElementRole);
      // const reserveButtonLocator = page.getByRole(btnElementRole).getByText(reserveBtnText).nth(1);
      const reserveButtonLocator = page.getByRole("row", {name: reservationDate}).getByRole(btnElementRole, {name: reserveBtnText});
      const checkoutButtonLocator = page.getByRole(btnElementRole, {name: checkoutBtnText});

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
