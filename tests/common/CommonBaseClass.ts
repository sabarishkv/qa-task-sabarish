import { Locator, Page, devices } from "@playwright/test";

export class CommonBaseClass {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async openPageUrl(pageUrl: string): Promise<void> {
    if (pageUrl != null) {
      await this.page.goto(pageUrl);
      console.log(
        `The ${pageUrl} is opened successfully in the browser ${devices}`
      );
    } else {
      console.log(
        `Cannot open as the pageUrl = ${pageUrl} in the browser ${devices}`
      );
    }
  }

  async enterTestData(pageLocaotor: Locator, testData: string): Promise<void> {
    if (testData != null) {
      await pageLocaotor.fill(testData);
      console.log(`The ${pageLocaotor} is filled with data ${testData}`);
    } else {
      console.log(
        `The ${pageLocaotor} is cannot be filled with data with testData as the value is = ${testData}`
      );
    }
  }
}
