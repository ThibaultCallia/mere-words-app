import { Hono } from 'hono';
import { db } from '@/db/db';
import { words } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { eq } from 'drizzle-orm';

const app = new Hono().get('/', clerkMiddleware(), async (c) => {
  // below HTTPException throw is a way to handle errors in Hono without changing the type safety of the routes
  const auth = getAuth(c);
  console.log('------------------------------------');
  console.log('auth', auth);
  console.log('------------------------------------');
  if (!auth?.userId) {
    return c.json({ error: 'User not authorised' }, 401);
    // ----> This is okay since new Hono update : type safety remains
  }

  const data = await db
    .select({
      word: words.word,
      id: words.id,
    })
    .from(words);
  // .where(eq())
  // --> create query where auth.id is used to look up words from specific user

  return c.json({
    data,
  });
});

export default app;
