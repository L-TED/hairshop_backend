import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.cancel(id);
  }
}

// Requirement: GET /availability?date=YYYY-MM-DD&staff_id=...
// Keep it in this file (reservations.controller.ts), but expose it at the root path.
@Controller()
export class AvailabilityController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get('availability')
  getAvailability(
    @Query('date') date: string,
    @Query('staff_id', ParseIntPipe) staffId: number,
  ) {
    return this.reservationsService.getAvailability(date, staffId);
  }
}
