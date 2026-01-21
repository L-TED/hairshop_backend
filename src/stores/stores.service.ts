import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stores } from './entities/store.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Stores) private storesRepository: Repository<Stores>,
  ) {}
  async findAll() {
    return await this.storesRepository.find();
  }
}
