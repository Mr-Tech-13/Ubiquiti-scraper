import { DMPayload } from '.';
export declare type CaptchaPayload = DMPayload;
/**
 * Picks the service that will handle the user interaction
 * based on configuration and sends the payload to that service
 *
 * @param payload the content to send to user
 * @param timeout timeout for response, in seconds
 * @returns response from user
 */
export declare function getCaptchaInputAsync(payload: CaptchaPayload, timeout?: number): Promise<string>;
