import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import { usersTable } from './userSchema.js';

export const productsTable = pgTable('products', {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
  user_id: uuid("user_id").references(() => usersTable.id, { onDelete: "cascade" })
});

export const createSchema = createInsertSchema(productsTable) // product create validation
export const updateSchema = createUpdateSchema(productsTable) // product update validation