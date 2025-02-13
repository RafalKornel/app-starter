import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: process.env.ENV_PATH || '.env' });

export const TYPEORM_CONFIG_KEY = 'typeorm' as const;

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/../migrations/**/*.ts'],
};

export default registerAs(TYPEORM_CONFIG_KEY, () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
