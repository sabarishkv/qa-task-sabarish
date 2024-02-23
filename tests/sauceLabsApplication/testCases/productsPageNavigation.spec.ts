import { expect, test } from "@playwright/test";
import {
  filterOption,
  pageUrlSauceLabs,
  productToBeAdded,
  productToBeRemoved,
} from "../testData/testData";
import { SauceLabsBase } from "../pages/SauceLabsBase";
import { LoginSauceLabsPage } from "../pages/LoginSauceLabsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";

test.use({
  viewport: { width: 1440, height: 779 },
  launchOptions: { slowMo: 600 },
});

test("Executing an e2e TC to login  to Sauce Labs", async ({ page }) => {
  const sauceLabsBase = new SauceLabsBase(page);
  const loginSauceLabsPage = new LoginSauceLabsPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

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
  await test.step("Add the list of products available", async () => {
    await productsPage.addProductsToCart(productToBeRemoved);
    await productsPage.verifyAddProductSuccessful(productToBeRemoved);
  });
  await test.step("Remove products added", async () => {
    await productsPage.removeProductsFromCart(productToBeRemoved);
    await productsPage.verifyRemoveProductSuccessful(productToBeRemoved);
  });
  await test.step("Add the list of products available", async () => {
    await productsPage.addProductsToCart(productToBeAdded);
    await productsPage.verifyAddProductSuccessful(productToBeAdded);
  });

  await test.step("Verify the cart button to navigate to cartPage", async () => {
    await productsPage.verifyCtaButton(productToBeAdded);
  });
  await test.step("Verify the cart page over to the cartPage", async () => {
    await cartPage.clickCartButton();
    await cartPage.validateCartPageLoaded();
  });
  await test.step("Verify the added products on the cartPage", async () => {
    await cartPage.addedProductsOnCartPage(productToBeAdded);
    await page.pause();
  });
});
