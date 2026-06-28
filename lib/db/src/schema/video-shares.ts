import { pgTable, serial, integer, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { videosTable } from "./videos";
import { createInsertSchema } from "drizzle-zod";

export const videoSharesTable = pgTable("video_shares", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id")
    .notNull()
    .references(() => videosTable.id, { onDelete: "cascade" }),
  shareToken: text("share_token").notNull().unique(),
  password: text("password"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVideoShareSchema = createInsertSchema(videoSharesTable).omit({
  id: true,
  createdAt: true,
});

export type VideoShare = typeof videoSharesTable.$inferSelect;
