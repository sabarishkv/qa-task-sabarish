import { SauceLabsBase } from "./SauceLabsBase";

export class CompletePage extends SauceLabsBase {
  completePageText = () =>
    this.page.locator("//span[contains(text(),'Complete')]");
  thankYouText = () => this.page.locator("//h2[contains(text(),'Thank you')]");
  orderDispatchedMessage = () =>
    this.page.locator("//div[contains(text(),'order has been dispatched')]");
  completeHomeButton = () =>
    this.page.locator("//button[@id='back-to-products']");

  async verifyCompletePageTittle(): Promise<void> {
    console.log("Verify whether the complete page is displayed");
    await this.assertPageLocator(this.completePageText());
  }

  async verifyThankyouMessage(): Promise<void> {
    console.log("Verify whether the Thankyou message over the Complete page");
    await this.assertPageLocator(this.thankYouText());
  }

  async dispatchedMessage(): Promise<void> {
    console.log("Verifying whether the dispatched message is displayed?");
    await this.assertPageLocator(this.orderDispatchedMessage());
  }

  async navigateBackHome(): Promise<void> {
    console.log("Clicking the button to navigate back Home");
    await this.clickCtaButton(this.completeHomeButton());
  }
}
