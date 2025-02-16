import { Module } from '@nestjs/common';
import { IMailerService } from './interfaces/mailer-service.interface';
import { Environment, EnvironmentConfig } from 'src/config/config.types';
import { MailerDevService } from './services/mailer-dev.service';
import { MailerService } from './services/mailer.service';
import { MailerFacade } from './mailer.facade';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IMailerService,
      useFactory: (config: EnvironmentConfig) =>
        config.NODE_ENV === Environment.Development
          ? new MailerDevService(config)
          : new MailerService(config),
      inject: [EnvironmentConfig],
    },
    MailerFacade,
  ],
  exports: [MailerFacade],
})
export class MailerModule {}
