import { Customers } from 'src/reservations/entities/customers.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('refresh_tokens_pkey', ['id'], { unique: true })
@Entity('refresh_tokens', { schema: 'public' })
export class RefreshTokens {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'hashed_token', length: 255 })
  hashedToken: string;

  @Column('boolean', { name: 'isRevoked', default: () => 'false' })
  isRevoked: boolean;

  @Column('timestamp without time zone', { name: 'expires_at' })
  expiresAt: Date;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Customers, (customers) => customers.refreshTokens)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: Customers;
}
