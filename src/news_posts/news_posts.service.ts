import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsPosts } from './entities/news_post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsPostsService {
  constructor(
    @InjectRepository(NewsPosts)
    private newsPostsRepository: Repository<NewsPosts>,
  ) {}
  async findAll() {
    return await this.newsPostsRepository.find();
  }

  async findOne(id: number) {
    return await this.newsPostsRepository.findOne({ where: { id } });
  }
}
