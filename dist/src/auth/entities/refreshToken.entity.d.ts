import { Customers } from 'src/reservations/entities/Customers.entity';
export declare class RefreshTokens {
    id: number;
    hashedToken: string;
    isRevoked: boolean;
    expiresAt: Date;
    createdAt: Date;
    customer: Customers;
}
