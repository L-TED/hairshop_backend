import { Injectable } from '@nestjs/common';
import { Staffs } from './entities/staff.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staffs) private staffsRepository: Repository<Staffs>,
  ) {}

  async findByStoreId(storeId: number) {
    return await this.staffsRepository.find({
      where: { store: { id: storeId } },
    });
  }
  async findOne(id: number) {
    return await this.staffsRepository.findOne({ where: { id: id } });
  }
}
