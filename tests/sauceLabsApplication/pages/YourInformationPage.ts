import { expect } from "@playwright/test";
import { SauceLabsBase } from "./SauceLabsBase";

let fieldName: string;

export class YourInformationPage extends SauceLabsBase {
  firstName = () => this.page.locator("//input[@id='first-name']");
  lastName = () => this.page.locator("//input[@id='last-name']");
  zipCodeField = () => this.page.locator("//input[@id='postal-code']");
  checkOutHeading = () =>
    "//span[contains(text(),'Checkout: Your Information')]";

  infoPageInputField = () => this.page.locator(`//input[@id=${fieldName}]`);

  async fillInformationPageDetails(
    testUserName: string,
    testUserLastName: string,
    testZipCode: string
  ): Promise<void> {
    console.log("Entered the method to fill the data");
    await this.enterTestData(this.firstName(), testUserName);
    await this.enterTestData(this.lastName(), testUserLastName);
    await this.enterTestData(this.zipCodeField(), testZipCode);
    console.log("Data is filled");
  }

  async informationPageConfirmation(): Promise<void> {
    console.log("Entering Information Page Verification");
    await expect(this.page.locator(this.checkOutHeading())).toBeVisible({
      timeout: 300 * 100,
    });
    console.log(" Information Page Verification Successful");
  }

  async availableFieldsVerification(fieldID: string[]): Promise<void> {
    console.log("Entered the method to verify the products on the Information page");
    for (let cart = 0; cart < fieldID.length; cart++) {
      fieldName = fieldID[cart];
      console.log(`Verifying whether ${fieldName} is visible`);
      await expect(this.infoPageInputField()).toBeVisible();
      console.log(`The ${this.infoPageInputField()} is visible`);
    }
    console.log(`The available products in the ${fieldID} are visible`);
  }
}
