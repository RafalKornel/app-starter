import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const jwtSecret = configService.getOrThrow('API_SECRET');

        return {
          global: true,
          secret: jwtSecret,
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AuthModule {}
