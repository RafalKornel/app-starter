import { Global, Module } from '@nestjs/common';
import { EnvironmentConfig } from './config.types';

@Global()
@Module({
  providers: [
    {
      provide: EnvironmentConfig,
      useFactory: () => EnvironmentConfig.validateWithLoad(),
    },
  ],
  exports: [EnvironmentConfig],
})
export class ConfigModule {}
