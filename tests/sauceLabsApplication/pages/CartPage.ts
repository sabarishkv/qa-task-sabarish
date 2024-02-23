import { expect } from "@playwright/test";
import { SauceLabsBase } from "./SauceLabsBase";


let productTittle: string;

export class CartPage extends SauceLabsBase {
  cartCtaButton = () =>
    this.page.locator("//div[@id='shopping_cart_container']");
  cartPageHeading = () =>
    this.page.locator("//span[contains(text(),'Your Cart')]");
    cartPageProducts = () => this.page.locator("//div[contains(text(),'"+productTittle+"')]")

  async clickCartButton(): Promise<void> {
    console.log("Enter the method to click cart button");
    await this.clickCtaButton(this.cartCtaButton());
    console.log("The cart button is clicked");
  }

  async validateCartPageLoaded(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.cartPageHeading()).toBeVisible({timeout: 100*1000});
  }
}
