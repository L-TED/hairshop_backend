import { RefreshTokens } from 'src/auth/entities/refreshToken.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Reservations } from './reservation.entity';

@Index('customers_pkey', ['id'], { unique: true })
@Index('customers_username_key', ['username'], { unique: true })
@Entity('customers', { schema: 'public' })
export class Customers {
  @Column('uuid', { primary: true, name: 'id' })
  id: string;

  @Column('character varying', { name: 'username', unique: true, length: 255 })
  username: string;

  @Column('character varying', { name: 'hash_password', length: 255 })
  hashPassword: string;

  @OneToMany(() => RefreshTokens, (refreshTokens) => refreshTokens.customer)
  refreshTokens: RefreshTokens[];

  @OneToMany(() => Reservations, (reservations) => reservations.customer)
  reservations: Reservations[];
}
