import { Link, Store } from '../store/model';
import nodemailer from 'nodemailer';
export declare const transporter: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare function sendEmail(link: Link, store: Store): void;
