import { expect } from "@playwright/test";
import { SauceLabsBase } from "./SauceLabsBase";

let productTittle: string;

export class CartPage extends SauceLabsBase {
  cartCtaButton = () =>
    this.page.locator("//div[@id='shopping_cart_container']");
  cartPageHeading = () =>
    this.page.locator("//span[contains(text(),'Your Cart')]");
  cartPageProducts = () =>
    this.page.locator("//div[contains(text(),'" + productTittle + "')]");
  checkOutButton = () => this.page.locator("//button[@id='checkout']");

  async clickCartButton(): Promise<void> {
    console.log("Enter the method to click cart button");
    await this.clickCtaButton(this.cartCtaButton());
    console.log("The cart button is clicked");
  }

  async validateCartPageLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.cartPageHeading()).toBeVisible({ timeout: 100 * 1000 });
  }

  async addedProductsOnCartPage(
    availableProductNames: string[]
  ): Promise<void> {
    console.log("Entered the method to verify the products on the Cart page");
    for (let cart = 0; cart < availableProductNames.length; cart++) {
      productTittle = availableProductNames[cart];
      console.log(`Verifying whether ${productTittle} is visible`);
      await expect(this.cartPageProducts()).toBeVisible();
      console.log(`The ${this.cartPageProducts()} is visible`);
    }
    console.log(
      `The available products in the ${availableProductNames} are visible`
    );
  }

  async navigateToInformationPage(): Promise<void>{
    console.log("Entering the method to click the checkout Button");
    await this.clickCtaButton(this.checkOutButton());
    console.log("CTA button clicked successful");
  }
}
