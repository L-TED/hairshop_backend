import { Services } from 'src/services/entities/service.entity';
import { Customers } from './Customers.entity';
export declare class Reservations {
    id: string;
    status: string;
    startAt: Date;
    customer: Customers;
    service: Services;
}
