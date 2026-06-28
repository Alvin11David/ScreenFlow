import { pgTable, serial, integer, text, timestamp, doublePrecision, varchar } from "drizzle-orm/pg-core";
import { videosTable } from "./videos";
import { createInsertSchema } from "drizzle-zod";

export const videoAnalyticsTable = pgTable("video_analytics", {
  id: serial("id").primaryKey(),
  videoId: integer("video_id")
    .notNull()
    .references(() => videosTable.id, { onDelete: "cascade" }),
  viewerIp: varchar("viewer_ip", { length: 45 }),
  userAgent: text("user_agent"),
  watchedSeconds: doublePrecision("watched_seconds").notNull().default(0),
  totalDuration: doublePrecision("total_duration").notNull().default(0),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVideoAnalyticsSchema = createInsertSchema(videoAnalyticsTable).omit({
  id: true,
  createdAt: true,
});

export type VideoAnalytics = typeof videoAnalyticsTable.$inferSelect;
