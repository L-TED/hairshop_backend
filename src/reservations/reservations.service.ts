import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservations } from './entities/Reservation.entity';
import { Customers } from './entities/Customers';
import { Services } from 'src/services/entities/service.entity';
import { Staffs } from './entities/Staffs';
import { randomUUID } from 'crypto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservations)
    private readonly reservationsRepository: Repository<Reservations>,
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(Services)
    private readonly servicesRepository: Repository<Services>,
    @InjectRepository(Staffs)
    private readonly staffsRepository: Repository<Staffs>,
  ) {}

  async create(dto: CreateReservationDto) {
    const startAt = new Date(dto.start_at);
    if (Number.isNaN(startAt.getTime())) {
      throw new BadRequestException('Invalid start_at');
    }

    const [customer, service, staff] = await Promise.all([
      this.customersRepository.findOne({ where: { id: dto.customer_id } }),
      this.servicesRepository.findOne({ where: { id: dto.service_id } }),
      this.staffsRepository.findOne({ where: { id: dto.staff_id } }),
    ]);

    if (!customer) throw new NotFoundException('Customer not found');
    if (!service) throw new NotFoundException('Service not found');
    if (!staff) throw new NotFoundException('Staff not found');

    const reservation = this.reservationsRepository.create({
      id: randomUUID(),
      status: 'confirmed',
      startAt,
      customer,
      service,
      staff,
    });

    return this.reservationsRepository.save(reservation);
  }

  findAll() {
    return this.reservationsRepository.find({
      relations: {
        customer: true,
        service: true,
        staff: true,
      },
      order: { startAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        service: true,
        staff: true,
      },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');
    return reservation;
  }

  async update(id: string, dto: UpdateReservationDto) {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    if (dto.start_at) {
      const startAt = new Date(dto.start_at);
      if (Number.isNaN(startAt.getTime())) {
        throw new BadRequestException('Invalid start_at');
      }
      reservation.startAt = startAt;
    }

    return this.reservationsRepository.save(reservation);
  }

  async cancel(id: string) {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.status = 'canceled';
    return this.reservationsRepository.save(reservation);
  }

  async getAvailability(date: string, staffId: number) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new BadRequestException('date must be YYYY-MM-DD');
    }
    if (!Number.isFinite(staffId) || staffId <= 0) {
      throw new BadRequestException('staff_id must be a positive integer');
    }

    const startOfDay = new Date(`${date}T00:00:00+09:00`);
    const endOfDay = new Date(`${date}T23:59:59.999+09:00`);

    // Use query builder to fetch by date range + staff
    const reservationsInDay = await this.reservationsRepository
      .createQueryBuilder('r')
      .leftJoin('r.staff', 's')
      .where('s.id = :staffId', { staffId })
      .andWhere('r.startAt >= :start', { start: startOfDay })
      .andWhere('r.startAt <= :end', { end: endOfDay })
      .andWhere('r.status != :canceled', { canceled: 'canceled' })
      .getMany();

    const reservedTimes = new Set(
      reservationsInDay.map((r) => r.startAt.getTime()),
    );

    // 08:00~20:00, 30분 단위, 총 24개(08:00 ... 19:30)
    const slots: Array<{ start_at: string; available: boolean }> = [];
    for (let i = 0; i < 24; i++) {
      const minutesFrom0800 = i * 30;
      const hour = 8 + Math.floor(minutesFrom0800 / 60);
      const minute = minutesFrom0800 % 60;
      const hh = String(hour).padStart(2, '0');
      const mm = String(minute).padStart(2, '0');
      const startAtStr = `${date}T${hh}:${mm}:00+09:00`;
      const slotDate = new Date(startAtStr);

      slots.push({
        start_at: startAtStr,
        available: !reservedTimes.has(slotDate.getTime()),
      });
    }

    return slots;
  }
}
