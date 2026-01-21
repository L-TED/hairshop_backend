import { Module } from '@nestjs/common';
import { NewsPostsService } from './news_posts.service';
import { NewsPostsController } from './news_posts.controller';
import { NewsPosts } from './entities/news_post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NewsPosts])],
  controllers: [NewsPostsController],
  providers: [NewsPostsService],
})
export class NewsPostsModule {}
