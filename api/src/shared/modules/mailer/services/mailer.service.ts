import { Injectable } from '@nestjs/common';
import {
  IMailerService,
  SendTextMailData,
} from '../interfaces/mailer-service.interface';
import { EnvironmentConfig } from 'src/config/config.types';

@Injectable()
export class MailerService implements IMailerService {
  constructor(private readonly config: EnvironmentConfig) {}

  async sendTextMail(data: SendTextMailData): Promise<void> {}
}
