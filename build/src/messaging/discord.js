"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDMAndGetResponseAsync = exports.getDMResponseAsync = exports.sendDMAsync = exports.sendDiscordMessage = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const config_1 = require("../config");
const logger_1 = require("../logger");
const { notifyGroup, webhooks, notifyGroupSeries } = config_1.config.notifications.discord;
const { pollInterval, responseTimeout, token, userId } = config_1.config.captchaHandler;
function getIdAndToken(webhook) {
    const match = /.*\/webhooks\/(\d+)\/(.+)/.exec(webhook);
    if (!match) {
        throw new Error('could not get discord webhook');
    }
    return {
        id: match[1],
        token: match[2],
    };
}
function sendDiscordMessage(link, store) {
    if (webhooks.length > 0) {
        logger_1.logger.debug('↗ sending discord message');
        (async () => {
            try {
                const embed = new discord_js_1.default.MessageEmbed()
                    .setTitle('_**Stock alert!**_')
                    .setDescription('>Ubiquiti is restocking')
                    .setThumbnail('https://th.bing.com/th/id/OIP.8M3FcEDENn0de7uiaJfy-AHaFG?w=257&h=180&c=7&o=5&pid=1.7')
                    .setColor('#52b788')
                    .setTimestamp();
                embed.addField('Store', store.name, true);
                if (link.price)
                    embed.addField('Price', `${store.currency}${link.price}`, true);
                embed.addField('Product Page', link.url);
                if (link.cartUrl)
                    embed.addField('Add to Cart', link.cartUrl);
                embed.addField('Brand', link.brand, true);
                embed.addField('Model', link.model, true);
                embed.addField('Series', link.series, true);
                embed.setTimestamp();
                let notifyText = [];
                if (notifyGroup) {
                    notifyText = notifyText.concat(notifyGroup);
                }
                const notifyKeys = Object.keys(notifyGroupSeries);
                const notifyIndex = notifyKeys.indexOf(link.series);
                if (notifyIndex !== -1) {
                    notifyText = notifyText.concat(Object.values(notifyGroupSeries)[notifyIndex]);
                }
                const promises = [];
                for (const webhook of webhooks) {
                    const { id, token } = getIdAndToken(webhook);
                    const client = new discord_js_1.default.WebhookClient(id, token);
                    promises.push(new Promise((resolve, reject) => {
                        client
                            .send(notifyText.join(' '), {
                            embeds: [embed],
                            username: 'Ubiquiti Tracker',
                        })
                            .then(resp => {
                            logger_1.logger.info('✔ discord message sent resp.id: ' + resp.id);
                            resolve(resp);
                        })
                            .catch(err => reject(err))
                            .finally(() => client.destroy());
                    }));
                }
                await Promise.all(promises).catch(err => logger_1.logger.error("✖ couldn't send discord message", err));
            }
            catch (error) {
                logger_1.logger.error("✖ couldn't send discord message", error);
            }
        })();
    }
}
exports.sendDiscordMessage = sendDiscordMessage;
async function sendDMAsync(payload) {
    if (userId && token) {
        logger_1.logger.debug('↗ sending discord DM');
        let client = undefined;
        let dmChannel = undefined;
        try {
            client = await getDiscordClientAsync();
            dmChannel = await getDMChannelAsync(client);
            if (!dmChannel) {
                logger_1.logger.error('unable to get discord DM channel');
                return;
            }
            let message = payload;
            if (payload.type === 'image') {
                message = {
                    files: [
                        {
                            attachment: payload.content,
                            name: payload.content,
                        },
                    ],
                };
            }
            const result = await dmChannel.send(message);
            logger_1.logger.info('✔ discord DM sent');
            return result;
        }
        catch (error) {
            logger_1.logger.error("✖ couldn't send discord DM", error);
        }
        finally {
            client === null || client === void 0 ? void 0 : client.destroy();
        }
    }
    else {
        logger_1.logger.warn("✖ couldn't send discord DM, missing configuration");
    }
    return;
}
exports.sendDMAsync = sendDMAsync;
async function getDMResponseAsync(botMessage, timeout) {
    if (!botMessage)
        return '';
    const iterations = Math.max(Math.floor(timeout / pollInterval), 1);
    let iteration = 0;
    const client = await getDiscordClientAsync();
    const dmChannel = await getDMChannelAsync(client);
    if (!dmChannel) {
        logger_1.logger.error('unable to get discord DM channel');
        return '';
    }
    return new Promise(resolve => {
        let response = '';
        const intervalId = setInterval(async () => {
            const finish = (result) => {
                client === null || client === void 0 ? void 0 : client.destroy();
                clearInterval(intervalId);
                resolve(result);
            };
            try {
                iteration++;
                const messages = await dmChannel.messages.fetch({
                    after: botMessage === null || botMessage === void 0 ? void 0 : botMessage.id,
                });
                const lastUserMessage = messages
                    .filter(message => { var _a; return ((_a = message.reference) === null || _a === void 0 ? void 0 : _a.messageID) === (botMessage === null || botMessage === void 0 ? void 0 : botMessage.id); })
                    .last();
                if (!lastUserMessage) {
                    if (iteration >= iterations) {
                        await dmChannel.send('Timed out waiting for response... 😿');
                        logger_1.logger.error('✖ no response from user');
                        return finish(response);
                    }
                }
                else {
                    response = lastUserMessage.cleanContent;
                    await lastUserMessage.react('✅');
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
    const message = await sendDMAsync(payload);
    const response = await getDMResponseAsync(message, timeout || responseTimeout);
    return response;
}
exports.sendDMAndGetResponseAsync = sendDMAndGetResponseAsync;
async function getDiscordClientAsync() {
    let clientInstance = undefined;
    if (token) {
        clientInstance = new discord_js_1.default.Client();
        await clientInstance.login(token);
    }
    return clientInstance;
}
async function getDMChannelAsync(client) {
    let dmChannelInstance = undefined;
    if (userId && client) {
        const user = await new discord_js_1.default.User(client, {
            id: userId,
        }).fetch();
        dmChannelInstance = await user.createDM();
    }
    return dmChannelInstance;
}
//# sourceMappingURL=discord.js.map