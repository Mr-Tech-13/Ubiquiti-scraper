"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDMAndGetResponseAsync = exports.getDMResponseAsync = exports.sendDMAsync = exports.sendSlackMessage = void 0;
const fs_1 = require("fs");
const logger_1 = require("../logger");
const web_api_1 = require("@slack/web-api");
const config_1 = require("../config");
const { channel } = config_1.config.notifications.slack;
const { pollInterval, responseTimeout, userId } = config_1.config.captchaHandler;
const clients = {
    service: undefined,
    dm: undefined,
};
const tokens = {
    service: config_1.config.notifications.slack.token,
    dm: config_1.config.captchaHandler.token,
};
function sendSlackMessage(link, store, client = getClient()) {
    if (channel && client.token) {
        logger_1.logger.debug('↗ sending slack message');
        (async () => {
            const givenUrl = link.cartUrl ? link.cartUrl : link.url;
            try {
                const result = await client.chat.postMessage({
                    channel: channel.replace('#', ''),
                    text: `${logger_1.Print.inStock(link, store)}\n${givenUrl}`,
                });
                if (!result.ok) {
                    logger_1.logger.error("✖ couldn't send slack message", result);
                    return;
                }
                logger_1.logger.info('✔ slack message sent');
            }
            catch (error) {
                logger_1.logger.error("✖ couldn't send slack message", error);
            }
        })();
    }
}
exports.sendSlackMessage = sendSlackMessage;
async function sendDMAsync(payload, client = getClient()) {
    var _a;
    if (userId && client.token) {
        logger_1.logger.debug('↗ sending slack DM');
        try {
            const dmResult = await client.conversations.open({
                users: `${userId}`,
                return_im: false,
            });
            logger_1.logger.debug(`DM thread result: ${JSON.stringify(dmResult)}`);
            if (!dmResult.ok) {
                logger_1.logger.error("✖ couldn't open slack DM thread", dmResult);
                return;
            }
            const dmChannel = (_a = dmResult.channel) === null || _a === void 0 ? void 0 : _a.id.replace('#', '');
            logger_1.logger.debug(`sending DM to channel id ${dmChannel}...`);
            let result = undefined;
            let out;
            try {
                if (payload.type === 'image') {
                    const image = await loadImageBuffer(payload.content);
                    const uploadResult = await client.files.upload({
                        channels: dmChannel,
                        file: image,
                    });
                    if (uploadResult.ok) {
                        const dmResult = await client.conversations.history({
                            channel: dmChannel,
                        });
                        if (dmResult.ok) {
                            const messages = dmResult.messages;
                            const lastBotMessage = messages
                                .filter((m) => m.user !== userId)
                                .sort((a, b) => Number(b.ts) - Number(a.ts))[0];
                            result = {
                                ts: lastBotMessage.ts,
                                ok: true,
                            };
                        }
                    }
                }
                else {
                    result = await client.chat.postMessage({
                        channel: dmChannel,
                        text: payload.content,
                    });
                }
                out = { ts: result.ts, channel: dmChannel };
                if (!result.ok)
                    return;
            }
            catch (error) {
                logger_1.logger.error("✖ couldn't send slack DM", error);
                return;
            }
            logger_1.logger.info('✔ slack DM sent');
            logger_1.logger.debug(`sendDM output: ${JSON.stringify(out)}`);
            return out;
        }
        catch (error) {
            logger_1.logger.error("✖ couldn't send slack DM", error);
        }
    }
    else {
        logger_1.logger.warn("✖ couldn't send slack DM, missing configuration");
    }
    return;
}
exports.sendDMAsync = sendDMAsync;
async function getDMResponseAsync(botMessage, timeout, client = getClient()) {
    if (!botMessage || !client.token)
        return '';
    const iterations = Math.max(Math.floor(timeout / pollInterval), 1);
    let iteration = 0;
    return new Promise(resolve => {
        let response = '';
        const finish = (result) => {
            clearInterval(intervalId);
            resolve(result);
        };
        const intervalId = setInterval(async () => {
            try {
                iteration++;
                const threadResult = await client.conversations.replies({
                    channel: botMessage.channel,
                    ts: botMessage.ts,
                });
                if (!threadResult.ok) {
                    logger_1.logger.error("✖ couldn't open slack DM thread", threadResult);
                    return finish(response);
                }
                const messages = threadResult.messages;
                logger_1.logger.debug(`messages result: ${JSON.stringify(messages)}`);
                if (!messages.length) {
                    logger_1.logger.error('✖ no messages found in history');
                    return finish(response);
                }
                const lastUserMessage = messages
                    .filter((m) => !Object.keys(m).includes('bot_id') && m.user === userId)
                    .sort((a, b) => Number(b.ts) - Number(a.ts))[0];
                logger_1.logger.debug(`lastUserMessage: ${JSON.stringify(lastUserMessage)}`);
                if (!lastUserMessage) {
                    if (iteration >= iterations) {
                        await client.chat.postMessage({
                            channel: botMessage.channel,
                            thread_ts: botMessage.ts,
                            text: 'Timed out waiting for response... :crying_cat_face:',
                        });
                        logger_1.logger.error('✖ no response from user');
                        return finish(response);
                    }
                }
                else {
                    response = lastUserMessage.text;
                    await client.reactions.add({
                        channel: botMessage.channel,
                        name: 'white_check_mark',
                        timestamp: lastUserMessage.ts,
                    });
                    logger_1.logger.info(`✔ got captcha response: ${response}`);
                    return finish(response);
                }
            }
            catch (error) {
                logger_1.logger.error("✖ couldn't get captcha response", error);
                return finish(response);
            }
        }, pollInterval * 1000);
    });
}
exports.getDMResponseAsync = getDMResponseAsync;
async function sendDMAndGetResponseAsync(payload, timeout) {
    let userInput = '';
    const dmClient = getClient('dm');
    const botMessage = await sendDMAsync(payload, dmClient);
    if (botMessage) {
        userInput = await getDMResponseAsync(botMessage, timeout || responseTimeout, dmClient);
    }
    return userInput;
}
exports.sendDMAndGetResponseAsync = sendDMAndGetResponseAsync;
function getClient(clientType = 'service') {
    if (!clients[clientType]) {
        const token = tokens[clientType] || tokens['service']; // attempt to fall back to service token
        clients[clientType] = new web_api_1.WebClient(token);
    }
    return clients[clientType];
}
async function loadImageBuffer(path) {
    let buffer = undefined;
    if ((0, fs_1.existsSync)(path)) {
        buffer = (0, fs_1.readFileSync)(path);
    }
    return buffer;
}
//# sourceMappingURL=slack.js.map