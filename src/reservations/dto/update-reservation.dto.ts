import { IsISO8601, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsISO8601()
  start_at?: string;
}
