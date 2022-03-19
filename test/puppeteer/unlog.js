const vist = async (page, delay, element) => {
    await page.waitForSelector(element, { visible: true });
    await page.click(element, { delay: delay });
    await page.waitForTimeout(5000);
}

export const company = async (page, delay) => {
    await page.waitForSelector("#Company", { visible: true });
    await page.click("#Company", { delay: delay });
    await page.waitForTimeout(2000);
    await vist(page, delay, "#Us");
    await vist(page, delay, "#Services");
    await vist(page, delay, "#Policy");
}

export const help = async (page, delay) => {
    await page.waitForSelector("#Help", { visible: true });
    await page.click("#Help", { delay: delay });
    await page.waitForTimeout(2000);
    await vist(page, delay, "#Contact");
    await vist(page, delay, "#Join");
}

export const buy = async (page, delay) => {
    await page.waitForSelector("#Buy", { visible: true });
    await page.click("#Buy", { delay: delay });
    await page.waitForTimeout(2000);
    await vist(page, delay, "#Partner");
    await vist(page, delay, "#Download");
}

export const social = async (page, delay) => {
    await page.waitForSelector("#Social", { visible: true });
    await page.click("#Social", { delay: delay });
    await page.waitForTimeout(2000);
}