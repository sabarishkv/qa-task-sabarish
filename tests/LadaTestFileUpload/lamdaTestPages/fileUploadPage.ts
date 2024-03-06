import { CommonBaseClass } from "../../common/CommonBaseClass";

export class FileUploadClass extends CommonBaseClass {
  fileUploadPageLink = () =>
    this.page.locator("//a[contains(text(),'Upload File')]");
  fileUploadCtaButton = () => this.page.locator("//input[@id='file']");
  successMessage = () =>
    this.page.locator("//div[contains(text(),'File Successfully Uploaded')]");
}
