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
    await page.click("#Login", { delay: delay });
    /* Login */
    await page.type("input[type=text]", email, { delay: 50 });
    await page.type("input[type=password]", password, { delay: 50 });
    await page.click("#submit", { delay: delay });
    await page.waitForNavigation()
}

export const logout = async (page, delay) => {
    /* Logout */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#logged", { delay: delay });
    await page.waitForSelector("#logout", { visible: true });
    await page.click("#logout", { delay: delay });
    await page.click("#logout");
    /* Close the script */
    await page.waitForNavigation()
    await page.waitForTimeout(2000)
    await page.close();
}

export const createTicket = async (page, delay) => {
    /* Go to Create Tickets */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#logged", { visible: true });
    await page.click("#shop", { delay: delay });
    await page.waitForSelector("#shop", { visible: true });
    await page.click("#Tickets", { delay: delay });
    await page.click("#Tickets");
    await page.waitForSelector("#ticket-create", { visible: true });
    await page.click("#ticket-create", { delay: delay });
    /* Create one Ticket */
    await page.type("input", "Lorem ipsum...", { delay: 50 });
    await page.type("textarea", "Lorem ipsum dolores curriculum vitae.......", { delay: 50 });
    await page.click("#submit", { delay: delay });
    await page.waitForNavigation()
}