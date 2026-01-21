import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservations } from './reservation.entity';
import { Stores } from 'src/stores/entities/store.entity';

@Index('staffs_pkey', ['id'], { unique: true })
@Entity('staffs', { schema: 'public' })
export class Staffs {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @OneToMany(
    () => Reservations,
    (reservations: Reservations) => reservations.staff,
  )
  reservations: Reservations[];

  @ManyToOne(() => Stores, (stores) => stores.staffs)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Stores;
}
