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
  productPriceNumbers: number[] = [],
  titles: string[] = [],
  productTittle: string;

export class ProductsPage extends SauceLabsBase {
  filterDropdown = () => this.page.locator("//select[contains(@class,'sort')]");
  productsPrice = () =>
    this.page.locator(`(//div[contains(@class,'item_price')])[${indexVal}]`);
  allProductsPrice = () =>
    this.page.locator(`//div[contains(@class,'item_price')]`);
  allProductString = () => "//div[contains(@class,'item_price')]";
  activeFilterOptionValue = () => "//span[contains(@class,'active_option')]";
  nameTittles = () =>
    this.page.locator("//div[@id='inventory_container']//a/div");
  addToCartButtons = () =>
    this.page.locator(
      "//div[contains(text(),'" +
        productTittle +
        "')]/ancestor::div[contains(@class,'item_description')]//button[contains(text(),'Add to cart')]"
    );
    removeFromCartButtons = () =>
    this.page.locator(
      "//div[contains(text(),'" +
        productTittle +
        "')]/ancestor::div[contains(@class,'item_description')]//button[contains(text(),'Remove')]"
    );


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

  async validateAtoZ(): Promise<any> {
    console.log(
      "Entering the alphabetical order to validate the strings A to Z"
    );
    let result = await this.areStringsInAlphabeticalOrderAtoZ(titles);
    if (result) {
      console.log("The array is in alphabetical order. i.e A to Z");
    } else {
      console.log(
        "The array is not in alphabetical order from A to Z. i.e the filter is failing"
      );
      expect(false).toBeTruthy();
    }
  }
  async validateZtoA(): Promise<any> {
    console.log(
      "Entering the alphabetical order to validate the strings Z to A"
    );
    let result = await this.areStringsInAlphabeticalOrderZtoA(titles);
    if (result) {
      console.log("The array is in alphabetical order. i.e Z to A");
    } else {
      console.log(
        "The array is not in alphabetical order from Z to A. i.e the filter is failing"
      );
      expect(false).toBeTruthy();
    }
  }

  async validateTheProductsPriceInOrder(): Promise<void> {
    let activeFilterOption: string | null = await this.page
      .locator("//span[contains(@class,'active_option')]")
      .textContent();
    console.log(`The option selected is ${activeFilterOption} over the filter`);
    if (activeFilterOption == "Price (low to high)") {
      console.log(`Executing the method validateLowToHigh()`);
      await this.validateLowToHigh();
    } else if (activeFilterOption == "Price (high to low)") {
      console.log(`Executing the method validateHighToLow()`);
      await this.validateHighToLow();
    } else if (activeFilterOption == "Name (A to Z)") {
      console.log(`Executing the method validateAtoZ()`);
      await this.validateAtoZ();
    } else if (activeFilterOption == "Name (Z to A)") {
      console.log(`Executing the method validateZtoA()`);
      await this.validateZtoA();
    } else {
      console.log(" Can be default or option not present");
    }
  }

  async storeAvailableProductsTittles(): Promise<void> {
    let countTest: any = await this.nameTittles().count();
    console.log("Count of Tittles available" + countTest);

    for (let title = 1; title <= countTest; title++) {
      let productName: any = await this.page
        .locator(`(//div[@id='inventory_container']//a/div)[${title}]`)
        .textContent();
      titles.push(productName);
    }
  }

  async verifyTheStoredProductNames(): Promise<void> {
    console.log("Enter the method to print the store names of the tittles");
    for (let pTittle = 0; pTittle < titles.length; pTittle++) {
      console.log(
        `The names available in the index value of ${pTittle} is: ${titles[pTittle]}`
      );
    }
    console.log("All available array values are printed exiting the method");
  }

  async areStringsInAlphabeticalOrderAtoZ(strings: string[]): Promise<boolean> {
    for (let i = 0; i < strings.length - 1; i++) {
      let currentString = strings[i];
      let nextString = strings[i + 1];
      console.log(
        `The strings ${currentString} and the ${nextString} is being compared to verify whether the are in A to Z for the loop : ${i}`
      );

      // Compare the current string with the next string
      if (currentString.localeCompare(nextString) > 0) {
        return false; // Not in alphabetical order
      }
    }

    return true; // All strings are in alphabetical order
  }
  async areStringsInAlphabeticalOrderZtoA(strings: string[]): Promise<boolean> {
    for (let i = 0; i < strings.length - 1; i++) {
      let currentString = strings[i];
      let nextString = strings[i + 1];
      console.log(
        `The strings ${currentString} and the ${nextString} is being compared to verify whether they are in Z to A for the loop : ${i}`
      );

      // Compare the current string with the next string
      if (currentString.localeCompare(nextString) < 0) {
        return false; // Not in alphabetical order
      }
    }

    return true; // All strings are in alphabetical order
  }

  async addProductsToCart(availableProductNames: string[]): Promise<void> {
    console.log(`Entered the method addProductsToCart`);
    for (let cart = 0; cart < availableProductNames.length; cart++) {
      productTittle = availableProductNames[cart];
      console.log(`The product ${productTittle} will be selected`);
      await this.clickCtaButton(this.addToCartButtons());
      console.log(`The locator ${this.addToCartButtons()} Product is added`);
    }
    console.log(
      `The available products in the ${availableProductNames} are selected`
    );
  }

  async verifyAddProductSuccessful(availableProductNames: string[]): Promise<void> {
    console.log(`Entered the method verifyAddProductSuccessful`);
    for (let cart = 0; cart < availableProductNames.length; cart++) {
      productTittle = availableProductNames[cart];
      console.log(`Verifying whether ${productTittle} is visible`);
      await expect(this.removeFromCartButtons()).toBeVisible();
      console.log(`The ${this.removeFromCartButtons()} is visible`)
    }
    console.log(
      `The available products in the ${availableProductNames} are visible`
    );
  }

  async removeProductsFromCart(availableProductNames: string[]): Promise<void> {
    console.log(`Entered the method removeProductsFromCart`);
    for (let cart = 0; cart < availableProductNames.length; cart++) {
      productTittle = availableProductNames[cart];
      console.log(`The product ${productTittle} will be removed`);
      await this.clickCtaButton(this.removeFromCartButtons());
      console.log(`The locator ${this.removeFromCartButtons()} Product is removed`);
    }
    console.log(
      `The available products in the ${availableProductNames} are removed`
    );
  }

}
