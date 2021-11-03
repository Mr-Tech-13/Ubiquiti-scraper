"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const open_1 = __importDefault(require("open"));
const messaging_1 = require("../../src/messaging");
const config_1 = require("../../src/config");
const util_1 = require("../util");
const store = (0, util_1.getTestStore)();
const link = store.links[0];
/**
 * Send test email.
 */
(0, messaging_1.sendNotification)(link, store);
/**
 * Open browser.
 */
if (!config_1.config.docker && config_1.config.browser.open) {
    (0, open_1.default)((_a = link.cartUrl) !== null && _a !== void 0 ? _a : link.url);
    (0, open_1.default)(link.url);
}
//# sourceMappingURL=test-notification.js.map