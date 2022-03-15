import dotenv from "dotenv";
dotenv.config();

const url = process.env.PUPPETEER_URL;
const delay = 1000;

const loginSpec = async (browser) => {
    /* Initialize */
    const page = await browser.newPage();
    await page.setViewport({ width: 900, height: 900 });
    await page.goto(url, { waitUntil: "networkidle2" });

    /* Go to login */
    await page.click("#drawer", { delay: delay });
    await page.waitForSelector("#notlogged", { visible: true });
    await page.click("#notlogged", { delay: delay });
    await page.waitForSelector("#Login", { visible: true });
    await page.click("#Login", { delay: delay });

    /* Login */
    await page.type("input[type=text]", "sadmin@sadmin.sadmin", { delay: 50 });
    await page.type("input[type=password]", "Password1@", { delay: 50 });
    await page.click("#submit", { delay: delay });

    /* Logout */
    await page.waitForNavigation()
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
};

export default loginSpec;