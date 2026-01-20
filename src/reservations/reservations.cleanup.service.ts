import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Reservations } from './entities/reservation.entity.js';

@Injectable()
export class ReservationsCleanupService {
  private readonly logger = new Logger(ReservationsCleanupService.name);

  constructor(
    @InjectRepository(Reservations)
    private readonly reservationsRepository: Repository<Reservations>,
  ) {}

  // Deletes canceled reservations older than 7 days (based on startAt).
  // If you need "7 days after cancel", add a canceledAt column in DB.
  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async cleanupOldCanceledReservations() {
    const threshold = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const deleteResult = await this.reservationsRepository.delete({
      status: 'canceled',
      startAt: LessThan(threshold),
    });

    if ((deleteResult.affected ?? 0) > 0) {
      this.logger.log(
        `Deleted ${deleteResult.affected} canceled reservations older than 7 days`,
      );
    }
  }
}
