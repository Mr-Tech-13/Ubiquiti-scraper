import { Link, Store } from '../store/model';
import { DMPayload } from '.';
export declare function sendNotification(link: Link, store: Store): void;
export declare function sendDMAsync(service: string, payload: DMPayload): Promise<void>;
