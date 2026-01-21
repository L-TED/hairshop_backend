import { Controller, Get, Param } from '@nestjs/common';
import { NewsPostsService } from './news_posts.service';

@Controller('news-posts')
export class NewsPostsController {
  constructor(private readonly newsPostsService: NewsPostsService) {}

  @Get()
  async findAll() {
    return await this.newsPostsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.newsPostsService.findOne(+id);
  }
}
