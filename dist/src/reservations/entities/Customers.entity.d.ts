import { RefreshTokens } from 'src/auth/entities/refreshToken.entity';
import { Reservations } from './Reservation.entity';
export declare class Customers {
    id: string;
    username: string;
    hashPassword: string;
    refreshTokens: RefreshTokens[];
    reservations: Reservations[];
}
