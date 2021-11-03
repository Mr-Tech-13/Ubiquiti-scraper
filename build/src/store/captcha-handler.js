"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCaptchaAsync = void 0;
const config_1 = require("../config");
const logger_1 = require("../logger");
const util_1 = require("../util");
const messaging_1 = require("../messaging");
const DefaultCaptureType = 'link';
/**
 * Handles process of obtaining captcha challenge from page and getting
 * solution response from user
 * @param page browser Page object
 * @param store streetmerchant store configuration object
 * @returns true if solution obtained and submitted, false otherwise
 */
async function handleCaptchaAsync(page, store) {
    // get captcha challenge
    let processingFailed = false;
    let captchaPayload = undefined;
    try {
        captchaPayload = await getCaptchaPayloadAsync(page, store);
    }
    catch (error) {
        logger_1.logger.error('unable to get captcha challenge', error);
        processingFailed = true;
    }
    // send the user a DM notification as a courtesy, so they can check in on SM
    if (processingFailed || !captchaPayload) {
        const captchaFailedMessage = {
            content: `captcha detected on [${page.url()}] but unable to get captcha challenge`,
            type: 'text',
        };
        await (0, messaging_1.sendDMAsync)(config_1.config.captchaHandler.service, captchaFailedMessage);
        return false;
    }
    const response = await (0, messaging_1.getCaptchaInputAsync)(captchaPayload);
    if (captchaPayload.type === 'image')
        (0, util_1.deleteFile)(captchaPayload.content);
    if (!response)
        return false;
    const submitted = await enterCaptchaResponseAsync(response, page, store);
    if (submitted)
        await (0, util_1.delay)(3000);
    return submitted;
}
exports.handleCaptchaAsync = handleCaptchaAsync;
/**
 * Gathers captcha challenge from page and prepares payload to send to user
 * @param page browser Page object
 * @param store streetmerchant store configuration object
 * @returns captcha payload to send via DM
 */
async function getCaptchaPayloadAsync(page, store) {
    var _a, _b, _c;
    const challengeElementSelector = ((_a = store.labels.captchaHandler) === null || _a === void 0 ? void 0 : _a.challenge) || 'img';
    const challengeFileName = `captcha-${Date.now()}.png`;
    let captchaPayload = undefined;
    const captureType = config_1.config.captchaHandler.captureType ||
        ((_b = store.labels.captchaHandler) === null || _b === void 0 ? void 0 : _b.captureType) ||
        DefaultCaptureType;
    logger_1.logger.debug(`capture types
    global default: '${DefaultCaptureType}'
    store: '${(_c = store.labels.captchaHandler) === null || _c === void 0 ? void 0 : _c.captureType}'
    override (dotenv): '${config_1.config.captchaHandler.captureType}'`);
    logger_1.logger.debug(`using '${captureType}' capture method`);
    const challengeElement = await page.$(challengeElementSelector);
    switch (captureType.toLowerCase()) {
        case 'image':
            await (challengeElement === null || challengeElement === void 0 ? void 0 : challengeElement.screenshot({ path: challengeFileName }));
            captchaPayload = {
                content: challengeFileName,
                type: 'image',
            };
            break;
        case 'link':
            captchaPayload = {
                content: await (challengeElement === null || challengeElement === void 0 ? void 0 : challengeElement.evaluate(img => img.src)),
                type: 'text',
            };
            break;
        default:
            logger_1.logger.error(`unknown captcha capture type: ${captureType}`);
    }
    return captchaPayload;
}
/**
 * Enters the response into the configured input fields and submits the form
 * @param response captcha challenge solution entered by user
 * @param page browser Page object
 * @param store streetmerchant store configuration object
 * @returns true if successfully submitted, false otherwise
 */
async function enterCaptchaResponseAsync(response, page, store) {
    var _a, _b;
    const inputElementSelector = ((_a = store.labels.captchaHandler) === null || _a === void 0 ? void 0 : _a.input) || 'input';
    const submitElementSelector = ((_b = store.labels.captchaHandler) === null || _b === void 0 ? void 0 : _b.submit) || 'button[type="submit"]';
    const result = await page.evaluate((inputSelector, submitSelector, response) => {
        const inputElement = document.querySelector(inputSelector);
        if (!inputElement)
            return false;
        inputElement.value = response;
        const submitElement = document.querySelector(submitSelector);
        if (!submitElement)
            return false;
        submitElement.click();
        return true;
    }, inputElementSelector, submitElementSelector, response);
    return result;
}
//# sourceMappingURL=captcha-handler.js.map