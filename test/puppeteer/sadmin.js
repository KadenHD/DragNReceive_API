import { clearInput, getRandomImage, getRandomContent } from "./index.js";

export const profile = async (page, delay) => {
    /* Go to Profile */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#logged", { delay: delay });
    await page.waitForSelector("#Profile", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Profile", { delay: delay });
    /* Modify user */
    await page.waitForSelector("#changeInfo", { visible: true });
    await page.click("#changeInfo", { delay: delay });
    await page.waitForSelector("input[type=text]");
    await clearInput(page, "#lastname");
    await page.type("#lastname", "Sadmin", { delay: 50 });
    await clearInput(page, "#firstname");
    await page.type("#firstname", "Sadmin", { delay: 50 });
    await clearInput(page, "#email");
    await page.type("#email", "sadmin@sadmin.sadmin", { delay: 50 });
    await page.click("#saveEdit", { delay: delay });
    await page.waitForTimeout(5000);
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
}

export const user = async (page, delay) => {
    /* Go to Users */
    await page.waitForSelector("#drawer", { visible: true });
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#admin", { visible: true });
    await page.click("#admin", { delay: delay });
    await page.waitForSelector("#Users", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Users", { delay: delay });
    /* Go to create user */
    await page.waitForSelector("#user-create", { visible: true });
    await page.click("#user-create", { delay: delay });
    /* Create User */
    await page.waitForSelector("#role", { visible: true });
    await page.click("#role", { delay: delay });
    await page.waitForTimeout(3000);
    await page.click("#lastname", { delay: delay }); // not really the best way to do it x)
    await page.type("#lastname", "Aaaa-Test", { delay: 50 });
    await page.type("#firstname", "Aaaa-Test", { delay: 50 });
    await page.type("#email", "test@test.test", { delay: 50 });
    await page.click("#save", { delay: delay });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
    /* View User */
    await page.waitForSelector("#viewItem", { visible: true });
    await page.click("#viewItem", { delay: delay });
    await page.waitForTimeout(3000);
    await page.waitForSelector("#closeView", { visible: true });
    await page.click("#closeView", { delay: delay });
    await page.waitForTimeout(delay);
    /* Edit User */
    await page.waitForSelector("#editItem", { visible: true });
    await page.click("#editItem", { delay: delay });
    await page.waitForTimeout(delay);
    await clearInput(page, "#lastname");
    await page.type("#lastname", "Aaaa-Test", { delay: 50 });
    await clearInput(page, "#firstname");
    await page.type("#firstname", "Aaaa-Test", { delay: 50 });
    await clearInput(page, "#email");
    await page.type("#email", "test@test.test", { delay: 50 });
    await page.click("#saveEdit", { delay: delay });
    await page.waitForTimeout(5000);
    /* Delete User */
    await page.waitForSelector("#deleteItem", { visible: true });
    await page.click("#deleteItem", { delay: delay });
    await page.waitForTimeout(delay);
    await page.waitForSelector("#deleteItemConfirm", { visible: true });
    await page.click("#deleteItemConfirm", { delay: delay });
    await page.waitForTimeout(5000);
}

export const shop = async (page, delay) => {
    /* Go to Shops */
    await page.waitForSelector("#drawer", { visible: true });
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#Shops", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Shops", { delay: delay });
    /* Go to create Shop */
    await page.waitForSelector("#shop-create", { visible: true });
    await page.click("#shop-create", { delay: delay });
    /* Create Shop */
    await page.waitForSelector("#name", { visible: true });
    await page.type("#name", "test-shop", { delay: 50 });
    await page.type("#email", "test@test.test", { delay: 50 });
    await page.click("#save", { delay: delay });
    await page.waitForNavigation();
    await page.waitForTimeout(5000);
    /* Search by email */
    await page.waitForSelector("input[type=text]", { visible: true });
    await page.type("input[type=text]", "test@test.test", { delay: 50 });
    await page.waitForTimeout(3000);
    /* View Shop */
    await page.waitForSelector("#viewItem", { visible: true });
    await page.click("#viewItem", { delay: delay });
    await page.waitForTimeout(3000);
    await page.evaluate(() => { window.scrollBy(0, window.innerHeight); });
    await page.waitForTimeout(3000);
    await page.waitForSelector("#goBack", { visible: true });
    await page.click("#goBack", { delay: delay });
    await page.waitForTimeout(3000);
    /* Search by email */
    await page.waitForSelector("input[type=text]", { visible: true });
    await page.type("input[type=text]", "test@test.test", { delay: 50 });
    await page.waitForTimeout(3000);
    /* Delete Shop */
    await page.waitForSelector("#deleteItem", { visible: true });
    await page.click("#deleteItem", { delay: delay });
    await page.waitForTimeout(delay);
    await page.waitForSelector("#deleteItemConfirm", { visible: true });
    await page.click("#deleteItemConfirm", { delay: delay });
    await page.waitForTimeout(5000);
}

export const ticket = async (page, delay) => {
    /* Go to Tickets */
    await page.waitForSelector("#drawer", { visible: true });
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#Tickets", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#Tickets", { delay: delay });
    /* View Ticket */
    await page.waitForSelector("#viewItem", { visible: true });
    await page.waitForTimeout(delay)
    await page.click("#viewItem", { delay: delay });
    await page.waitForTimeout(3000);
    /* Send message */
    await page.waitForSelector("textarea", { visible: true });
    await page.type("textarea", getRandomContent(), { delay: 50 });
    await page.waitForTimeout(delay);
    await page.click("#send", { delay: delay });
    await page.waitForTimeout(5000);
    await page.click("#goBack", { delay: delay });
    /* Delete Ticket */
    await page.waitForSelector("#deleteItem", { visible: true });
    await page.click("#deleteItem", { delay: delay });
    await page.waitForTimeout(delay);
    await page.waitForSelector("#deleteItemConfirm", { visible: true });
    await page.click("#deleteItemConfirm", { delay: delay });
    await page.waitForTimeout(5000);
}