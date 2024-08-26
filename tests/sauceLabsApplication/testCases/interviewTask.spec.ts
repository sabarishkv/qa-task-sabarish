import { test, expect } from '@playwright/test';


test.use({

    launchOptions: { slowMo: 600 },

})

test('testing the election result', async ({ page }) => {
  await page.goto('https://results.eci.gov.in/AcResultGenJune2024/candidateswise-S0135.htm');


  let candidate: String = 'DADISETTI RAJA'
  let candidateNameCon: any =  await page.locator(`//h5[text()='${candidate}']/following-sibling::h6`).textContent();
  let candidateNameConOne: any =  await page.locator(`//h5[text()='${candidate}']/following-sibli`).textContent();


  console.log("Name of candaitate: "+ candidateNameCon);


  let Majority: any =  await page.locator(`//h5[text()='${candidate}']//ancestor::div[contains(@class,'prty')]/preceding-sibling::div//span`).textContent();

  console.log("majority of candaitate: "+ Majority);
  await page.pause();

  //console.log(Majority.replace());

});