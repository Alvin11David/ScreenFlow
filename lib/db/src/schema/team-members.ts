import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { teamsTable } from "./teams";
import { usersTable } from "./users";
import { createInsertSchema } from "drizzle-zod";

export const teamMembersTable = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teamsTable.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  role: varchar("role", { length: 50 }).notNull().default("member"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertTeamMemberSchema = createInsertSchema(teamMembersTable).omit({
  id: true,
  createdAt: true,
});

export type TeamMember = typeof teamMembersTable.$inferSelect;
