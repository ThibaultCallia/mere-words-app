import { pgTable, serial, json, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  clerkId: varchar('clerk_id', { length: 256 }).unique().notNull(),
  clerkAttributes: json('clerk_attributes'),
});

export const words = pgTable('words', {
  id: serial('id').primaryKey(),
  word: varchar('word', { length: 256 }).notNull(),
  definition: json('definition').notNull(),
  userId: integer('user_id').references(() => users.id),
});
