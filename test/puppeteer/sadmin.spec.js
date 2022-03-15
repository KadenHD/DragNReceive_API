import { initialize, login, logout } from "./index.js";
import { } from './sadmin.js';

const sadminSpec = async (browser, url, delay) => {
    const page = await initialize(browser, url);
    await login(page, delay, "sadmin@sadmin.sadmin", "Password1@");

    //

    await logout(page, delay);
};

export default sadminSpec;