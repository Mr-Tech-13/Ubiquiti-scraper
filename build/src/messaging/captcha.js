"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCaptchaInputAsync = void 0;
const config_1 = require("../config");
const discord_1 = require("./discord");
const slack_1 = require("./slack");
const { service } = config_1.config.captchaHandler;
/**
 * Picks the service that will handle the user interaction
 * based on configuration and sends the payload to that service
 *
 * @param payload the content to send to user
 * @param timeout timeout for response, in seconds
 * @returns response from user
 */
async function getCaptchaInputAsync(payload, timeout) {
    switch (service) {
        case 'discord':
            return await (0, discord_1.sendDMAndGetResponseAsync)(payload, timeout);
        case 'slack':
            return await (0, slack_1.sendDMAndGetResponseAsync)(payload, timeout);
        default:
            return '';
    }
}
exports.getCaptchaInputAsync = getCaptchaInputAsync;
//# sourceMappingURL=captcha.js.map