"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFreeMobileAlert = void 0;
const logger_1 = require("../logger");
const config_1 = require("../config");
const url_1 = require("url");
const node_fetch_1 = __importDefault(require("node-fetch"));
const { freemobile } = config_1.config.notifications;
const url = new url_1.URL('https://smsapi.free-mobile.fr/sendmsg');
if (freemobile.id && freemobile.apiKey) {
    url.searchParams.append('user', freemobile.id);
    url.searchParams.append('pass', freemobile.apiKey);
}
function sendFreeMobileAlert(link, store) {
    if (freemobile.id && freemobile.apiKey) {
        logger_1.logger.debug('↗ sending free mobile alert');
        (async () => {
            const color = false;
            const sms = true;
            const message = `${logger_1.Print.inStock(link, store, color, sms)}\n${logger_1.Print.productInStock(link)}`;
            url.searchParams.append('msg', message);
            try {
                const response = await (0, node_fetch_1.default)(url.toString(), { method: 'GET' });
                if (!response.ok) {
                    logger_1.logger.error("✖ couldn't send free mobile alert", response);
                    return;
                }
                logger_1.logger.info('✔ free mobile alert sent');
            }
            catch (error) {
                logger_1.logger.error("✖ couldn't send free mobile alert", error);
            }
        })();
    }
}
exports.sendFreeMobileAlert = sendFreeMobileAlert;
//# sourceMappingURL=freemobile.js.map