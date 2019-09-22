const puppeteer = require('puppeteer');
const { clickEditOption, loginFromCookie, clickDeleteButton, clickThirdOption } = require("./utils");




(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    await loginFromCookie(page);
    await page.setViewport({ width: 1280, height: 720 });

    // while (true) {
    // await alternateUntag(page);
    // await normalUntag(page);
    await deleteOldUntagged(page);
    await page.waitFor(1300);

    await page.reload({ waitUntil: 'networkidle2' });
    // }
})();

async function alternateUntag(page) {
    await clickEditOption(page);
    await clickThirdOption(page);
    await autofillItsSpamFormAndUntag(page);
}


async function deleteOldUntagged(page) {
    await clickEditOption(page);
    await page.evaluate(() => document.querySelector("div > ul > li > a > span> span").parentElement.parentElement.click());
    await clickDeleteButton(page);
    await page.waitFor(1300);
}

async function normalUntag(page) {
    await clickEditOption(page);
    await page.evaluate(() => document.querySelector("div > ul > li > a > span> span").parentElement.parentElement.click());
    await autofillItsSpamFormAndUntag(page);
}


async function autofillItsSpamFormAndUntag(page) {
    await page.waitForSelector("#nfxQuestionNamedannoying > label._55sh._5ww6._5p_b.uiInputLabelInput > input", { visible: true });
    await page.evaluate(() => {
        document.querySelector("#nfxQuestionNamedannoying > label._55sh._5ww6._5p_b.uiInputLabelInput > input").click();
        document.querySelector("#nfx_dialog_continue").click();
    });
    await page.waitForSelector("#NFXAction-UNTAG", { visible: true });
    await page.evaluate(() => {
        document.querySelector("#NFXAction-UNTAG").click();
    });
}