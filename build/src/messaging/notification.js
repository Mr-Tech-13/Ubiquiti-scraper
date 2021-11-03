"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDMAsync = exports.sendNotification = void 0;
const philips_hue_1 = require("./philips-hue");
const sound_1 = require("./sound");
const apns_1 = require("./apns");
const desktop_1 = require("./desktop");
const discord_1 = require("./discord");
const email_1 = require("./email");
const gotify_1 = require("./gotify");
const mqtt_1 = require("./mqtt");
const pagerduty_1 = require("./pagerduty");
const pushbullet_1 = require("./pushbullet");
const pushover_1 = require("./pushover");
const slack_1 = require("./slack");
const sms_1 = require("./sms");
const telegram_1 = require("./telegram");
const twitter_1 = require("./twitter");
const twilio_1 = require("./twilio");
const twitch_1 = require("./twitch");
const redis_1 = require("./redis");
const smartthings_1 = require("./smartthings");
const streamlabs_1 = require("./streamlabs");
const freemobile_1 = require("./freemobile");
function sendNotification(link, store) {
    // Priority
    (0, sound_1.playSound)();
    (0, discord_1.sendDiscordMessage)(link, store);
    (0, desktop_1.sendDesktopNotification)(link, store);
    (0, email_1.sendEmail)(link, store);
    (0, sms_1.sendSms)(link, store);
    (0, apns_1.sendApns)(link, store);
    // Non-priority
    (0, smartthings_1.activateSmartthingsSwitch)();
    (0, philips_hue_1.adjustPhilipsHueLights)();
    (0, gotify_1.sendGotifyNotification)(link, store);
    (0, mqtt_1.sendMqttMessage)(link, store);
    (0, pagerduty_1.sendPagerDutyNotification)(link, store);
    (0, pushbullet_1.sendPushbulletNotification)(link, store);
    (0, pushover_1.sendPushoverNotification)(link, store);
    (0, slack_1.sendSlackMessage)(link, store);
    (0, telegram_1.sendTelegramMessage)(link, store);
    (0, twitter_1.sendTweet)(link, store);
    (0, twilio_1.sendTwilioMessage)(link, store);
    (0, twitch_1.sendTwitchMessage)(link, store);
    (0, redis_1.updateRedis)(link, store);
    (0, streamlabs_1.sendStreamLabsAlert)(link, store);
    (0, freemobile_1.sendFreeMobileAlert)(link, store);
}
exports.sendNotification = sendNotification;
async function sendDMAsync(service, payload) {
    let dmFunction = undefined;
    switch (service) {
        case 'slack':
            dmFunction = slack_1.sendDMAsync;
            break;
        case 'discord':
            dmFunction = discord_1.sendDMAsync;
            break;
        default:
            dmFunction = () => void 0;
    }
    await dmFunction(payload);
}
exports.sendDMAsync = sendDMAsync;
//# sourceMappingURL=notification.js.map