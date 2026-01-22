import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StaffsService } from './staffs.service';
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Get()
  findByStore(@Query('store_id', ParseIntPipe) storeId: number) {
    return this.staffsService.findByStoreId(storeId);
  }

  // 디자이너 상세 (선택사항)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffsService.findOne(id);
  }
}
