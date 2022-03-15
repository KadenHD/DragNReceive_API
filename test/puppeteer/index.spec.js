import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();

import sadminSpec from './sadmin.spec.js';
import partnerSpec from './partner.spec.js';

const browser = await puppeteer.launch({ headless: false });
const url = process.env.PUPPETEER_WEB_URL;
const delay = 1000;

await partnerSpec(browser, url, delay);
// await sadminSpec(browser, url, delay);

await browser.close();