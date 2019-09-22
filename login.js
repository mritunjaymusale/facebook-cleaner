const fs = require('fs');
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const pixel2XL = devices['Pixel 2 XL'];
const prompt = require('prompt-async');
let rawdata = fs.readFileSync('credentials.json');
let credentials = JSON.parse(rawdata);

async function saveCookie(page, filename) {
    prompt.start();

    var temp = await prompt.get(['saveCookie?']);
    const cookie = await page.cookies();
    fs.writeFile(filename, JSON.stringify(cookie), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The cookie was saved!");
    });

}

async function loginWithOutCookie(page, filename) {



    await page.evaluate((credentials) => {
        document.querySelector('#m_login_email').value = credentials.email;
        document.querySelector('#m_login_password').value = credentials.password;
        document.querySelector('#u_0_6').click();
    }, credentials);
    await page.waitForNavigation();
    await saveCookie(page, filename);

}

async function main() {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();

    await page.emulate(pixel2XL);
    await page.goto('http://www.facebook.com')
    await loginWithOutCookie(page, 'cookie.txt')
    await page.goto('http://www.facebook.com')
}

main()

