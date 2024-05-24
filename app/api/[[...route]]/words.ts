import { Hono } from 'hono';
import { db } from '@/db/db';
import { insertWordsSchema, words, usersToWords, users } from '@/db/schema';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { eq, and } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';

const app = new Hono()
  .get('/', clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: 'User not authorised' }, 401);
      // ----> This is okay since new Hono update : type safety remains
    }

    const [{ id: userId }] = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, auth.userId));

    if (!userId) {
      return c.json(
        { error: 'User not found in database - Log out and back in' },
        404
      );
    }

    const userWords = await db
      .select({
        word: words.word,
        id: words.id,
        date_added: usersToWords.dateCreated,
        phonetic_text: words.phoneticText,
        definition: words.definition,
      })
      .from(words)
      .innerJoin(usersToWords, eq(usersToWords.wordId, words.id))
      .where(eq(usersToWords.userId, userId));

    return c.json({
      data: userWords,
    });
  })
  .post(
    '/',
    clerkMiddleware(),
    zValidator(
      'json',
      insertWordsSchema.pick({
        word: true,
        definition: true,
        phoneticText: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);

      if (!auth?.userId) {
        return c.json({ error: 'User not authorised' }, 401);
      }

      // first check if user is in database (might be overkill)
      const [{ id: userId }] = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, auth.userId));

      if (!userId) {
        return c.json(
          { error: 'User not found in database - Log out and back in' },
          404
        );
      }

      const { word, definition, phoneticText } = c.req.valid('json');

      const existingWord = await db
        .select()
        .from(words)
        .where(eq(words.word, word));

      let wordId;

      if (existingWord.length === 0) {
        const insertedWord = await db
          .insert(words)
          .values({ word, definition, phoneticText })
          .returning({ id: words.id });
        wordId = insertedWord[0].id;
      } else {
        wordId = existingWord[0].id;
      }

      const userWordLink = await db
        .select()
        .from(usersToWords)
        .where(
          and(eq(usersToWords.userId, userId), eq(usersToWords.wordId, wordId))
        );

      if (userWordLink.length > 0) {
        return c.json({ error: 'Word already saved' }, 400);
      }

      await db.insert(usersToWords).values({
        userId,
        wordId,
        dateCreated: new Date(),
      });

      return c.json({ message: `${word} successfully saved in dictionary` });
    }
  );

export default app;
