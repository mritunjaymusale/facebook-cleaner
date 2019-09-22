const { clickEditOption,loginFromCookie } = require("./utils");

const puppeteer = require('puppeteer');
const process = require('process');




(async () => {
    // insert respective links 
     const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await loginFromCookie(page);
    await page.goto(process.argv[2], { waitUntil: 'networkidle2' });
    while (true)
        await unlike(page);


})();



async function unlike(page) {
    await clickEditOption(page);
    await page.waitForSelector('div > ul > li > a > span > span', { visible: true });
    await page.evaluate(() => document.querySelector("div > ul > li > a > span > span").parentElement.parentElement.click())
    await page.reload({ waitUntil: 'networkidle2' });
}
