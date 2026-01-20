import { Reservations } from 'src/reservations/entities/reservation.entity.js';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('services_pkey', ['id'], { unique: true })
@Index('services_name_key', ['name'], { unique: true })
@Entity('services', { schema: 'public' })
export class Services {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('integer', { name: 'price' })
  price: number;

  @OneToMany(
    () => Reservations,
    (reservations: Reservations) => reservations.service,
  )
  reservations: Reservations[];
}
