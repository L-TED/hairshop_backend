import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './tokens.service';
import { AuthService } from './auth.service';
import { Customers } from 'src/reservations/entities/Customers';
import { RefreshTokens } from './entities/refreshToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customers, RefreshTokens]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('TOKEN_SECRET'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService], // interface 커플링
  exports: [TokenService],
})
export class AuthModule {}
