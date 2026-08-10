import { pgTable, serial, integer, varchar, timestamp, index, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { createInsertSchema } from "drizzle-zod";

export const presenceTable = pgTable(
  "presence",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => usersTable.id, {
      onDelete: "cascade",
    }),
    visitorId: varchar("visitor_id", { length: 64 }).unique(),
    lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("presence_user_id_idx").on(table.userId),
    index("presence_last_seen_at_idx").on(table.lastSeenAt),
  ],
);

export const insertPresenceSchema = createInsertSchema(presenceTable).omit({
  id: true,
  lastSeenAt: true,
});

export type Presence = typeof presenceTable.$inferSelect;
