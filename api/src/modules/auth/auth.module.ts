import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { UserEntity } from 'src/database/entities/user.entity';
import { AuthEntity } from 'src/database/entities/auth.entity';
import { MailerModule } from 'src/shared/modules/mailer/mailer.module';
import { ConfigModule } from 'src/config/config.module';
import { EnvironmentConfig } from 'src/config/config.types';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AuthEntity]),
    UsersModule,
    ConfigModule,
    MailerModule,
    JwtModule.registerAsync({
      useFactory: async (config: EnvironmentConfig) => {
        const jwtSecret = config.JWT_ACCESS_SECRET;
        const jwtAccessTime = config.JWT_ACCESS_TIME;

        return {
          global: true,
          secret: jwtSecret,
          signOptions: { expiresIn: jwtAccessTime },
        };
      },
      inject: [EnvironmentConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
