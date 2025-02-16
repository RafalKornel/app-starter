import { Injectable } from '@nestjs/common';
import {
  IMailerService,
  SendTextMailData,
} from '../interfaces/mailer-service.interface';
import { EnvironmentConfig } from 'src/config/config.types';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerDevService implements IMailerService {
  private readonly nodeMailerTransport: nodemailer.Transporter;

  constructor(private readonly config: EnvironmentConfig) {
    this.nodeMailerTransport = nodemailer.createTransport({
      host: config.DEV_SMTP_HOST,
      port: config.DEV_SMTP_PORT,
      secure: false,
    });
  }

  async sendTextMail(data: SendTextMailData): Promise<void> {
    await this.nodeMailerTransport.sendMail({
      from: this.config.MAIL_SENDER,
      to: data.recepientEmail,
      subject: data.subject,
      text: data.text,
    });
  }
}
