import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import {
  AvailabilityController,
  ReservationsController,
} from './reservations.controller';
import { Reservations } from './entities/Reservation.entity';
import { Customers } from './entities/Customers';
import { Staffs } from './entities/Staffs';
import { Services } from 'src/services/entities/service.entity';
import { ReservationsCleanupService } from './reservations.cleanup.service.js';
import { Stores } from './entities/Stores';
import { NewsPosts } from './entities/NewsPosts';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservations,
      Customers,
      Services,
      Staffs,
      Stores,
      NewsPosts,
    ]),
  ],
  controllers: [ReservationsController, AvailabilityController],
  providers: [ReservationsService, ReservationsCleanupService],
})
export class ReservationsModule {}
