"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendGotifyNotification = void 0;
const logger_1 = require("../logger");
const config_1 = require("../config");
const node_fetch_1 = __importDefault(require("node-fetch"));
const url_1 = require("url");
const { gotify } = config_1.config.notifications;
function sendGotifyNotification(link, store) {
    if (!gotify.token || !gotify.url)
        return;
    (async () => {
        const params = new url_1.URLSearchParams();
        params.append('title', logger_1.Print.inStock(link, store));
        params.append('message', logger_1.Print.productInStock(link));
        const response = await (0, node_fetch_1.default)(`${gotify.url}/message?token=${gotify.token}`, {
            method: 'POST',
            body: params,
        });
        const json = await response.json();
        if (json.error) {
            logger_1.logger.error('✖ could not send gotify message', json.error);
        }
        else {
            logger_1.logger.info('✔ gotify message sent');
        }
    })();
}
exports.sendGotifyNotification = sendGotifyNotification;
//# sourceMappingURL=gotify.js.map