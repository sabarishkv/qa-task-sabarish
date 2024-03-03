import { expect } from "@playwright/test";
import { productToBeAdded } from "../testData/testData";
import { SauceLabsBase } from "./SauceLabsBase";

let productAvailable: string;

export class OverviewPage extends SauceLabsBase {
  overviewCheckout = () =>
    this.page.locator("//span[contains(text(),'Overview')]");
  overViewProductsDisplayed = () =>
    `//div[contains(text(),'${productAvailable}')]`;
  async verifyProductPage(availableProductNames: string[]): Promise<void> {
    console.log("Entering the method to verify the Product page");
    try {
      console.log(`Entered the method verifyAddProductSuccessful`);
      for (let cart = 0; cart < availableProductNames.length; cart++) {
        productAvailable = availableProductNames[cart];
        console.log(`Verifying whether ${productAvailable} is visible`);
        await this.page.waitForTimeout(3000);
        await expect(
          this.page.locator(this.overViewProductsDisplayed())
        ).toBeVisible();
        console.log(`The ${this.overViewProductsDisplayed()}} is visible`);
      }
      console.log(
        `The available products in the ${availableProductNames} are visible`
      );
    } catch (error) {
      console.log(
        "The method to verify the Product page has failed to verify all the and displayed error:  ",
        error
      );
    } 
  }

  async overviewPageVerification(): Promise<void> {
    this.assertPageLocator(this.overviewCheckout());
  }
}
