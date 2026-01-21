import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('news_posts_pkey', ['id'], { unique: true })
@Index('news_posts_title_key', ['title'], { unique: true })
@Entity('news_posts', { schema: 'public' })
export class NewsPosts {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'title', unique: true, length: 255 })
  title: string;

  @Column('text', { name: 'contents' })
  contents: string;

  @Column('character varying', {
    name: 'thumbnail_url',
    nullable: true,
    length: 255,
  })
  thumbnailUrl: string | null;

  @Column('timestamp with time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;
}
