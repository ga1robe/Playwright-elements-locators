import { test, expect } from "@playwright/test";

test.describe("Locator lists", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/practice/simple-multiple-elements-no-ids.html");
  });

  test("All checkbox on page", async ({ page }) => {
    /* Arrange: */
    const elementRole = "checkbox";
    const expectedElementsCount = 5;

    /* we can define the locator for the element */
    const checkboxLocator = page.getByRole(elementRole);

    /* print the count of buttons on the page */
    console.log("number of button elements:", await checkboxLocator.count());

    /* Assert: */
    /* check if number of buttons is 5 */
    await expect(checkboxLocator).toHaveCount(expectedElementsCount);
  });

  test("action on nth checkbox", async ({ page }) => {
    /* Arrange: */
    const elementRole = "checkbox";
    const resultsTestId = "dti-results";
    const expectedMessage = "Checkbox is checked! (Opt 3!)";

    const buttonLocator = page.getByRole(elementRole);
    const resultsLocator = page.getByTestId(resultsTestId);

    /* print the count of checkboxes on the page */
    console.log("number of checkbox elements:", await buttonLocator.count());

    /* Act: */
    // click on the 3rd button (we count from 0)
    await buttonLocator.nth(2).click();

    /* display the text content of the results element */
    // console.info("results text content:", await resultsLocator.textContent());

    /* Assert: */
    await expect(resultsLocator).toHaveText(expectedMessage);
  });

  test("action on multiple checkboxes", async ({ page }) => {
    /* Arrange: */
    const elementRole = "checkbox";
    const resultsTestId = "dti-results";
    const expectedMessage1 = "Checkbox is checked! (Opt 5!)";
    const expectedMessage2 = "Checkbox is unchecked! (Opt 5!)";

    const checkboxLocator = page.getByRole(elementRole);
    const resultsLocator = page.getByTestId(resultsTestId);

    /* print the count of buttons on the page */
    console.info("number of checkbox elements:", await checkboxLocator.count());
    
    /* usage of count() method */
    let numberOfFoundCheckboxes = await checkboxLocator.count();
    for (let i = 0; i < numberOfFoundCheckboxes; i++) {
      await checkboxLocator.nth(i).click();
      /* display the text content of the results element */
      console.info("results text content:", await resultsLocator.textContent());
      /* Sub-assert: */
      await expect(resultsLocator).toHaveText("Checkbox is checked! (Opt "+(i+1)+"!)");
    }

    /* Assert: */
    await expect(resultsLocator).toHaveText(expectedMessage1);

    /* usage of all() method */
    let i = 1;
    for (const checkbox of await checkboxLocator.all()) {
      await checkbox.click();
      console.info("results text content:", await resultsLocator.textContent());
      /* Sub-assert: */
      await expect(resultsLocator).toHaveText("Checkbox is unchecked! (Opt "+i+"!)");
      i++;
    }

    /* Assert: */
    await expect(resultsLocator).toHaveText(expectedMessage2);
  });
});
