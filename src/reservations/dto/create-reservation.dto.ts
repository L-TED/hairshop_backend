import { IsISO8601, IsInt, IsUUID, Min } from 'class-validator';

export class CreateReservationDto {
  @IsUUID()
  customer_id: string;

  @IsInt()
  @Min(1)
  service_id: number;

  @IsInt()
  @Min(1)
  staff_id: number;

  @IsISO8601()
  start_at: string;
}
