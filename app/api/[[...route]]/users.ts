import { Hono } from 'hono';
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { insertUsersSchema } from '@/db/schema';
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { nanoid } from 'nanoid';
import { eq } from 'drizzle-orm';

const app = new Hono().post(
  '/',
  clerkMiddleware(),
  zValidator('json', insertUsersSchema),
  async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      return c.json({ error: 'User not authorised' }, 401);
    }

    // const existingUser = await db
    //   .select()
    //   .from(users)
    //   .where((users) => eq(users.clerkId, auth.userId));

    // if (existingUser) {
    //   return c.json({ message: 'User already exists', data: existingUser });
    // }
    // ------> Clerk webhook can be set to fetch POST  on user_created specifically to avoid this check

    const data = await db
      .insert(users)
      .values({
        clerkId: auth.userId,
        id: nanoid(),
      })
      .returning();
    // -> returning necessary as hono does not return the inserted data by default (it does when selecting for example)

    return c.json({ data: data[0] });
  }
);

export default app;
