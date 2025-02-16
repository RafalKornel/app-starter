import { Injectable } from '@nestjs/common';
import {
  IMailerService,
  SendTextMailData,
} from './interfaces/mailer-service.interface';

@Injectable()
export class MailerFacade {
  constructor(private readonly mailerService: IMailerService) {}

  public async sendMail(data: SendTextMailData) {
    return this.mailerService.sendTextMail(data);
  }
}
