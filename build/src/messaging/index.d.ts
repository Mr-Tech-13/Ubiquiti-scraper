export * from './captcha';
export * from './notification';
export declare type DMPayloadType = 'text' | 'image';
export interface DMPayload {
    content: string;
    type: DMPayloadType;
}
