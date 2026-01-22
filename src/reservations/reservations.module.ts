import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import {
  AvailabilityController,
  ReservationsController,
} from './reservations.controller';
import { Reservations } from './entities/reservation.entity';
import { Customers } from './entities/customer.entity';
import { Services } from 'src/services/entities/service.entity';
import { ReservationsCleanupService } from './reservations.cleanup.service';
import { Stores } from 'src/stores/entities/store.entity';
import { NewsPosts } from 'src/news_posts/entities/news_post.entity';
import { Staffs } from 'src/staffs/entities/staff.entity';

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
