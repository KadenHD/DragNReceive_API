import { initialize } from "./index.js";
import { company, help, buy, social } from './unlog.js';

const unlogSpec = async (browser, url, delay) => {
    const page = await initialize(browser, url);
    await company(page, delay);
    await help(page, delay);
    await buy(page, delay);
    await social(page, delay);
    await page.close();
    await page.waitForTimeout(2000);
};

export default unlogSpec;