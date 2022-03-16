import { clearInput } from "./index.js";

export const profile = async (page, delay) => {
    /* Go to Profile */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#logged", { delay: delay });
    await page.waitForSelector("#Profile", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Profile", { delay: delay });
    /* Modify password */
    await page.waitForSelector("#changePass", { visible: true });
    await page.click("#changePass", { delay: delay });
    await page.waitForSelector("input[type=password]");
    await page.type("#actualPassword", "Password1@", { delay: 50 });
    await page.type("#newPassword", "Password1@", { delay: 50 });
    await page.click("#saveEditPass", { delay: delay });
    await page.waitForTimeout(5000);
    /* Modify Photo */
    await page.waitForSelector("#changeImage", { visible: true });
    await page.click("#changeImage", { delay: delay });
    await page.waitForSelector("input[type=file]");
    const input = await page.$("input[type=file]");
    await page.waitForTimeout(delay);
    await input.uploadFile("./test/puppeteer/images/photo.jpg");
    await page.waitForTimeout(delay);
    await page.click("#saveEditPhoto", { delay: delay });
    await page.waitForTimeout(5000);
}

export const shop = async (page, delay) => {
    /* Go to my Shop */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#shop", { visible: true });
    await page.click("#shop", { delay: delay });
    await page.waitForSelector("#MyShop", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#MyShop", { delay: delay });
    /* Edit shop */
    await page.waitForSelector("#editItem", { visible: true });
    await page.click("#editItem", { delay: delay });
    await page.waitForSelector("input[type=file]");
    const input = await page.$("input[type=file]");
    await page.waitForTimeout(delay);
    await input.uploadFile("./test/puppeteer/images/photo.jpg");
    await clearInput(page, "#name");
    await page.type("#name", "The shop name", { delay: 50 });
    await clearInput(page, "#email");
    await page.type("#email", "email@email.email", { delay: 50 });
    await clearInput(page, "#phone");
    await page.type("#phone", "0303030303", { delay: 50 });
    await clearInput(page, "#city");
    await page.type("#city", "The city name", { delay: 50 });
    await clearInput(page, "#street");
    await page.type("#street", "The street name", { delay: 50 });
    await clearInput(page, "#postal");
    await page.type("#postal", "60350".toString(), { delay: 50 });
    await page.click("#saveEdit", { delay: delay });
    await page.waitForTimeout(5000);
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
    await page.waitForTimeout(3000);
}

export const product = async (page, delay) => {
    /* Go to Products */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#MyProducts", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#MyProducts", { delay: delay });
    await page.waitForTimeout(5000);
}

export const order = async (page, delay) => {
    /* Go to Orders */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#Orders", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Orders", { delay: delay });
    await page.waitForTimeout(5000);
}

export const ticket = async (page, delay) => {
    /* Go to Tickets */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#Tickets", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Tickets", { delay: delay });
    /* Go to create ticket */
    await page.waitForSelector("#ticket-create", { visible: true });
    await page.click("#ticket-create", { delay: delay });
    /* Create one Ticket */
    await page.type("input", "Lorem ipsum...", { delay: 50 });
    await page.type("textarea", "Lorem ipsum dolores curriculum vitae.......", { delay: 50 });
    await page.click("#submit", { delay: delay });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
}