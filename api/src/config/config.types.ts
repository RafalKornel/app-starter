import { Injectable } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

@Injectable()
export class EnvironmentConfig {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  API_PORT: number;

  @IsNumber()
  CLIENT_PORT: number;

  @IsString()
  API_SECRET: string;

  // DB
  @IsString()
  POSTGRES_HOST: string;

  @IsString()
  POSTGRES_DB: string;

  @IsString()
  POSTGRES_USER: string;

  @IsString()
  POSTGRES_PASSWORD: string;

  @IsNumber()
  POSTGRES_PORT: number;

  // MAILS
  @IsNumber()
  DEV_SMTP_PORT: number;

  @IsString()
  DEV_SMTP_HOST: string;

  @IsString()
  MAIL_SENDER: string;

  // JWT
  @IsString()
  JWT_ACCESS_SECRET: string;

  @IsNumber()
  JWT_ACCESS_TIME: number;

  @IsNumber()
  JWT_REFRESH_TIME: number;

  // COOKIES
  @IsString()
  REFRESH_COOKIE: string;

  @IsString()
  COOKIE_SECRET: string;

  static validateWithLoad() {
    const config = EnvironmentConfig.loadConfig();

    return EnvironmentConfig.validate(config as Record<string, any>);
  }

  static validate(config: Record<string, unknown>) {
    const configInstance = plainToInstance(EnvironmentConfig, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(configInstance, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return configInstance;
  }

  private static loadConfig() {
    dotenv.config();

    return plainToClass(EnvironmentConfig, process.env, {
      exposeDefaultValues: true,
    });
  }
}
