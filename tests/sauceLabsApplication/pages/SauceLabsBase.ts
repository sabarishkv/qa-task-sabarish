import { Locator, expect } from "@playwright/test";
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
      console.log(
        `${arrayElements[verify]} is the locator in the index: ${verify}`
      );
      await expect(this.page.locator(arrayElements[verify])).toBeVisible({
        timeout: 30 * 100,
      });
      console.log(`${arrayElements[verify]} is visible on the page`);
    }
    console.log("Validations for the page elements successful");
  }

  async storeLocatorValuesToArray(
    pageLocator: Locator,
    locatorIndex: Locator,
    arrayString: string[],
    indexVal: number
  ): Promise<void> {
    console.log("Enter the method to store the Locator values");
    await this.page.waitForTimeout(6000);
    let countTest: any = await pageLocator.count();
    console.log("Count of locators available in Page:  " + countTest);
    for (let arrayIndex = countTest - 1; arrayIndex >= 0; arrayIndex--) {
      console.log(`Added the ${locatorIndex} to index : ${arrayIndex}`);
      let productName: any = await locatorIndex.allTextContents();
      arrayString.push(productName);
      indexVal++;
    }
    console.log("The method to store the Locator values is completed");
  }

  async storeLocatorValuesToArrayTrail(
    pageLocator: string,
    arrayString: string[]
  ): Promise<void> {
    console.log("Enter the method to store the Locator values");
    await this.page.waitForTimeout(6000);
    console.log(`${pageLocator} is passed`)
    let countTest: any = await this.page.locator(pageLocator).count();
    console.log("Count of locators available in Page:  " + countTest);
    for (let arrayIndex = 0; arrayIndex < countTest; arrayIndex++) {
      let updateLocator: string = `(${pageLocator})[${(arrayIndex+1)}]`;
      console.log(`Created new locator: ${updateLocator}`)
      let productPrice: any = await this.page.locator(updateLocator).textContent();
      console.log(`Added the ${productPrice} to index : ${arrayIndex}`);
      arrayString.push(productPrice);
    }
    console.log("The method to store the Locator values is completed");
  }

  async storeLocatorValuesToArrayTwo(
    pageLocator: Locator,
    arrayString: string[]
  ): Promise<void> {
    console.log("Enter the method to store the Locator values");
    await this.page.waitForTimeout(6000);
    let countTest: any = await pageLocator.count();
    console.log("Count of locators available in Page:  " + countTest);
    let productName: any = await pageLocator.allTextContents();
    arrayString.push(productName);
    console.log("The method to store the Locator values is completed");
  }

  async displayTheArrayValues(arrayValues: string[]): Promise<void> {
    console.log("Entered and values will be displayed below");
    console.log(`${arrayValues.length} is the total index`);
    for (let txt = 0; txt < arrayValues.length; txt++) {
      console.log(`The index value ins ${txt} is ${arrayValues[txt]}`);
    }
    console.log("Entered values will are displayed above");
  }

}
