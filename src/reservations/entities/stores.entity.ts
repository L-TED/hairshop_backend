import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Staffs } from './staffs.entity';

@Index('stores_address_key', ['address'], { unique: true })
@Index('stores_pkey', ['id'], { unique: true })
@Index('stores_name_key', ['name'], { unique: true })
@Entity('stores', { schema: 'public' })
export class Stores {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('character varying', { name: 'address', unique: true, length: 255 })
  address: string;

  @OneToMany(() => Staffs, (staffs) => staffs.store)
  staffs: Staffs[];
}
