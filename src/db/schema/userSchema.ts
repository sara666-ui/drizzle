import { sql } from "drizzle-orm";
import { text, uuid, varchar } from "drizzle-orm/pg-core";
import { pgTable, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const userRole = pgEnum("roles", ["admin", "user"]);

export const usersTable = pgTable("users", {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`).notNull(),
    fullname: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: userRole().default("user"),
    address: text(),
});

const createrUserSchema = createInsertSchema(usersTable).omit({ id: true, role: true })
    .extend({
        email: z.string().email("Invalid email format"),
        password: z.string().min(8, "Password must be at least 8 characters long").max(255)
    })
const loginUserSchema = createInsertSchema(usersTable).pick({ email: true, password: true })
export { createrUserSchema, loginUserSchema }