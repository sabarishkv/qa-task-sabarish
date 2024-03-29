import { expect, test } from "@playwright/test";
import {
  filterOption,
  infoPageFields,
  pageUrlSauceLabs,
  productToBeAdded,
  productToBeRemoved,
} from "../testData/testData";
import { SauceLabsBase } from "../pages/SauceLabsBase";
import { LoginSauceLabsPage } from "../pages/LoginSauceLabsPage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { YourInformationPage } from "../pages/YourInformationPage";
import {
  csvInfoPageRecords,
  fileSeparator,
  testDataCSVFolder,
  testDataFolder,
} from "../../common/CommonBaseClass";
import { OverviewPage } from "../pages/OverviewPage";
import { CompletePage } from "../pages/CompletePage";

test.use({
  viewport: { width: 1440, height: 779 },
  // launchOptions: { slowMo: 600 },
});

test("Executing an e2e TC to login  to Sauce Labs", async ({ page }) => {
  const sauceLabsBase = new SauceLabsBase(page);
  const loginSauceLabsPage = new LoginSauceLabsPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const yourInformationPage = new YourInformationPage(page);
  const overviewPage = new OverviewPage(page);
  const completePage = new CompletePage(page);

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
  });

  await test.step("Post verification navigating over to the Information page", async () => {
    await productsPage.verifyCtaButton(productToBeAdded);
    await cartPage.navigateToInformationPage();
  });

  await test.step("Filling the verification page", async () => {
    await page.waitForTimeout(4000);
    await yourInformationPage.informationPageConfirmation();
    console.log(
      `The folder for Testdata is ${
        testDataCSVFolder + fileSeparator + "infoPageData.csv"
      }`
    );
    await yourInformationPage.readCSVFileData(
      testDataFolder + fileSeparator + "infoPageData.csv"
    );
    for (const testDataRecords of csvInfoPageRecords) {
      await yourInformationPage.fillInformationPageDetails(
        testDataRecords[0],
        testDataRecords[1],
        testDataRecords[2]
      );
    }
  });

  await test.step("Navigating over to information page", async () => {
    await yourInformationPage.continueButtonInformation();
  });

  await test.step("Navigating over to information page and verifying the products", async () => {
    await overviewPage.overviewPageVerification();
    await overviewPage.verifyProductPage(productToBeAdded);
    await overviewPage.storeTaxPrice();
    await overviewPage.exactTaxValue();
  });

  await test.step("Verifying the total amount", async () => {
    await overviewPage.storeOverviewProductsPrice();
    await overviewPage.storeTheUpdatedOverviewProducts();
    await overviewPage.storeTaxPrice();
    await overviewPage.exactTaxValue();
    await overviewPage.taxNumberConversion();
    await overviewPage.verifyTotalAmount();
    await overviewPage.exactTotalAmount();
    await overviewPage.totalNumberConversion();
    await overviewPage.totalPlusTax();
    await overviewPage.totalPlusTexSum();
    await overviewPage.verifyTheTotalGiven();
    await overviewPage.completeFinish();
  });

  await test.step("Navigating to complete page and redirecting over to Home page", async () => {
    await completePage.verifyCompletePageTittle();
    await completePage.verifyThankyouMessage();
    await completePage.dispatchedMessage();
    await completePage.navigateBackHome();
  });

  await test.step("Products page validation", async () => {
    await productsPage.validatingProductsPageElements();
  });
});
