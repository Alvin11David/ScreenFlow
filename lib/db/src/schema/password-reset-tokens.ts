import { pgTable, serial, integer, text, timestamp, index } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { createInsertSchema } from "drizzle-zod";

export const passwordResetTokensTable = pgTable(
  "password_reset_tokens",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    token: text("token").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("password_reset_tokens_token_idx").on(table.token),
    index("password_reset_tokens_email_idx").on(table.email),
  ],
);

export const insertPasswordResetTokenSchema = createInsertSchema(passwordResetTokensTable).omit({
  id: true,
  createdAt: true,
});

export type PasswordResetToken = typeof passwordResetTokensTable.$inferSelect;
