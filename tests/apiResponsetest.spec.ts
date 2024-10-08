import { test, expect } from "@playwright/test";

test("Finding test in array of objects", async ({ page, request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");

  //  const responseBody: any = JSON.parse(await response.text());

  const responseBody: any = await response.json();

  console.log("The data : ", responseBody);

 // let valueToFind: string = "tobias.funke@reqres.in";

  console.log("specific ", responseBody.data[2].email);

  var index = -1;
var needle = "byron.fields@reqres.in";

var filteredRes = responseBody.data.find(function(item, i){
 if(item.email === needle){
   index = i;
   return i;
 }
});

console.log("The updated index is: ", index, filteredRes);

console.log(responseBody.data[index].last_name);
});

// test.only('Finding api in pageload ',async ({page,request}) => {

//     await page.goto("https://reqres.in/");

//     await page.waitForTimeout(5000);

//     await page.locator("//li[@data-id='users']").click();

//   //  const response = await page.waitForResponse((response) => response.url().includes("api/users?page=2"));

//   //  const responsePromise = await page.waitForResponse(resp => resp.url().includes('/api/users?page=2') && resp.status() === 200);

//     const responseUrl: string = responsePromise.url();

//     console.log("response is: ", responseUrl);
//     // Assert the response status and body
//     // const responseBody = JSON.parse(await response.text());
//     // await  expect(response.status()).toBe(200);

//     // console.log("The data : ", responseBody)

// })
