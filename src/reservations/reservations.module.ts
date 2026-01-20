import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import {
  AvailabilityController,
  ReservationsController,
} from './reservations.controller';
import { Reservations } from './entities/reservation.entity';
import { Customers } from './entities/customers.entity';
import { Staffs } from './entities/staffs.entity';
import { Services } from 'src/services/entities/service.entity';
import { ReservationsCleanupService } from './reservations.cleanup.service.js';
import { Stores } from './entities/stores.entity';
import { NewsPosts } from './entities/newsPosts.entity';

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
