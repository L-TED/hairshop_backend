import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Stores } from './Stores';

@Index('staffs_pkey', ['id'], { unique: true })
@Entity('staffs', { schema: 'public' })
export class Staffs {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @ManyToOne(() => Stores, (stores) => stores.staffs)
  @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
  store: Stores;
}
