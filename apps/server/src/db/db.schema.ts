import { pgTable, serial } from 'drizzle-orm/pg-core';

export const test = pgTable('test', {
  id: serial('id').primaryKey(),
});

export type Test = typeof test.$inferSelect;
