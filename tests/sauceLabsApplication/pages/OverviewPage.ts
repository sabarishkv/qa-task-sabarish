import { expect } from "@playwright/test";
import { SauceLabsBase, locatorText } from "./SauceLabsBase";
import { productPrices } from "./ProductsPage";
import { onlyPrice } from "../../common/CommonBaseClass";

let productAvailable: string,
  totalTax: any,
  taxNumberValue: any,
  totalAmount: any,
  totalNumberValue: any,
  locatorAmount: any,
  totalOfProducts: number = 0,
  totalPlusTaxSum: number;

let finalProductPrices: string[] = [],
  overviewOnlyPrice: number[] = [];

export class OverviewPage extends SauceLabsBase {
  overviewCheckout = () =>
    this.page.locator("//span[contains(text(),'Overview')]");
  overViewProductsDisplayed = () =>
    `//div[contains(text(),'${productAvailable}')]`;
  taxForPurchase = () => this.page.locator("//div[contains(@class,'tax')]");
  totalAfterSum = () =>
    this.page.locator("//div[contains(@class,'summary_total')]");
  addedItemPrices = () => "//div[contains(@class,'item_price')]/div";

  async verifyProductPage(availableProductNames: string[]): Promise<void> {
    console.log("Entering the method to verify the Product page");
    try {
      console.log(`Entered the method verifyAddProductSuccessful`);
      for (let cart = 0; cart < availableProductNames.length; cart++) {
        productAvailable = availableProductNames[cart];
        console.log(`Verifying whether ${productAvailable} is visible`);
        await expect(
          this.page.locator(this.overViewProductsDisplayed())
        ).toBeVisible();
        console.log(`The ${this.overViewProductsDisplayed()}} is visible`);
      }
      console.log(
        `The available products in the ${availableProductNames} are visible`
      );
    } catch (error) {
      console.log(
        "The method to verify the Product page has failed to verify all the and displayed error:  ",
        error
      );
    }
  }

  async overviewPageVerification(): Promise<void> {
    this.assertPageLocator(this.overviewCheckout());
  }

  async storeTaxPrice(): Promise<void> {
    await this.storeTextContent(this.taxForPurchase());
  }
  async exactTaxValue(): Promise<void> {
    totalTax = locatorText?.replace("Tax: $", "");
    console.log(`The value fot the total tax is ${totalTax} `);
    return totalTax;
  }

  async taxNumberConversion(): Promise<void> {
    taxNumberValue = parseFloat(totalTax);
    console.log(`The value of the taxNumberValue is:  ${taxNumberValue}`);
    return taxNumberValue;
  }

  async verifyTotalAmount(): Promise<void> {
    await this.storeTextContent(this.totalAfterSum());
  }

  async exactTotalAmount(): Promise<void> {
    totalAmount = locatorText?.replace("Total: $", "");
    console.log(`The value fot the total amount is ${totalAmount} `);
    return totalAmount;
  }
  async totalNumberConversion(): Promise<void> {
    totalNumberValue = parseFloat(totalAmount);
    console.log(
      `The value of the totalNumberConversion is:  ${totalNumberValue}`
    );
    return totalNumberValue;
  }

  async totalPlusTax(): Promise<number | undefined> {
    console.log(
      "Performing total for the available Products",
      overviewOnlyPrice
    );
    let arrLength: number = overviewOnlyPrice.length;
    console.log("The length of the array: ", arrLength);
    for (let totalSumArr = 0; totalSumArr < arrLength; totalSumArr++) {
      totalOfProducts = totalOfProducts + overviewOnlyPrice[totalSumArr];
      console.log(
        `The Current sum of the Products iteration ${totalSumArr} is:  ${totalOfProducts}`
      );
    }
    console.log("The total of all the Products is:  ", totalOfProducts);
    return totalOfProducts;
  }

  async totalPlusTexSum(): Promise<void> {
    console.log(
      `Performing the total for ProductsSum: ${totalOfProducts} and the Tax: ${taxNumberValue}`
    );
    totalPlusTaxSum = totalOfProducts + taxNumberValue;
    console.log(`The total sum is: ${totalPlusTaxSum.toFixed(2)}`);
  }

  async storeOverviewProductsPrice(): Promise<string[]> {
    console.log("Entered the method to Store Products Prices");
    await this.storeLocatorValuesToArrayTrail(
      this.addedItemPrices(),
      finalProductPrices
    );
    console.log("Products Prices are stored successful");
    await this.displayTheArrayValues(finalProductPrices);
    return finalProductPrices;
  }
  async storeTheUpdatedOverviewProducts(): Promise<any> {
    console.log(
      "Entering the method to separate the dollar and store the String"
    );
    await this.textOverviewStringReplace(finalProductPrices);
    console.log("Price split is successful");
  }

  async textOverviewStringReplace(stringArray: string[]): Promise<void> {
    console.log(`The Array length is ${stringArray.length}`);
    for (let splitArray = 0; splitArray < stringArray.length; splitArray++) {
      console.log(
        `${stringArray[splitArray]} is the text in the index:  ${splitArray}`
      );
      let updatedString: string = stringArray[splitArray].replace("$", "");
      console.log(`${updatedString} is the in the index. ${splitArray}`);
      overviewOnlyPrice.push(parseFloat(updatedString));
    }
    for (let indexVal = 0; indexVal < overviewOnlyPrice.length; indexVal++) {
      console.log(
        `${overviewOnlyPrice[indexVal]} is in the index: ${indexVal}`
      );
    }
  }

  async verifyTheTotalGiven(): Promise<void> {
    console.log("Entering the method to verify total of the Products");
    if (totalPlusTaxSum.toFixed(2) == totalNumberValue) {
      console.log(
        `The Total calculation ${totalPlusTaxSum.toFixed(
          2
        )} == ${totalNumberValue} is provided is working as expected`
      );
    } else {
      console.log(
        `The Total calculation ${totalPlusTaxSum.toFixed(
          2
        )} != ${totalNumberValue} is provided is not working as expected failing the TC`
      );
      expect(false).toBeTruthy();
    }
  }
}
