"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const captcha_handler_1 = require("../../src/store/captcha-handler");
const util_1 = require("../util");
const store = (0, util_1.getTestStore)();
// uncomment to test global default capture type setting
// if (store.labels.captchaHandler) store.labels.captchaHandler.captureType = '';
(async () => {
    const browser = await (0, util_1.launchTestBrowser)();
    const page = await browser.newPage();
    page.goto(store.links[1].url, { waitUntil: 'networkidle0' });
    await page.waitForSelector(store.labels.captchaHandler.challenge);
    await (0, captcha_handler_1.handleCaptchaAsync)(page, store);
    await browser.close();
})();
//# sourceMappingURL=test-captcha.js.map