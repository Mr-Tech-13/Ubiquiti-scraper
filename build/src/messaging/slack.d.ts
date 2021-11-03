import { Link, Store } from '../store/model';
import { WebClient } from '@slack/web-api';
import { DMPayload } from '.';
interface SlackBotMessage {
    ts: string;
    channel: never;
}
export declare function sendSlackMessage(link: Link, store: Store, client?: WebClient): void;
export declare function sendDMAsync(payload: DMPayload, client?: WebClient): Promise<SlackBotMessage | undefined>;
export declare function getDMResponseAsync(botMessage: SlackBotMessage, timeout: number, client?: WebClient): Promise<string>;
export declare function sendDMAndGetResponseAsync(payload: DMPayload, timeout?: number): Promise<string>;
export {};
