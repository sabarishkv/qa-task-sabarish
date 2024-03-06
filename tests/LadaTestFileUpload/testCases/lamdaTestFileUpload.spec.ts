import { test, expect, Locator } from "@playwright/test";
import { CommonBaseClass } from "../../common/CommonBaseClass";
import { pageURLLamdaTest } from "../testData/testDataLamda";
import { FileUploadClass } from "../lamdaTestPages/fileUploadPage";

test("File upload Test", async ({ page, baseURL }) => {
  const commonBaseClass = new CommonBaseClass(page);
  const fileUPloadClass = new FileUploadClass(page);

  await test.step("Navigating over to LamdaTest", async () => {
    await commonBaseClass.openPageUrl(pageURLLamdaTest);
  });

  await test.step("Navigate to the FileUpload page", async () => {
    await commonBaseClass.clickCtaButton(fileUPloadClass.fileUploadPageLink());
  });

  await test.step("Proceed to upload file", async () => {
    await fileUPloadClass.newFileUpload(
      fileUPloadClass.fileUploadCtaButton(),
      "filePhotoUpload.jpeg"
    );
  });

  await test.step("Validating the successful upload",async () => {
    await fileUPloadClass.assertPageLocator(fileUPloadClass.successMessage());
  })
});
