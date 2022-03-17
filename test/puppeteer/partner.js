import {
    clearInput,
    getRandomCity,
    getRandomContent,
    getRandomEmail,
    getRandomImage,
    getRandomLogo,
    getRandomShopName,
    getRandomProductName,
    getRandomPhone,
    getRandomPhoto,
    getRandomPostal,
    getRandomStreet,
    getRandomTitle,
    getRandomPrice,
    getRandomStock,
    getRandomDescription
} from "./index.js";

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
    await page.waitForTimeout(delay);
    const input = await page.$("input[type=file]");
    await input.uploadFile(getRandomImage());
    await page.waitForTimeout(delay);
    await page.click("#saveEditPhoto", { delay: delay });
    await page.waitForTimeout(5000);
    /* Display down page */
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
    await page.waitForTimeout(3000);
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
    await page.waitForTimeout(delay);
    const input = await page.$("input[type=file]");
    await input.uploadFile(getRandomLogo());
    await clearInput(page, "#name");
    await page.type("#name", getRandomShopName(), { delay: 50 });
    await clearInput(page, "#email");
    await page.type("#email", getRandomEmail(), { delay: 50 });
    await clearInput(page, "#phone");
    await page.type("#phone", getRandomPhone(), { delay: 50 });
    await clearInput(page, "#city");
    await page.type("#city", getRandomCity(), { delay: 50 });
    await clearInput(page, "#street");
    await page.type("#street", getRandomStreet(), { delay: 50 });
    await clearInput(page, "#postal");
    await page.type("#postal", getRandomPostal());
    await page.click("#saveEdit", { delay: delay });
    await page.waitForTimeout(5000);
    /* Display down page */
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
    await page.waitForTimeout(3000);
}

export const product = async (page, delay) => {
    /* Go to Products */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#MyProducts", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#MyProducts", { delay: delay });
    /* Go to create product  */
    await page.waitForSelector("#product-create", { visible: true });
    await page.click("#product-create", { delay: delay });
    /* Create product */
    await page.waitForSelector("input[type=file]");
    await page.waitForTimeout(delay);
    const input1 = await page.$("input[type=file]");
    await input1.uploadFile(getRandomPhoto());
    await page.type("#name", getRandomProductName(), { delay: 50 });
    await page.type("#description", getRandomDescription());
    await page.type("#price", getRandomPrice(), { delay: 50 });
    await page.type("#stock", getRandomStock(), { delay: 50 });
    await page.click("#create", { delay: delay });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
    /* See product */
    await page.waitForSelector("#view", { visible: true });
    await page.click("#view", { delay: delay });
    await page.waitForTimeout(3000);
    await page.waitForSelector("#closeView", { visible: true });
    await page.click("#closeView", { delay: delay });
    await page.waitForTimeout(delay);
    /* Modify product */
    await page.waitForSelector("#edit", { visible: true });
    await page.click("#edit", { delay: delay });
    await page.waitForSelector("input[type=file]");
    await page.waitForTimeout(delay);
    const input2 = await page.$("input[type=file]");
    await input2.uploadFile(getRandomPhoto());
    await clearInput(page, "#name");
    await page.type("#name", getRandomProductName(), { delay: 50 });
    await clearInput(page, "#price");
    await page.type("#price", getRandomPrice(), { delay: 50 });
    await clearInput(page, "#stock");
    await page.type("#stock", getRandomStock(), { delay: 50 });
    await clearInput(page, "#description");
    await page.type("#description", getRandomDescription());
    await page.click("#saveEdit", { delay: delay });
    await page.waitForTimeout(5000);
    /* Delete product */
    await page.waitForSelector("#delete", { visible: true });
    await page.click("#delete", { delay: delay });
    await page.waitForTimeout(delay);
    await page.waitForSelector("#deleteItemConfirm", { visible: true });
    await page.click("#deleteItemConfirm", { delay: delay });
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
    /* Create Ticket */
    await page.type("input", getRandomTitle(), { delay: 50 });
    await page.type("textarea", getRandomContent(), { delay: 50 });
    await page.click("#submit", { delay: delay });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
}