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

export class ProductsPage extends SauceLabsBase {
  filterDropdown = () => this.page.locator("//select[contains(@class,'sort')]");

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
}
