import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Customers } from './customers.entity';
import { Services } from 'src/services/entities/service.entity';
import { Staffs } from './staffs.entity';

@Index('reservations_pkey', ['id'], { unique: true })
@Entity('reservations', { schema: 'public' })
export class Reservations {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'status', length: 20 })
  status: string;

  @Column('timestamp without time zone', { name: 'start_at' })
  startAt: Date;

  @ManyToOne(() => Customers, (customers) => customers.reservations)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;

  @ManyToOne(() => Services, (services) => services.reservations)
  @JoinColumn([{ name: 'service_id', referencedColumnName: 'id' }])
  service: Services;

  @ManyToOne(() => Staffs, (staffs) => staffs.reservations)
  @JoinColumn([{ name: 'staff_id', referencedColumnName: 'id' }])
  staff: Staffs;
}
