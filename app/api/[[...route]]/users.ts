import { Hono } from 'hono';
import { db } from '@/db/db';
import { users } from '@/db/schema';

const app = new Hono().post('/', async (c) => {
  const authHeader = c.req.header().authorization;
  const sharedSecret = process.env.CLERK_WEBHOOK_SECRET;

  if (!authHeader || authHeader !== `Bearer ${sharedSecret}`) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const { clerkId } = await c.req.json();

  const data = await db
    .insert(users)
    .values({
      clerkId: clerkId,
    })
    .returning();
  // -> returning necessary as hono does not return the inserted data by default (it does when selecting for example)

  return c.json({ data: data[0] });
});

export default app;
