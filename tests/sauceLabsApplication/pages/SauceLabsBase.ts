import { CommonBaseClass } from "../../common/CommonBaseClass";

export class SauceLabsBase extends CommonBaseClass {
  async launchSauceLabs(url: string): Promise<void> {
    await this.openPageUrl(url);
    console.log(`Navigate to ${url} is successful`)
    this.pageLoadState();
  }

  async pageLoadState(): Promise<void>{
    console.log("Explicit wait inprogress ")
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle');
    console.log("Explicit wait completed ")
  }

}
