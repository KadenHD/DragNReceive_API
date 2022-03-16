export const initialize = async (browser, url) => {
    /* Initialize */
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
    /* Logout */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#logged", { delay: delay });
    await page.waitForSelector("#logout", { visible: true });
    await page.waitForTimeout(delay);
    await page.click("#logout", { delay: delay });
    /* Close the script */
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