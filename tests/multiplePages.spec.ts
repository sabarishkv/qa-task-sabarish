import {test} from '@playwright/test';



test('Multiple pages using browser context',async ({page,browser,context}) => {
    


    await page.goto("https://playwright.dev/docs/api/class-browsercontext");

    await page.waitForTimeout(4000);

    const childPage = await context.newPage();

    await childPage.goto("https://www.lambdatest.com/selenium-playground/");

    await childPage.waitForTimeout(4000);

    await page.pause();


})