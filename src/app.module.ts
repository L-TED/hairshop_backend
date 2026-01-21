import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ReservationsModule } from './reservations/reservations.module';
import { ServicesModule } from './services/services.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: Number(configService.get<string>('DB_PORT') ?? 5432),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
          ssl: { rejectUnauthorized: false },
          autoLoadEntities: true,
          synchronize: false,
          migrationsRun:
            String(
              configService.get<string>('MIGRATIONS_RUN') ?? '',
            ).toLowerCase() === 'true' ||
            configService.get<string>('MIGRATIONS_RUN') === '1',
        };
      },
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    ReservationsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
