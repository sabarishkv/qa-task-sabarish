import { expect } from "@playwright/test";
import { onlyPrice } from "../../common/CommonBaseClass";
import { SauceLabsBase } from "./SauceLabsBase";

const productsPageValidations: string[] = [
  "//div[contains(text(),'Swag Labs')]",
  "//span[contains(text(),'Products')]",
  "//div[@id='shopping_cart_container']",
  "//a[contains(text(),'Twitter')]",
  "//a[contains(text(),'Facebook')]",
  "//a[contains(text(),'LinkedIn')]",
  "//div[contains(normalize-space(),'Terms of Service') and contains(@class,'footer_copy')]",
];

let productPrices: string[] = [],
  indexVal: number,
  productPriceNumbers: number[] = [];

export class ProductsPage extends SauceLabsBase {
  filterDropdown = () => this.page.locator("//select[contains(@class,'sort')]");
  productsPrice = () =>
    this.page.locator(`(//div[contains(@class,'item_price')])[${indexVal}]`);
  allProductsPrice = () =>
    this.page.locator(`//div[contains(@class,'item_price')]`);
  allProductString = () => "//div[contains(@class,'item_price')]";
  activeFilterOptionValue = () => "//span[contains(@class,'active_option')]";

  async validatingProductsPageElements(): Promise<void> {
    console.log("The elements validation is started on the Products page");
    await this.pageElementsLoadSuccess(productsPageValidations);
    console.log("The elements validation is completed on the Products page");
  }

  async changeFilterOption(updateOptionLabel: string): Promise<void> {
    console.log("Updating the filter option");
    await this.filterDropdown().selectOption(updateOptionLabel);
    console.log(`${updateOptionLabel} to update successful over the filter`);
  }

  async storeProductsPrices(): Promise<void> {
    console.log("Entered the method to Store Products Prices");
    await this.storeLocatorValuesToArrayTrail(
      this.allProductString(),
      productPrices
    );
    console.log("Products Prices are stored successful");
    await this.displayTheArrayValues(productPrices);
  }

  async storeTheUpdatedProducts(): Promise<void> {
    console.log(
      "Entering the method to separate the dollar and store the String"
    );
    await this.textStringReplace(productPrices);
    console.log("Price split is successful");
  }

  async validateLowToHigh(): Promise<any> {
    console.log(
      "Entering the low to high method to compare the values in a array low to high "
    );
    let result = await this.arrayLowToHightCompare(onlyPrice);
    if (result) {
      console.log("The array is in ascending order. i.e Low to High");
    } else {
      console.log(
        "The array is not in ascending order. i.e the filter is failing"
      );
      expect(false).toBeTruthy();
    }
  }
  async validateHighToLow(): Promise<any> {
    console.log(
      "Entering the High to low method to compare the values in a array High to Low "
    );
    let result = await this.arrayHighToLowCompare(onlyPrice);
    if (result) {
      console.log("The array is in Descending order. i.e High to Low");
    } else {
      console.log(
        "The array is not in Descending order. i.e the filter is failing"
      );
      expect(false).toBeTruthy();
    }
  }

  async validateTheProductsPriceInOrder(): Promise<void> {
    let activeFilterOption: string | null = await this.page
      .locator("//span[contains(@class,'active_option')]")
      .textContent();
      console.log(`The option selected is ${activeFilterOption} over the filter`)
    if (activeFilterOption == "Price (low to high)") {
      console.log(`Executing the method validateLowToHigh()`);
      this.validateLowToHigh();
    } else if (activeFilterOption == "Price (high to low)") {
      console.log(`Executing the method validateHighToLow()`);
      this.validateHighToLow();
    } else {
      console.log("Not validating for the Naming order");
    }
  }
}
