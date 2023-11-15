"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@sessionbox/toolkit");
const selenium_webdriver_1 = require("selenium-webdriver");
require('dotenv').config();
async function initializeSessionBox() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error('API_KEY is not defined.');
    }
    const { api, selenium } = await (0, toolkit_1.sessionBoxInit)(apiKey);
    return { api, selenium };
}
async function openAirbnb(selenium) {
    let driver;
    try {
        driver = await selenium.openNewProfile('temp', 'https://www.vrbo.com/');
        await new Promise(resolve => setTimeout(resolve, 5000));
        const xButton = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="close"]')), 5000);
        xButton.click();
        const signInButton1 = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//*[@id="gc-custom-header-nav-bar-acct-menu"]/button')), 5000);
        signInButton1.click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        const signInButton2 = await driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//html/body/div[1]/div[1]/div/div[1]/div[1]/div[5]/header/nav/div/div[6]/div/div[1]/div/div/div[3]/a[1]')), 5000);
        signInButton2.click();
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
    finally {
        if (driver) {
            // await new Promise(resolve => setTimeout(resolve, 10000));
            // await driver.quit();
        }
    }
}
async function main() {
    const { api, selenium } = await initializeSessionBox();
    openAirbnb(selenium);
    // await api.createProfile(ColorNames.AMBER, "Group 2", "test Github Profile", "https://www.github.com", "local")
}
main();
