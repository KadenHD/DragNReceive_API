import { initialize, login, logout } from "./index.js";
import { profile, user, shop, ticket } from './sadmin.js';

const sadminSpec = async (browser, url, delay) => {
    const page = await initialize(browser, url);
    await login(page, delay, "sadmin@sadmin.sadmin", "Password1@");

    await profile(page, delay);
    await user(page, delay);
    await shop(page, delay);
    await ticket(page, delay);

    await logout(page, delay);
};

export default sadminSpec;