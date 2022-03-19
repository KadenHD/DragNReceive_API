import puppeteer from 'puppeteer';
import ChalkMSG from '../../Scripts/Chalk.js';
import dotenv from 'dotenv';
dotenv.config();

import unlogSpec from './unlog.spec.js';
import partnerSpec from './partner.spec.js';
import sadminSpec from './sadmin.spec.js';

const browser = await puppeteer.launch({ headless: false });
const url = process.env.PUPPETEER_WEB_URL;
const delay = 1000;

try {
    console.log(`${ChalkMSG.INFO}Launching the Puppeteer test...`);

    console.log(`${ChalkMSG.INFO}Launching the test for Unlog...`);
    await unlogSpec(browser, url, delay);
    console.log(`${ChalkMSG.SUCCESS}The test for Unlog is done.`);

    console.log(`${ChalkMSG.INFO}Launching the test for Partner...`);
    await partnerSpec(browser, url, delay);
    console.log(`${ChalkMSG.SUCCESS}The test for Partner is done.`);

    console.log(`${ChalkMSG.INFO}Launching the test for SuperAdmin / Admin...`);
    await sadminSpec(browser, url, delay);
    console.log(`${ChalkMSG.SUCCESS}The test for SuperAdmin / Admin is done.`);

    await browser.close();
    console.log(`${ChalkMSG.SUCCESS}The Puppeteer test is successfully done.`);
} catch {
    console.log(`${ChalkMSG.ERROR}An error occured during the Puppeteer test.`);
    await browser.close();
}