"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLinks = void 0;
const logger_1 = require("../logger");
const cheerio_1 = __importDefault(require("cheerio"));
const filter_1 = require("./filter");
const util_1 = require("../util");
function addNewLinks(store, links, series) {
    if (links.length === 0) {
        logger_1.logger.debug(logger_1.Print.message('NO STORE LINKS FOUND', series, store, true));
        return;
    }
    const existingUrls = new Set(store.links.map(link => link.url));
    const newLinks = links.filter(link => !existingUrls.has(link.url));
    if (newLinks.length === 0) {
        return;
    }
    logger_1.logger.debug(logger_1.Print.message(`FOUND ${newLinks.length} STORE LINKS`, series, store, true));
    logger_1.logger.debug(JSON.stringify(newLinks, null, 2));
    store.links = store.links.concat(newLinks);
}
async function fetchLinks(store, browser) {
    const linksBuilder = store.linksBuilder;
    if (!linksBuilder) {
        return;
    }
    const promises = [];
    // eslint-disable-next-line prefer-const
    for (let { series, url } of linksBuilder.urls) {
        if (!(0, filter_1.filterSeries)(series)) {
            continue;
        }
        logger_1.logger.debug(logger_1.Print.message('DETECTING STORE LINKS', series, store, true));
        if (!Array.isArray(url)) {
            url = [url];
        }
        url.map(x => promises.push((0, util_1.usingPage)(browser, async (page) => {
            const waitUntil = linksBuilder.waitUntil
                ? linksBuilder.waitUntil
                : 'domcontentloaded';
            await page.goto(x, { waitUntil });
            if (linksBuilder.waitForSelector) {
                await page.waitForSelector(linksBuilder.waitForSelector);
            }
            const html = await page.content();
            if (!html) {
                logger_1.logger.error(logger_1.Print.message('NO RESPONSE', series, store, true));
                return;
            }
            const docElement = cheerio_1.default.load(html).root();
            const links = linksBuilder.builder(docElement, series);
            addNewLinks(store, links, series);
        })));
    }
    await Promise.all(promises);
}
exports.fetchLinks = fetchLinks;
//# sourceMappingURL=fetch-links.js.map