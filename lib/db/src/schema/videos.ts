import { pgTable, serial, integer, text, timestamp, varchar, doublePrecision, boolean, index } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const videosTable = pgTable(
  "videos",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    fileUrl: text("file_url"),
    thumbnailUrl: text("thumbnail_url"),
    duration: doublePrecision("duration"),
    resolution: varchar("resolution", { length: 50 }),
    fileSize: integer("file_size"),
    status: varchar("status", { length: 50 }).notNull().default("processing"),
    visibility: varchar("visibility", { length: 50 }).notNull().default("private"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [
    index("videos_user_created_idx").on(table.userId, table.createdAt),
  ],
);

export const insertVideoSchema = createInsertSchema(videosTable).omit({
  id: true,
  userId: true,
  fileUrl: true,
  thumbnailUrl: true,
  duration: true,
  resolution: true,
  fileSize: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const selectVideoSchema = createSelectSchema(videosTable);

export type Video = typeof videosTable.$inferSelect;
