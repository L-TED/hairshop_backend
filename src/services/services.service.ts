import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicesService {
  findAll() {
    return `This action returns all services`;
  }
}
