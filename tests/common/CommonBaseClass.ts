import { Locator, Page, devices } from "@playwright/test";
import { parse } from "csv-parse/sync";
import path from "path";
import fs from "fs";

export let onlyPrice: number[] = [],
  onlyNumber: number[];

export let csvInfoPageRecords: any[] = [];

export class CommonBaseClass {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async openPageUrl(pageUrl: string): Promise<void> {
    if (pageUrl != null) {
      await this.page.goto(pageUrl);
      console.log(
        `The ${pageUrl} is opened successfully in the browser ${devices}`
      );
    } else {
      console.log(
        `Cannot open as the pageUrl = ${pageUrl} in the browser ${devices}`
      );
    }
  }

  async enterTestData(pageLocaotor: Locator, testData: string): Promise<void> {
    if (testData != null) {
      await pageLocaotor.fill(testData);
      console.log(`The ${pageLocaotor} is filled with data ${testData}`);
    } else {
      console.log(
        `The ${pageLocaotor} is cannot be filled with data with testData as the value is = ${testData}`
      );
    }
  }

  async clickCtaButton(pageLocaotor: Locator): Promise<void> {
    if (await pageLocaotor.isVisible()) {
      await pageLocaotor.scrollIntoViewIfNeeded();
      await pageLocaotor.click();
      console.log(`The ${pageLocaotor} is clicked`);
    } else {
      console.log(`The ${pageLocaotor} is not clicked as not visible`);
    }
  }

  async textStringReplace(stringArray: string[]): Promise<void> {
    console.log(`The Array length is ${stringArray.length}`);
    for (let splitArray = 0; splitArray < stringArray.length; splitArray++) {
      console.log(
        `${stringArray[splitArray]} is the text in the index:  ${splitArray}`
      );
      let updatedString: string = stringArray[splitArray].replace("$", "");
      console.log(`${updatedString} is the in the index. ${splitArray}`);
      onlyPrice.push(parseFloat(updatedString));
    }
    for (let indexVal = 0; indexVal < onlyPrice.length; indexVal++) {
      console.log(`${onlyPrice[indexVal]} is in the index: ${indexVal}`);
    }
  }

  async arrayStringToNumber(stringArray: string[]): Promise<number[]> {
    for (let splitArray = 0; splitArray < stringArray.length; splitArray++) {
      onlyNumber.push(parseInt(stringArray[splitArray]));
      console.log(`${stringArray[splitArray]} is pushed to Only Number`);
    }
    return onlyNumber;
  }

  async arrayLowToHightCompare(numberArray: number[]): Promise<boolean> {
    for (let i = 0; i < numberArray.length - 1; i++) {
      console.log(
        `${numberArray[i]} is being compared with ${numberArray[i + 1]}`
      );
      if (numberArray[i] > numberArray[i + 1]) {
        return false;
      }
    }
    return true;
  }
  async arrayHighToLowCompare(numberArray: number[]): Promise<boolean> {
    for (let i = 0; i < numberArray.length - 1; i++) {
      console.log(
        `${numberArray[i]} is being compared with ${numberArray[i + 1]}`
      );
      if (numberArray[i] < numberArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

  async readCSVFileData(inputPath: string): Promise<any> {
    csvInfoPageRecords = parse(fs.readFileSync(inputPath),{fromLine: 2}), {
      columns: true,
      skip_empty_lines: true, 
    };
    console.log(csvInfoPageRecords);
    return csvInfoPageRecords;
  }
}

export const projectDirectory: string = process.cwd();
console.log(projectDirectory);

export const fileSeparator = path.sep;
console.log(fileSeparator);

export const testDataFolder: string =
  projectDirectory +
  fileSeparator +
  "tests" +
  fileSeparator +
  "sauceLabsApplication" +
  fileSeparator +
  "testData";

export const testDataCSVFolder: string =
  'sauceLabsApplication' + fileSeparator + "testData";
