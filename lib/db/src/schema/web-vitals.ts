import { pgTable, serial, varchar, real, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const webVitalsTable = pgTable(
  "web_vitals",
  {
    id: serial("id").primaryKey(),
    type: varchar("type", { length: 20 }).notNull(),
    value: real("value").notNull(),
    rating: varchar("rating", { length: 30 }).notNull(),
    path: varchar("path", { length: 500 }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [index("web_vitals_created_type_idx").on(table.createdAt, table.type)],
);

export const insertWebVitalSchema = createInsertSchema(webVitalsTable).omit({
  id: true,
  createdAt: true,
});

export type WebVital = typeof webVitalsTable.$inferSelect;
