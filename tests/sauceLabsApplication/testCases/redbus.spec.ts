import { test } from "@playwright/test";

test("Navigte and print leit", async ({ page }) => {
  await page.goto(
    "https://www.redbus.in/bus-tickets/hyderabad-to-bangalore?fromCityName=Hyderabad&fromCityId=124&srcCountry=IND&toCityName=Bangalore&toCityId=122&destCountry=IND&onward=17-Oct-2024&opId=0&busType=Any"
  );

  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(4000);

  await page.pause();

//   await page.locator("//button[@id='search_button']").click();
//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForTimeout(4000);

  let countOFBusses: number = await page
    .locator(
      "//div[contains(@class,'clearfix bus-item')]//div[contains(@class,'travels')]"
    )
    .count();


    console.log(countOFBusses);

  for (let i = 1; i <= countOFBusses; i++) {
    let nameOfBus: any = await page
      .locator(`(//div[contains(@class,'clearfix bus-item')]//div[contains(@class,'travels')])[${i}]`)
      .textContent();

    console.log(nameOfBus);
    await page.waitForTimeout(1000);
  }

  await page.pause();
});
