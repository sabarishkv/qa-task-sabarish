import { test } from "@playwright/test";
import { pageUrlSauceLabs } from "../testData/testData";
import { SauceLabsBase } from "../pages/SauceLabsBase";
import { LoginSauceLabsPage } from "../pages/LoginSauceLabsPage";

test("Executing an e2e TC to login  to Sauce Labs", async ({ page }, testInfo) => {
  const sauceLabsBase = new SauceLabsBase(page);
  const loginSauceLabsPage = new LoginSauceLabsPage(page);

  await test.step("Launch Page URl and and view", async () => {
    await sauceLabsBase.launchSauceLabs(pageUrlSauceLabs);
  });

  await test.step("Enter the credentials and click Login", async () => {
    await loginSauceLabsPage.enterUserName();
    await loginSauceLabsPage.enterPassword();
    await loginSauceLabsPage.clickLogin();
  });

  await test.step('Success Login', async () => {

    await page.pause();
    const screenshot = await page.screenshot();
    await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });    
  });
  
  
});
