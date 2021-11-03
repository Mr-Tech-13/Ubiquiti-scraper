"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStores = exports.getAllModels = exports.getAllSeries = exports.getAllBrands = exports.updateStores = exports.storeList = void 0;
const config_1 = require("../../config");
const acompc_1 = require("./acompc");
const ldlc_1 = require("./ldlc");
const materiel_1 = require("./materiel");
const adorama_1 = require("./adorama");
const akinformatica_1 = require("./akinformatica");
const allneeds_1 = require("./allneeds");
const alternate_1 = require("./alternate");
const alternate_nl_1 = require("./alternate-nl");
const amazon_1 = require("./amazon");
const amazon_ca_1 = require("./amazon-ca");
const amazon_de_1 = require("./amazon-de");
const amazon_de_warehouse_1 = require("./amazon-de-warehouse");
const amazon_es_1 = require("./amazon-es");
const amazon_fr_1 = require("./amazon-fr");
const amazon_it_1 = require("./amazon-it");
const amazon_nl_1 = require("./amazon-nl");
const amazon_sg_1 = require("./amazon-sg");
const amazon_uk_1 = require("./amazon-uk");
const amd_1 = require("./amd");
const amd_at_1 = require("./amd-at");
const amd_be_1 = require("./amd-be");
const amd_ca_1 = require("./amd-ca");
const amd_de_1 = require("./amd-de");
const amd_it_1 = require("./amd-it");
const amd_nl_1 = require("./amd-nl");
const amd_uk_1 = require("./amd-uk");
const antonline_1 = require("./antonline");
const ao_1 = require("./ao");
const argos_1 = require("./argos");
const argos_ie_1 = require("./argos-ie");
const aria_1 = require("./aria");
const arlt_1 = require("./arlt");
const asus_1 = require("./asus");
const asus_de_1 = require("./asus-de");
const awd_1 = require("./awd");
const azerty_1 = require("./azerty");
const bandh_1 = require("./bandh");
const bestbuy_1 = require("./bestbuy");
const bestbuy_ca_1 = require("./bestbuy-ca");
const box_1 = require("./box");
const bpctech_1 = require("./bpctech");
const bpmpower_1 = require("./bpmpower");
const bt_1 = require("./bt");
const canadacomputers_1 = require("./canadacomputers");
const caseking_1 = require("./caseking");
const ccl_1 = require("./ccl");
const centrecom_1 = require("./centrecom");
const comet_1 = require("./comet");
const computeralliance_1 = require("./computeralliance");
const computeruniverse_1 = require("./computeruniverse");
const coolblue_1 = require("./coolblue");
const coolmod_1 = require("./coolmod");
const corsair_1 = require("./corsair");
const corsair_uk_1 = require("./corsair-uk");
const cpl_1 = require("./cpl");
const currys_1 = require("./currys");
const cyberport_1 = require("./cyberport");
const cyberport_at_1 = require("./cyberport-at");
const dcomp_1 = require("./dcomp");
const drako_1 = require("./drako");
const dustinhome_no_1 = require("./dustinhome-no");
const ebgames_1 = require("./ebgames");
const ebuyer_1 = require("./ebuyer");
const elcorteingles_1 = require("./elcorteingles");
const elkjop_1 = require("./elkjop");
const eprice_1 = require("./eprice");
const equippr_1 = require("./equippr");
const euronics_1 = require("./euronics");
const euronics_de_1 = require("./euronics-de");
const evatech_1 = require("./evatech");
const evga_1 = require("./evga");
const evga_eu_1 = require("./evga-eu");
const expert_1 = require("./expert");
const futurex_1 = require("./futurex");
const galaxus_1 = require("./galaxus");
const game_1 = require("./game");
const gamestop_1 = require("./gamestop");
const gamestop_de_1 = require("./gamestop-de");
const gamestop_ie_1 = require("./gamestop-ie");
const gamestop_it_1 = require("./gamestop-it");
const globaldata_1 = require("./globaldata");
const hardware_planet_1 = require("./hardware-planet");
const harristechnology_1 = require("./harristechnology");
const harveynorman_ie_1 = require("./harveynorman-ie");
const igame_1 = require("./igame");
const johnlewis_1 = require("./johnlewis");
const kabum_1 = require("./kabum");
const komplett_no_1 = require("./komplett-no");
const lmc_1 = require("./lmc");
const mediamarkt_1 = require("./mediamarkt");
const mediamarkt_at_1 = require("./mediamarkt-at");
const medimax_1 = require("./medimax");
const megekko_1 = require("./megekko");
const memoryexpress_1 = require("./memoryexpress");
const microcenter_1 = require("./microcenter");
const mightyape_1 = require("./mightyape");
const mindfactory_1 = require("./mindfactory");
const msy_1 = require("./msy");
const multicom_1 = require("./multicom");
const mwave_1 = require("./mwave");
const netonnet_no_1 = require("./netonnet-no");
const newegg_1 = require("./newegg");
const newegg_ca_1 = require("./newegg-ca");
const newegg_sg_1 = require("./newegg-sg");
const noelleeming_1 = require("./noelleeming");
const notebooksbilliger_1 = require("./notebooksbilliger");
const novatech_1 = require("./novatech");
const novoatalho_1 = require("./novoatalho");
const nvidia_de_1 = require("./nvidia-de");
const nvidia_es_1 = require("./nvidia-es");
const nvidia_fr_1 = require("./nvidia-fr");
const nvidia_gb_1 = require("./nvidia-gb");
const officedepot_1 = require("./officedepot");
const ollo_1 = require("./ollo");
const otto_1 = require("./otto");
const overclockers_1 = require("./overclockers");
const pbtech_1 = require("./pbtech");
const pcbyte_1 = require("./pcbyte");
const pccg_1 = require("./pccg");
const pccomponentes_1 = require("./pccomponentes");
const pcdiga_1 = require("./pcdiga");
const pcking_1 = require("./pcking");
const playstation_1 = require("./playstation");
const pny_1 = require("./pny");
const power_no_1 = require("./power-no");
const proshop_de_1 = require("./proshop-de");
const proshop_dk_1 = require("./proshop-dk");
const proshop_no_1 = require("./proshop-no");
const rosman_1 = require("./rosman");
const rosman_melb_1 = require("./rosman-melb");
const saturn_1 = require("./saturn");
const saveonit_1 = require("./saveonit");
const scan_1 = require("./scan");
const scorptec_1 = require("./scorptec");
const shopto_1 = require("./shopto");
const smythstoys_1 = require("./smythstoys");
const smythstoys_ie_1 = require("./smythstoys-ie");
const spielegrotte_1 = require("./spielegrotte");
const storm_1 = require("./storm");
const target_1 = require("./target");
const tesco_ie_1 = require("./tesco-ie");
const thewarehouse_1 = require("./thewarehouse");
const topachat_1 = require("./topachat");
const toysrus_1 = require("./toysrus");
const ubiquiti_1 = require("./ubiquiti");
const umart_1 = require("./umart");
const unieuro_1 = require("./unieuro");
const very_1 = require("./very");
const vsgamers_1 = require("./vsgamers");
const vuugo_1 = require("./vuugo");
const walmart_1 = require("./walmart");
const walmart_ca_1 = require("./walmart-ca");
const wellstechnology_1 = require("./wellstechnology");
const wipoid_1 = require("./wipoid");
const xbox_1 = require("./xbox");
const zotac_1 = require("./zotac");
const logger_1 = require("../../logger");
const chalk_1 = __importDefault(require("chalk"));
exports.storeList = new Map([
    [acompc_1.AComPC.name, acompc_1.AComPC],
    [adorama_1.Adorama.name, adorama_1.Adorama],
    [akinformatica_1.Akinformatica.name, akinformatica_1.Akinformatica],
    [allneeds_1.Allneeds.name, allneeds_1.Allneeds],
    [alternate_1.Alternate.name, alternate_1.Alternate],
    [alternate_nl_1.AlternateNL.name, alternate_nl_1.AlternateNL],
    [amazon_1.Amazon.name, amazon_1.Amazon],
    [amazon_ca_1.AmazonCa.name, amazon_ca_1.AmazonCa],
    [amazon_de_1.AmazonDe.name, amazon_de_1.AmazonDe],
    [amazon_de_warehouse_1.AmazonDeWarehouse.name, amazon_de_warehouse_1.AmazonDeWarehouse],
    [amazon_es_1.AmazonEs.name, amazon_es_1.AmazonEs],
    [amazon_fr_1.AmazonFr.name, amazon_fr_1.AmazonFr],
    [amazon_it_1.AmazonIt.name, amazon_it_1.AmazonIt],
    [amazon_nl_1.AmazonNl.name, amazon_nl_1.AmazonNl],
    [amazon_sg_1.AmazonSg.name, amazon_sg_1.AmazonSg],
    [amazon_uk_1.AmazonUk.name, amazon_uk_1.AmazonUk],
    [amd_1.Amd.name, amd_1.Amd],
    [amd_at_1.AmdAt.name, amd_at_1.AmdAt],
    [amd_be_1.AmdBe.name, amd_be_1.AmdBe],
    [amd_ca_1.AmdCa.name, amd_ca_1.AmdCa],
    [amd_de_1.AmdDe.name, amd_de_1.AmdDe],
    [amd_it_1.AmdIt.name, amd_it_1.AmdIt],
    [amd_nl_1.AmdNl.name, amd_nl_1.AmdNl],
    [amd_uk_1.AmdUk.name, amd_uk_1.AmdUk],
    [antonline_1.AntOnline.name, antonline_1.AntOnline],
    [ao_1.AO.name, ao_1.AO],
    [argos_1.Argos.name, argos_1.Argos],
    [argos_ie_1.ArgosIE.name, argos_1.Argos],
    [aria_1.Aria.name, aria_1.Aria],
    [arlt_1.Arlt.name, arlt_1.Arlt],
    [asus_1.Asus.name, asus_1.Asus],
    [asus_de_1.AsusDe.name, asus_de_1.AsusDe],
    [awd_1.Awd.name, awd_1.Awd],
    [azerty_1.Azerty.name, azerty_1.Azerty],
    [bandh_1.BAndH.name, bandh_1.BAndH],
    [bestbuy_1.BestBuy.name, bestbuy_1.BestBuy],
    [bestbuy_ca_1.BestBuyCa.name, bestbuy_ca_1.BestBuyCa],
    [box_1.Box.name, box_1.Box],
    [bpctech_1.Bpctech.name, bpctech_1.Bpctech],
    [bpmpower_1.BpmPower.name, bpmpower_1.BpmPower],
    [bt_1.BT.name, bt_1.BT],
    [canadacomputers_1.CanadaComputers.name, canadacomputers_1.CanadaComputers],
    [caseking_1.Caseking.name, caseking_1.Caseking],
    [ccl_1.Ccl.name, ccl_1.Ccl],
    [centrecom_1.Centrecom.name, centrecom_1.Centrecom],
    [comet_1.Comet.name, comet_1.Comet],
    [computeralliance_1.ComputerAlliance.name, computeralliance_1.ComputerAlliance],
    [computeruniverse_1.Computeruniverse.name, computeruniverse_1.Computeruniverse],
    [coolblue_1.Coolblue.name, coolblue_1.Coolblue],
    [coolmod_1.Coolmod.name, coolmod_1.Coolmod],
    [corsair_1.Corsair.name, corsair_1.Corsair],
    [corsair_uk_1.CorsairUK.name, corsair_uk_1.CorsairUK],
    [cpl_1.Cpl.name, cpl_1.Cpl],
    [currys_1.Currys.name, currys_1.Currys],
    [cyberport_1.Cyberport.name, cyberport_1.Cyberport],
    [cyberport_at_1.CyberportAt.name, cyberport_at_1.CyberportAt],
    [dcomp_1.Dcomp.name, dcomp_1.Dcomp],
    [drako_1.Drako.name, drako_1.Drako],
    [dustinhome_no_1.DustinHomeNO.name, dustinhome_no_1.DustinHomeNO],
    [ebgames_1.EbGames.name, ebgames_1.EbGames],
    [ebuyer_1.Ebuyer.name, ebuyer_1.Ebuyer],
    [elcorteingles_1.Elcorteingles.name, elcorteingles_1.Elcorteingles],
    [elkjop_1.Elkjop.name, elkjop_1.Elkjop],
    [eprice_1.Eprice.name, eprice_1.Eprice],
    [equippr_1.Equippr.name, equippr_1.Equippr],
    [euronics_1.Euronics.name, euronics_1.Euronics],
    [euronics_de_1.EuronicsDE.name, euronics_de_1.EuronicsDE],
    [evatech_1.Evatech.name, evatech_1.Evatech],
    [evga_1.Evga.name, evga_1.Evga],
    [evga_eu_1.EvgaEu.name, evga_eu_1.EvgaEu],
    [expert_1.Expert.name, expert_1.Expert],
    [futurex_1.Futurex.name, futurex_1.Futurex],
    [galaxus_1.Galaxus.name, galaxus_1.Galaxus],
    [game_1.Game.name, game_1.Game],
    [gamestop_1.Gamestop.name, gamestop_1.Gamestop],
    [gamestop_de_1.GamestopDE.name, gamestop_de_1.GamestopDE],
    [gamestop_ie_1.GamestopIE.name, gamestop_ie_1.GamestopIE],
    [gamestop_it_1.GamestopIT.name, gamestop_it_1.GamestopIT],
    [globaldata_1.Globaldata.name, globaldata_1.Globaldata],
    [hardware_planet_1.HardwarePlanet.name, hardware_planet_1.HardwarePlanet],
    [harristechnology_1.HarrisTechnology.name, harristechnology_1.HarrisTechnology],
    [harveynorman_ie_1.HarveyNormanIE.name, harveynorman_ie_1.HarveyNormanIE],
    [igame_1.Igamecomputer.name, igame_1.Igamecomputer],
    [johnlewis_1.JohnLewis.name, johnlewis_1.JohnLewis],
    [kabum_1.Kabum.name, kabum_1.Kabum],
    [komplett_no_1.KomplettNO.name, komplett_no_1.KomplettNO],
    [lmc_1.LandmarkComputers.name, lmc_1.LandmarkComputers],
    [mediamarkt_1.Mediamarkt.name, mediamarkt_1.Mediamarkt],
    [mediamarkt_at_1.MediamarktAt.name, mediamarkt_at_1.MediamarktAt],
    [medimax_1.Medimax.name, medimax_1.Medimax],
    [megekko_1.Megekko.name, megekko_1.Megekko],
    [ldlc_1.Ldlc.name, ldlc_1.Ldlc],
    [materiel_1.Materiel.name, materiel_1.Materiel],
    [memoryexpress_1.MemoryExpress.name, memoryexpress_1.MemoryExpress],
    [microcenter_1.MicroCenter.name, microcenter_1.MicroCenter],
    [mightyape_1.MightyApe.name, mightyape_1.MightyApe],
    [mindfactory_1.Mindfactory.name, mindfactory_1.Mindfactory],
    [msy_1.Msy.name, msy_1.Msy],
    [multicom_1.Multicom.name, multicom_1.Multicom],
    [mwave_1.Mwave.name, mwave_1.Mwave],
    [netonnet_no_1.NetonnetNO.name, netonnet_no_1.NetonnetNO],
    [newegg_1.Newegg.name, newegg_1.Newegg],
    [newegg_ca_1.NeweggCa.name, newegg_ca_1.NeweggCa],
    [newegg_sg_1.NeweggSg.name, newegg_sg_1.NeweggSg],
    [noelleeming_1.NoelLeeming.name, noelleeming_1.NoelLeeming],
    [notebooksbilliger_1.Notebooksbilliger.name, notebooksbilliger_1.Notebooksbilliger],
    [novatech_1.Novatech.name, novatech_1.Novatech],
    [novoatalho_1.NovoAtalho.name, novoatalho_1.NovoAtalho],
    [nvidia_de_1.NvidiaDE.name, nvidia_de_1.NvidiaDE],
    [nvidia_es_1.NvidiaES.name, nvidia_es_1.NvidiaES],
    [nvidia_fr_1.NvidiaFR.name, nvidia_fr_1.NvidiaFR],
    [nvidia_gb_1.NvidiaGB.name, nvidia_gb_1.NvidiaGB],
    [officedepot_1.OfficeDepot.name, officedepot_1.OfficeDepot],
    [ollo_1.Ollo.name, ollo_1.Ollo],
    [otto_1.Otto.name, otto_1.Otto],
    [overclockers_1.Overclockers.name, overclockers_1.Overclockers],
    [pbtech_1.PBTech.name, pbtech_1.PBTech],
    [pcbyte_1.PCByte.name, pcbyte_1.PCByte],
    [pccg_1.Pccg.name, pccg_1.Pccg],
    [pccomponentes_1.PCComponentes.name, pccomponentes_1.PCComponentes],
    [pcdiga_1.PCDiga.name, pcdiga_1.PCDiga],
    [pcking_1.PCKing.name, pcking_1.PCKing],
    [playstation_1.PlayStation.name, playstation_1.PlayStation],
    [pny_1.Pny.name, pny_1.Pny],
    [power_no_1.PowerNO.name, power_no_1.PowerNO],
    [proshop_de_1.ProshopDE.name, proshop_de_1.ProshopDE],
    [proshop_dk_1.ProshopDK.name, proshop_dk_1.ProshopDK],
    [proshop_no_1.ProshopNO.name, proshop_no_1.ProshopNO],
    [rosman_1.Rosman.name, rosman_1.Rosman],
    [rosman_melb_1.RosmanMelb.name, rosman_melb_1.RosmanMelb],
    [saturn_1.Saturn.name, saturn_1.Saturn],
    [saveonit_1.SaveOnIt.name, saveonit_1.SaveOnIt],
    [scan_1.Scan.name, scan_1.Scan],
    [scorptec_1.Scorptec.name, scorptec_1.Scorptec],
    [shopto_1.ShopTo.name, shopto_1.ShopTo],
    [smythstoys_1.SmythsToys.name, smythstoys_1.SmythsToys],
    [smythstoys_ie_1.SmythsToysIE.name, smythstoys_ie_1.SmythsToysIE],
    [spielegrotte_1.Spielegrotte.name, spielegrotte_1.Spielegrotte],
    [storm_1.StormComputers.name, storm_1.StormComputers],
    [target_1.Target.name, target_1.Target],
    [tesco_ie_1.TescoIE.name, tesco_ie_1.TescoIE],
    [thewarehouse_1.TheWarehouse.name, thewarehouse_1.TheWarehouse],
    [topachat_1.TopAchat.name, topachat_1.TopAchat],
    [toysrus_1.ToysRUs.name, toysrus_1.ToysRUs],
    [ubiquiti_1.ubiquiti.name, ubiquiti_1.ubiquiti],
    [umart_1.Umart.name, umart_1.Umart],
    [unieuro_1.Unieuro.name, unieuro_1.Unieuro],
    [very_1.Very.name, very_1.Very],
    [vsgamers_1.VsGamers.name, vsgamers_1.VsGamers],
    [vuugo_1.Vuugo.name, vuugo_1.Vuugo],
    [walmart_1.Walmart.name, walmart_1.Walmart],
    [walmart_ca_1.WalmartCa.name, walmart_ca_1.WalmartCa],
    [wellstechnology_1.WellsTechnology.name, wellstechnology_1.WellsTechnology],
    [wipoid_1.Wipoid.name, wipoid_1.Wipoid],
    [xbox_1.Xbox.name, xbox_1.Xbox],
    [zotac_1.Zotac.name, zotac_1.Zotac],
]);
const brands = new Set();
const models = new Set();
const series = new Set();
const stores = new Map();
function filterBrandsSeriesModels() {
    brands.clear();
    series.clear();
    models.clear();
    for (const store of exports.storeList.values()) {
        for (const link of store.links) {
            brands.add(link.brand);
            series.add(link.series);
            models.add(link.model);
        }
        if (store.minPageSleep === undefined) {
            store.minPageSleep = config_1.defaultStoreData.minPageSleep;
        }
        if (store.maxPageSleep === undefined) {
            store.maxPageSleep = config_1.defaultStoreData.maxPageSleep;
        }
    }
}
function printConfig() {
    if (config_1.config.store.showOnlyBrands.length > 0) {
        logger_1.logger.info(`ℹ selected brands: ${config_1.config.store.showOnlyBrands.join(', ')}`);
    }
    if (config_1.config.store.showOnlyModels.length > 0) {
        logger_1.logger.info(`ℹ selected models: ${config_1.config.store.showOnlyModels
            .map(entry => {
            return entry.series
                ? entry.name + ' (' + entry.series + ')'
                : entry.name;
        })
            .join(', ')}`);
    }
    if (config_1.config.store.showOnlySeries.length > 0) {
        logger_1.logger.info(`ℹ selected series: ${config_1.config.store.showOnlySeries.join(', ')}`);
    }
    if (config_1.config.store.stores.length > 0) {
        const stores = darkenEmptyStores();
        logger_1.logger.info(`ℹ selected stores: ${stores.names.join(', ')}`);
        if (stores.anyExcluded) {
            logger_1.logger.warn('ℹ some of the selected stores (grayed out) dont have what you are looking for');
        }
    }
}
function darkenEmptyStores() {
    let anyExcluded = false;
    const selectedStores = config_1.config.store.stores.map(store => store.name);
    const names = selectedStores.map(selected => {
        var _a;
        const storeConfig = exports.storeList.get(selected);
        const hasAny = (_a = storeConfig === null || storeConfig === void 0 ? void 0 : storeConfig.links.some(l => {
            var _a, _b, _c, _d, _e, _f;
            return ((_b = (_a = config_1.config.store.showOnlySeries) === null || _a === void 0 ? void 0 : _a.includes(l.series)) !== null && _b !== void 0 ? _b : false) ||
                ((_c = config_1.config.store.showOnlyBrands) === null || _c === void 0 ? void 0 : _c.includes((_d = l.brand) !== null && _d !== void 0 ? _d : false)) ||
                ((_f = (_e = config_1.config.store.showOnlyModels) === null || _e === void 0 ? void 0 : _e.map(m => m.name).includes(l.model)) !== null && _f !== void 0 ? _f : false);
        })) !== null && _a !== void 0 ? _a : false;
        anyExcluded = anyExcluded || !hasAny;
        return hasAny ? selected : chalk_1.default.gray(selected);
    });
    return { names, anyExcluded };
}
function warnIfStoreDeprecated(store) {
    switch (store.name) {
        case 'evga':
            logger_1.logger.warn(`${store.name} is deprecated since they only support queuing`);
            break;
        default:
    }
}
function updateStores() {
    stores.clear();
    for (const storeData of config_1.config.store.stores) {
        const store = exports.storeList.get(storeData.name);
        if (store) {
            warnIfStoreDeprecated(store);
            stores.set(storeData.name, store);
            store.minPageSleep = storeData.minPageSleep;
            store.maxPageSleep = storeData.maxPageSleep;
            store.proxyList = storeData.proxyList;
        }
        else {
            logger_1.logger.warn(`No store named ${storeData.name}, skipping.`);
        }
    }
    filterBrandsSeriesModels();
    printConfig();
}
exports.updateStores = updateStores;
updateStores();
function getAllBrands() {
    return [...brands];
}
exports.getAllBrands = getAllBrands;
function getAllSeries() {
    return [...series];
}
exports.getAllSeries = getAllSeries;
function getAllModels() {
    return [...models];
}
exports.getAllModels = getAllModels;
function getStores() {
    return stores;
}
exports.getStores = getStores;
__exportStar(require("./store"), exports);
//# sourceMappingURL=index.js.map