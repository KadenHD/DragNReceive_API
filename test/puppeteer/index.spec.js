import puppeteer from 'puppeteer';

import loginSpec from './login.spec.js';
import createTicketSpec from './create-ticket.spec.js';

const browser = await puppeteer.launch({ headless: false });

await loginSpec(browser);
await createTicketSpec(browser);

await browser.close();