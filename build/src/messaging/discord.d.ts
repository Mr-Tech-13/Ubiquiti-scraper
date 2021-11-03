import { Link, Store } from '../store/model';
import Discord from 'discord.js';
import { DMPayload } from '.';
export declare function sendDiscordMessage(link: Link, store: Store): void;
export declare function sendDMAsync(payload: DMPayload): Promise<Discord.Message | undefined>;
export declare function getDMResponseAsync(botMessage: Discord.Message | undefined, timeout: number): Promise<string>;
export declare function sendDMAndGetResponseAsync(payload: DMPayload, timeout?: number): Promise<string>;
