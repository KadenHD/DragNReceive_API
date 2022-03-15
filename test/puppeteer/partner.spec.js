import dotenv from "dotenv";
import { createTicket, initialize, login, logout } from "./functions.js";
dotenv.config();

const url = process.env.PUPPETEER_URL;
const delay = 1000;

const partnerSpec = async (browser) => {
    const page = await initialize(browser, url);
    await login(page, delay, "partner@partner.partner", "Password1@");

    await createTicket(page, delay);

    await logout(page, delay);
};

export default partnerSpec;