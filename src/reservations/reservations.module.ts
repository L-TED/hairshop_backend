import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import {
  AvailabilityController,
  ReservationsController,
} from './reservations.controller';
import { Reservations } from './entities/reservation.entity.js';
import { Customers } from './entities/customers.entity.js';
import { Staffs } from './entities/staffs.entity.js';
import { Services } from 'src/services/entities/service.entity.js';
import { ReservationsCleanupService } from './reservations.cleanup.service.js';
import { Stores } from './entities/stores.entity.js';
import { NewsPosts } from './entities/newsPosts.entity.js';

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
