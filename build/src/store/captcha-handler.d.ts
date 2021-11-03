import { Page } from 'puppeteer';
import { Store } from './model';
/**
 * Handles process of obtaining captcha challenge from page and getting
 * solution response from user
 * @param page browser Page object
 * @param store streetmerchant store configuration object
 * @returns true if solution obtained and submitted, false otherwise
 */
export declare function handleCaptchaAsync(page: Page, store: Store): Promise<boolean>;
