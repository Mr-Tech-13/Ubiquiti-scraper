import { Browser } from 'puppeteer';
import { Link, Store } from '../src/store/model';
export declare function getTestLink(): Link;
export declare function getCaptchaTestLink(): Link;
export declare function getTestStore(): Store;
export declare function launchTestBrowser(): Promise<Browser>;
