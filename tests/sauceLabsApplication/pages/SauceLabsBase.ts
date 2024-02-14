import { expect } from "@playwright/test";
import { CommonBaseClass } from "../../common/CommonBaseClass";

export class SauceLabsBase extends CommonBaseClass {
  async launchSauceLabs(url: string): Promise<void> {
    await this.openPageUrl(url);
    console.log(`Navigate to ${url} is successful`);
    this.pageLoadState();
  }

  async pageLoadState(): Promise<void> {
    console.log("Explicit wait inprogress ");
    await this.page.waitForLoadState("domcontentloaded");
   // await this.page.waitForLoadState("networkidle");
    console.log("Explicit wait completed ");
  }

  async pageElementsLoadSuccess(arrayElements: string[]): Promise<void> {
    console.log("Entered the page Validations Method");
    for (let verify = 0; verify < arrayElements.length; verify++) {
      console.log(`${arrayElements[verify]} is the locator in the index: ${verify}`)
      await expect(this.page.locator(arrayElements[verify])).toBeVisible({timeout: 30*100});
      console.log(`${arrayElements[verify]} is visible on the page`);
    }
    console.log("Validations for the page elements successful");
  }
}
