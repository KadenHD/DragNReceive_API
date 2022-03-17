import fs from 'fs';
import faker from 'faker';
faker.locale = "fr";

export const initialize = async (browser, url) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 900 });
    await page.goto(url, { waitUntil: "networkidle2" });
    return page;
}

export const login = async (page, delay, email, password) => {
    /* Go to login */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#notlogged", { visible: true });
    await page.click("#notlogged", { delay: delay });
    await page.waitForSelector("#Login", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Login", { delay: delay });
    /* Login */
    await page.type("input[type=text]", email, { delay: 50 });
    await page.type("input[type=password]", password, { delay: 50 });
    await page.click("#submit", { delay: delay });
    await page.waitForNavigation();
}

export const logout = async (page, delay) => {
    /* Go to logout */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#logged", { delay: delay });
    await page.waitForSelector("#logout", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#logout", { delay: delay });
    /* Close the page */
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
    await page.close();
    await page.waitForTimeout(2000);
}

export const clearInput = async (page, element) => {
    await page.focus(element);
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');
    await page.keyboard.press('Backspace');
}

export const getRandomImage = () => {
    const dir = "./test/puppeteer/assets/images/";
    const files = fs.readdirSync(dir);
    const file = files[Math.floor(Math.random() * files.length)];
    return dir + file;
}

export const getRandomLogo = () => {
    const dir = "./test/puppeteer/assets/logos/";
    const files = fs.readdirSync(dir);
    const file = files[Math.floor(Math.random() * files.length)];
    return dir + file;
}

export const getRandomPhoto = () => {
    const dir = "./test/puppeteer/assets/photos/";
    const files = fs.readdirSync(dir);
    const file = files[Math.floor(Math.random() * files.length)];
    return dir + file;
}

export const getRandomShopName = () => {
    return (faker.company.catchPhraseAdjective() + " " + faker.company.bsNoun());
}

export const getRandomProductName = () => {
    return faker.commerce.productName();
}

export const getRandomEmail = () => {
    return ("service@" + faker.company.catchPhraseAdjective() + "-" + faker.company.bsNoun() + ".fr");
}

export const getRandomPhone = () => {
    return faker.phone.phoneNumberFormat();
}

export const getRandomCity = () => {
    return faker.address.cityName();
}

export const getRandomStreet = () => {
    return faker.address.streetAddress();
}

export const getRandomPostal = () => {
    return (`
    ${faker.datatype.number({ min: 1, max: 9 })}
    ${faker.datatype.number({ min: 1, max: 9 })}
    ${faker.datatype.number({ min: 1, max: 9 })}
    ${faker.datatype.number({ min: 1, max: 9 })}
    ${faker.datatype.number({ min: 1, max: 9 })}
    `);
}

export const getRandomTitle = () => {
    return faker.lorem.sentence(4);
}

export const getRandomContent = () => {
    return faker.lorem.sentence();
}

export const getRandomDescription = () => {
    return faker.commerce.productDescription();
}

export const getRandomPrice = () => {
    return `${faker.datatype.float()}`;
}

export const getRandomStock = () => {
    return `${faker.datatype.number({ min: 1, max: 100 })}`;
}