import puppeteer from 'puppeteer';
import ChalkMSG from '../../Scripts/Chalk.js';
import dotenv from 'dotenv';
dotenv.config();

import sadminSpec from './sadmin.spec.js';
import partnerSpec from './partner.spec.js';

const browser = await puppeteer.launch({ headless: false });
const url = process.env.PUPPETEER_WEB_URL;
const delay = 1000;

try {
    console.log(`${ChalkMSG.INFO}Launching the Puppeteer test...`)
    await partnerSpec(browser, url, delay);
    // await sadminSpec(browser, url, delay);
    await browser.close();
    console.log(`${ChalkMSG.SUCCESS}The Puppeteer test is successfully done.`)
} catch {
    console.log(`${ChalkMSG.ERROR}An error occured during the Puppeteer test.`)
    await browser.close();
}



