import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { Staffs } from './entities/staff.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Staffs])],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
