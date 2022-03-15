import { initialize, login, logout } from "./index.js";
import { ticket, profile, shop, product, order } from "./partner.js";

const partnerSpec = async (browser, url, delay) => {
    const page = await initialize(browser, url);
    await login(page, delay, "partner@partner.partner", "Password1@");

    await profile(page, delay);
    await shop(page, delay);
    await product(page, delay);
    await order(page, delay);
    await ticket(page, delay);

    await logout(page, delay);
};

export default partnerSpec;