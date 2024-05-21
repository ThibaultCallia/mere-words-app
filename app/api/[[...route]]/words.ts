import { Hono } from 'hono';
import { db } from '@/db/db';
import { words } from '@/db/schema';

const app = new Hono().get('/', async (c) => {
  const data = await db
    .select({
      word: words.word,
      id: words.id,
    })
    .from(words);

  return c.json({
    data,
  });
});

export default app;
