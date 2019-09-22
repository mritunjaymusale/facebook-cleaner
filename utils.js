const fs = require('fs');

async function clickEditOption(page) {
    await page.waitForSelector("span._-xe > i",{visibility:true});
    
    await page.evaluate(() => document.querySelector("span._-xe > i").parentElement.parentElement.click());
    
}
async function clickEditOptionBesideVisiblityOption(page) {
    await page.waitForSelector("span._-xe > i.mrs._2fmu.img.sp_amsYPCnLqw9.sx_484936",{visibility:true});
    
    await page.evaluate(() => document.querySelector("span._-xe > i.mrs._2fmu.img.sp_amsYPCnLqw9.sx_484936").parentElement.parentElement.click());
    
}
async function loginFromCookie(page) {
    var cookieFromFile = fs.readFileSync('cookie.txt', 'utf8');
    cookieFromFile = JSON.parse(cookieFromFile);
    for (let i = 0; i < cookieFromFile.length; i++) {
        const element = cookieFromFile[i];
        await page.setCookie(element);
    }
}

async function clickDeleteButton(page) {
    await page.waitForSelector('div._5lnf.uiOverlayFooter._5a8u > button', { visible: true });
    await page.evaluate(() => document.querySelector('div._5lnf.uiOverlayFooter._5a8u > button').click());
}

async function clickThirdOption(page) {
    await page.evaluate(() => document.querySelector("div > ul > li:nth-child(4) > a > span > span").parentElement.parentElement.click());
}

exports.clickThirdOption = clickThirdOption;
exports.clickDeleteButton = clickDeleteButton;
exports.loginFromCookie = loginFromCookie;
exports.clickEditOption = clickEditOption;
exports.clickEditOptionBesideVisiblityOption = clickEditOptionBesideVisiblityOption;
