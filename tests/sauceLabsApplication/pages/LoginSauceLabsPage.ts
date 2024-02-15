import { SauceLabsBase } from "./SauceLabsBase";
import { validLoginData } from "../testData/testData";


export class LoginSauceLabsPage extends SauceLabsBase{


    userNameField = () => this.page.locator("//input[@id='user-name']");
    passwordField = () => this.page.locator("//input[@id='password']");
    loginButton = () => this.page.locator("//input[@id='login-button']");



    async enterUserName(): Promise<void>{

        await this.enterTestData(this.userNameField(), validLoginData.standardUser);
        console.log("The UserNameField is filled Successful")
    }
    async enterPassword(): Promise<void>{

        await this.enterTestData(this.passwordField(), validLoginData.standardPassword);
        console.log("The Password is filled Successful")
    }

    async clickLogin(): Promise<void>{
        await this.clickCtaButton(this.loginButton());
        console.log("Login is successful")
    }

}