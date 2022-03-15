import dotenv from "dotenv";
import { initialize, login, logout } from "./functions.js";
dotenv.config();

const url = process.env.PUPPETEER_URL;
const delay = 1000;

const sadminSpec = async (browser) => {
    const page = await initialize(browser, url);
    await login(page, delay, "sadmin@sadmin.sadmin", "Password1@");

    //

    await logout(page, delay);
};

export default sadminSpec;