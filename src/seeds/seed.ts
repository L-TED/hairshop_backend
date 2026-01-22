import 'reflect-metadata';
import { AppDataSource } from '../database/data-source';
import { Services } from 'src/services/entities/service.entity';
import { Stores } from 'src/stores/entities/store.entity';
import { NewsPosts } from 'src/news_posts/entities/news_post.entity';
import { Staffs } from 'src/staffs/entities/staff.entity';

async function main() {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.ALLOW_SEED_IN_PROD !== 'true'
  ) {
    throw new Error(
      'Seed blocked in production. Set ALLOW_SEED_IN_PROD=true to override.',
    );
  }

  await AppDataSource.initialize();

  await AppDataSource.transaction(async (manager) => {
    await manager.getRepository(Stores).upsert(
      [
        {
          name: '메인 매장',
          address: '서울 어딘가',
        },
        {
          name: '강남 매장',
          address: '서울 강남 어딘가',
        },
        {
          name: '홍대 매장',
          address: '서울 홍대 어딘가',
        },
      ],
      ['name'],
    );

    const store = await manager
      .getRepository(Stores)
      .findOneByOrFail({ name: '메인 매장' });

    await manager.getRepository(Staffs).upsert(
      [
        { name: '김주영', store: store },
        { name: '이가연', store: store },
        { name: '박민혁', store: store },
      ],
      ['store', 'name'],
    );

    await manager.getRepository(Services).upsert(
      [
        { name: '커트', price: 20000 },
        { name: '펌', price: 80000 },
        { name: '염색', price: 70000 },
      ],
      ['name'],
    );

    await manager.getRepository(NewsPosts).upsert(
      [
        {
          title: '그랜드 오픈',
          contents: '오픈했습니다.',
          thumbnailUrl: null,
          createdAt: new Date(),
        },
        {
          title: '1월 이벤트',
          contents: '이벤트 진행합니다.',
          thumbnailUrl: null,
          createdAt: new Date(),
        },
      ],
      ['title'],
    );
  });

  await AppDataSource.destroy();
  console.log('Seed done.');
}

main().catch(async (e) => {
  console.error(e);
  try {
    if (AppDataSource.isInitialized) await AppDataSource.destroy();
  } catch {}
  process.exit(1);
});
