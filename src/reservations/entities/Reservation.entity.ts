import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Customers } from './customers.entity.js';
import { Services } from 'src/services/entities/service.entity.js';
import { Staffs } from './staffs.entity.js';

@Index('reservations_pkey', ['id'], { unique: true })
@Entity('reservations', { schema: 'public' })
export class Reservations {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('timestamp without time zone', { name: 'start_at' })
  startAt: Date;

  @ManyToOne(() => Customers, (customers: Customers) => customers.reservations)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(() => Services, (services: Services) => services.reservations)
  @JoinColumn([{ name: 'service_id', referencedColumnName: 'id' }])
  service: Services;

  @ManyToOne(() => Staffs, (staffs: Staffs) => staffs.reservations)
  @JoinColumn([{ name: 'staff_id', referencedColumnName: 'id' }])
  staff: Staffs;
}
