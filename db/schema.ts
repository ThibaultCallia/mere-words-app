import { relations } from 'drizzle-orm';

import {
  pgTable,
  serial,
  json,
  varchar,
  integer,
  primaryKey,
  timestamp,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 256 }).unique().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToWords: many(usersToWords),
}));

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 256 }).notNull(),
  phoneticText: varchar('phonetic_text', { length: 256 }),
  definition: json('definition').notNull(),
});

export const wordsRelations = relations(words, ({ many }) => ({
  usersToWords: many(usersToWords),
}));

export const usersToWords = pgTable(
  'users_to_words',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    wordId: integer('word_id')
      .notNull()
      .references(() => words.id, { onDelete: 'cascade' }),
    dateCreated: timestamp('date_created').notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.wordId] }),
  })
);

export const usersToWordsRelations = relations(usersToWords, ({ one }) => ({
  word: one(words, {
    fields: [usersToWords.wordId],
    references: [words.id],
  }),
  user: one(users, {
    fields: [usersToWords.userId],
    references: [users.id],
  }),
}));

export const insertWordsSchema = createInsertSchema(words);
export const insertUsersSchema = createInsertSchema(users);
