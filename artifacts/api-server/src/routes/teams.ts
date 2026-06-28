import { Router, type IRouter } from "express";
import { db, teamsTable, teamMembersTable, usersTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { CreateTeamBody, AddTeamMemberBody } from "@workspace/api-zod";
import { requireAuth, type AuthenticatedRequest } from "../middlewares/auth";
import { getUserByEmail } from "../lib/auth";

const router: IRouter = Router();

router.post("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const parsed = CreateTeamBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }

  const slug = parsed.data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const [team] = await db.insert(teamsTable).values({
    name: parsed.data.name,
    slug,
    ownerId: req.userId!,
  }).returning();

  await db.insert(teamMembersTable).values({
    teamId: team.id,
    userId: req.userId!,
    role: "owner",
  });

  res.status(201).json({ team: { ...team, memberCount: 1 } });
});

router.get("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const memberships = await db
    .select({
      team: teamsTable,
      role: teamMembersTable.role,
    })
    .from(teamMembersTable)
    .innerJoin(teamsTable, eq(teamMembersTable.teamId, teamsTable.id))
    .where(eq(teamMembersTable.userId, req.userId!));

  const teams = await Promise.all(
    memberships.map(async ({ team, role }) => {
      const [result] = await db
        .select({ count: db.$count(teamMembersTable, eq(teamMembersTable.teamId, team.id)) })
        .from(teamMembersTable);
      return { ...team, memberCount: Number(result?.count ?? 1) };
    }),
  );

  res.json({ teams });
});

router.get("/:id", requireAuth, async (req: AuthenticatedRequest, res) => {
  const teamId = Number(req.params.id);

  const [membership] = await db
    .select()
    .from(teamMembersTable)
    .where(and(eq(teamMembersTable.teamId, teamId), eq(teamMembersTable.userId, req.userId!)))
    .limit(1);

  if (!membership) {
    res.status(404).json({ error: "Team not found" });
    return;
  }

  const [team] = await db.select().from(teamsTable).where(eq(teamsTable.id, teamId)).limit(1);

  const members = await db
    .select({
      id: teamMembersTable.id,
      userId: teamMembersTable.userId,
      teamId: teamMembersTable.teamId,
      role: teamMembersTable.role,
      user: {
        id: usersTable.id,
        email: usersTable.email,
        name: usersTable.name,
        avatarUrl: usersTable.avatarUrl,
        role: usersTable.role,
        createdAt: usersTable.createdAt,
      },
    })
    .from(teamMembersTable)
    .innerJoin(usersTable, eq(teamMembersTable.userId, usersTable.id))
    .where(eq(teamMembersTable.teamId, teamId));

  res.json({ team: { ...team, memberCount: members.length }, members });
});

router.post("/:id/members", requireAuth, async (req: AuthenticatedRequest, res) => {
  const teamId = Number(req.params.id);
  const parsed = AddTeamMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const [membership] = await db
    .select()
    .from(teamMembersTable)
    .where(and(eq(teamMembersTable.teamId, teamId), eq(teamMembersTable.userId, req.userId!)))
    .limit(1);

  if (!membership || membership.role !== "owner") {
    res.status(403).json({ error: "Only team owners can add members" });
    return;
  }

  const user = await getUserByEmail(parsed.data.email);
  if (!user) {
    res.status(404).json({ error: "User not found with that email" });
    return;
  }

  const [existing] = await db
    .select()
    .from(teamMembersTable)
    .where(and(eq(teamMembersTable.teamId, teamId), eq(teamMembersTable.userId, user.id)))
    .limit(1);

  if (existing) {
    res.status(409).json({ error: "User is already a member of this team" });
    return;
  }

  const [member] = await db.insert(teamMembersTable).values({
    teamId,
    userId: user.id,
    role: "member",
  }).returning();

  res.json({
    member: {
      ...member,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        role: user.role,
        createdAt: user.createdAt,
      },
    },
  });
});

router.delete("/:id/members/:userId", requireAuth, async (req: AuthenticatedRequest, res) => {
  const teamId = Number(req.params.id);
  const memberUserId = Number(req.params.userId);

  const [membership] = await db
    .select()
    .from(teamMembersTable)
    .where(and(eq(teamMembersTable.teamId, teamId), eq(teamMembersTable.userId, req.userId!)))
    .limit(1);

  if (!membership || membership.role !== "owner") {
    res.status(403).json({ error: "Only team owners can remove members" });
    return;
  }

  await db
    .delete(teamMembersTable)
    .where(and(eq(teamMembersTable.teamId, teamId), eq(teamMembersTable.userId, memberUserId)));

  res.json({ message: "Member removed" });
});

export default router;
