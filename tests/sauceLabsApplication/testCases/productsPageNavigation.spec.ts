import { test } from "@playwright/test";
import { filterOption, pageUrlSauceLabs } from "../testData/testData";
import { SauceLabsBase } from "../pages/SauceLabsBase";
import { LoginSauceLabsPage } from "../pages/LoginSauceLabsPage";
import { ProductsPage } from "../pages/ProductsPage";

test("Executing an e2e TC to login  to Sauce Labs", async ({ page }) => {
  const sauceLabsBase = new SauceLabsBase(page);
  const loginSauceLabsPage = new LoginSauceLabsPage(page);
  const productsPage = new ProductsPage(page);

  await test.step("Launch Page URl and and view", async () => {
    await sauceLabsBase.launchSauceLabs(pageUrlSauceLabs);
  });

  await test.step("Enter the credentials and click Login", async () => {
    await loginSauceLabsPage.enterUserName();
    await loginSauceLabsPage.enterPassword();
    await loginSauceLabsPage.clickLogin();
  });

  await test.step("Products page validation", async () => {
    await productsPage.validatingProductsPageElements();
    await productsPage.changeFilterOption(filterOption.highToLow);
    await productsPage.storeProductsPrices();
  });

  await test.step("The Price is split for the Products", async () => {
    await productsPage.storeTheUpdatedProducts();
  });

  await test.step("Comparing the Price is as per the filter", async () => {
    await productsPage.validateTheProductsPriceInOrder();
  });
  await test.step("The Price is split for the Products", async () => {
    await productsPage.changeFilterOption(filterOption.nameZtoA);
    await productsPage.storeAvailableProductsTittles();
  });

  await test.step("Printing the Product names is as per the filter", async () => {
    await productsPage.verifyTheStoredProductNames();
  });
  await test.step("Comparing the Price is as per the filter", async () => {
    await productsPage.validateTheProductsPriceInOrder();
  });
});
