const puppeteer = require('puppeteer');
const { loginFromCookie, clickDeleteButton, clickThirdOption, clickEditOptionBesideVisiblityOption } = require("./utils");




(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await loginFromCookie(page);
    await page.setViewport({ width: 1280, height: 720 });
    while (true) {
    await removePosts(page);
    await page.waitFor(1300);
    await page.reload({ waitUntil: 'networkidle2' });

    }
})();




async function removePosts(page) {
    await clickEditOptionBesideVisiblityOption(page);
    await clickThirdOption(page);
    await clickDeleteButton(page);
}

