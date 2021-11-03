"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchTestBrowser = exports.getTestStore = exports.getCaptchaTestLink = exports.getTestLink = void 0;
const puppeteer_1 = require("puppeteer");
const config_1 = require("../src/config");
const logger_1 = require("../src/logger");
function getTestLink() {
    const link = {
        brand: 'test:brand',
        cartUrl: 'https://www.example.com/cartUrl',
        model: 'test:model',
        price: 100,
        series: 'test:series',
        url: 'https://www.example.com/url',
    };
    return link;
}
exports.getTestLink = getTestLink;
function getCaptchaTestLink() {
    const link = {
        brand: 'test:brand',
        cartUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/RickRoll.png/250px-RickRoll.png',
        model: 'test:model',
        price: 100,
        series: 'test:series',
        url: 'https://en.wikipedia.org/wiki/Rickrolling',
    };
    return link;
}
exports.getCaptchaTestLink = getCaptchaTestLink;
function getTestStore() {
    const storeLinks = [getTestLink(), getCaptchaTestLink()];
    const store = {
        currency: '',
        labels: {
            captcha: {
                container: '#firstHeading',
                text: ['Rickrolling'],
            },
            captchaHandler: {
                challenge: 'img.thumbimage',
                input: '#searchInput',
                submit: 'body',
                captureType: 'image',
            },
            inStock: {
                container: 'test:container',
                text: ['test:text'],
            },
        },
        links: storeLinks,
        name: 'test:name',
    };
    return store;
}
exports.getTestStore = getTestStore;
async function launchTestBrowser() {
    const args = [];
    // Skip Chromium Linux Sandbox
    // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#setting-up-chrome-linux-sandbox
    if (config_1.config.browser.isTrusted) {
        args.push('--no-sandbox');
        args.push('--disable-setuid-sandbox');
    }
    // https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#tips
    // https://stackoverflow.com/questions/48230901/docker-alpine-with-node-js-and-chromium-headless-puppeter-failed-to-launch-c
    if (config_1.config.docker) {
        args.push('--disable-dev-shm-usage');
        args.push('--no-sandbox');
        args.push('--disable-setuid-sandbox');
        args.push('--headless');
        args.push('--disable-gpu');
        config_1.config.browser.open = false;
    }
    // Add the address of the proxy server if defined
    if (config_1.config.proxy.address) {
        args.push(`--proxy-server=${config_1.config.proxy.protocol}://${config_1.config.proxy.address}:${config_1.config.proxy.port}`);
    }
    if (args.length > 0) {
        logger_1.logger.info('ℹ puppeteer config: ', args);
    }
    const browser = await (0, puppeteer_1.launch)({
        args,
        defaultViewport: {
            height: config_1.config.page.height,
            width: config_1.config.page.width,
        },
        headless: config_1.config.browser.isHeadless,
    });
    config_1.config.browser.userAgent = await browser.userAgent();
    return browser;
}
exports.launchTestBrowser = launchTestBrowser;
//# sourceMappingURL=util.js.map