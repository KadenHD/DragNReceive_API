import puppeteer from 'puppeteer';

import sadminSpec from './sadmin.spec.js';
import partnerSpec from './partner.spec.js';

const browser = await puppeteer.launch({ headless: false });

await sadminSpec(browser);
await partnerSpec(browser);

await browser.close();