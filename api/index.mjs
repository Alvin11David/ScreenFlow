import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";

// src/routes/index.ts
import { Router as Router7 } from "express";

// src/routes/health.ts
import { Router } from "express";

// ../../lib/api-zod/src/generated/api.ts
import * as zod from "zod";
var GetStatsResponse = zod.object({
  "activeUsers": zod.number(),
  "videosCreated": zod.number(),
  "appStoreRating": zod.number(),
  "countries": zod.number()
});
var HealthCheckResponse = zod.object({
  "status": zod.string()
});
var registerBodyPasswordMin = 8;
var RegisterBody = zod.object({
  "email": zod.string().email(),
  "name": zod.string(),
  "password": zod.string().min(registerBodyPasswordMin)
});
var RegisterResponse = zod.object({
  "user": zod.object({
    "id": zod.number(),
    "email": zod.string(),
    "name": zod.string(),
    "avatarUrl": zod.string().nullish(),
    "role": zod.string(),
    "createdAt": zod.coerce.date()
  })
});
var LoginBody = zod.object({
  "email": zod.string().email(),
  "password": zod.string()
});
var LoginResponse = zod.object({
  "user": zod.object({
    "id": zod.number(),
    "email": zod.string(),
    "name": zod.string(),
    "avatarUrl": zod.string().nullish(),
    "role": zod.string(),
    "createdAt": zod.coerce.date()
  })
});
var LogoutResponse = zod.object({
  "message": zod.string()
});
var GetMeResponse = zod.object({
  "user": zod.object({
    "id": zod.number(),
    "email": zod.string(),
    "name": zod.string(),
    "avatarUrl": zod.string().nullish(),
    "role": zod.string(),
    "createdAt": zod.coerce.date()
  })
});
var listVideosQueryLimitDefault = 20;
var listVideosQueryOffsetDefault = 0;
var ListVideosQueryParams = zod.object({
  "limit": zod.coerce.number().default(listVideosQueryLimitDefault),
  "offset": zod.coerce.number().default(listVideosQueryOffsetDefault)
});
var ListVideosResponse = zod.object({
  "videos": zod.array(zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "title": zod.string(),
    "description": zod.string().nullish(),
    "fileUrl": zod.string().nullish(),
    "thumbnailUrl": zod.string().nullish(),
    "duration": zod.number().nullish(),
    "resolution": zod.string().nullish(),
    "fileSize": zod.number().nullish(),
    "status": zod.string(),
    "visibility": zod.string(),
    "createdAt": zod.coerce.date(),
    "updatedAt": zod.coerce.date()
  })),
  "total": zod.number()
});
var CreateVideoBody = zod.object({
  "title": zod.string(),
  "description": zod.string().optional()
});
var CreateVideoResponse = zod.object({
  "video": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "title": zod.string(),
    "description": zod.string().nullish(),
    "fileUrl": zod.string().nullish(),
    "thumbnailUrl": zod.string().nullish(),
    "duration": zod.number().nullish(),
    "resolution": zod.string().nullish(),
    "fileSize": zod.number().nullish(),
    "status": zod.string(),
    "visibility": zod.string(),
    "createdAt": zod.coerce.date(),
    "updatedAt": zod.coerce.date()
  })
});
var GetVideoParams = zod.object({
  "id": zod.coerce.number()
});
var GetVideoResponse = zod.object({
  "video": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "title": zod.string(),
    "description": zod.string().nullish(),
    "fileUrl": zod.string().nullish(),
    "thumbnailUrl": zod.string().nullish(),
    "duration": zod.number().nullish(),
    "resolution": zod.string().nullish(),
    "fileSize": zod.number().nullish(),
    "status": zod.string(),
    "visibility": zod.string(),
    "createdAt": zod.coerce.date(),
    "updatedAt": zod.coerce.date()
  })
});
var UpdateVideoParams = zod.object({
  "id": zod.coerce.number()
});
var UpdateVideoBody = zod.object({
  "title": zod.string().optional(),
  "description": zod.string().optional(),
  "visibility": zod.enum(["private", "public", "team"]).optional()
});
var UpdateVideoResponse = zod.object({
  "video": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "title": zod.string(),
    "description": zod.string().nullish(),
    "fileUrl": zod.string().nullish(),
    "thumbnailUrl": zod.string().nullish(),
    "duration": zod.number().nullish(),
    "resolution": zod.string().nullish(),
    "fileSize": zod.number().nullish(),
    "status": zod.string(),
    "visibility": zod.string(),
    "createdAt": zod.coerce.date(),
    "updatedAt": zod.coerce.date()
  })
});
var DeleteVideoParams = zod.object({
  "id": zod.coerce.number()
});
var DeleteVideoResponse = zod.object({
  "message": zod.string()
});
var CreateShareLinkParams = zod.object({
  "id": zod.coerce.number()
});
var CreateShareLinkBody = zod.object({
  "password": zod.string().optional(),
  "expiresInHours": zod.number().optional()
});
var CreateShareLinkResponse = zod.object({
  "token": zod.string(),
  "url": zod.string()
});
var GetSharedVideoParams = zod.object({
  "token": zod.coerce.string()
});
var GetSharedVideoResponse = zod.object({
  "video": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "title": zod.string(),
    "description": zod.string().nullish(),
    "fileUrl": zod.string().nullish(),
    "thumbnailUrl": zod.string().nullish(),
    "duration": zod.number().nullish(),
    "resolution": zod.string().nullish(),
    "fileSize": zod.number().nullish(),
    "status": zod.string(),
    "visibility": zod.string(),
    "createdAt": zod.coerce.date(),
    "updatedAt": zod.coerce.date()
  }),
  "owner": zod.object({
    "id": zod.number(),
    "email": zod.string(),
    "name": zod.string(),
    "avatarUrl": zod.string().nullish(),
    "role": zod.string(),
    "createdAt": zod.coerce.date()
  })
});
var RecordAnalyticsParams = zod.object({
  "id": zod.coerce.number()
});
var RecordAnalyticsBody = zod.object({
  "watchedSeconds": zod.number(),
  "totalDuration": zod.number(),
  "referrer": zod.string().optional()
});
var RecordAnalyticsResponse = zod.object({
  "message": zod.string()
});
var CreateTeamBody = zod.object({
  "name": zod.string()
});
var CreateTeamResponse = zod.object({
  "team": zod.object({
    "id": zod.number(),
    "name": zod.string(),
    "slug": zod.string(),
    "ownerId": zod.number(),
    "memberCount": zod.number().optional(),
    "createdAt": zod.coerce.date()
  })
});
var ListTeamsResponse = zod.object({
  "teams": zod.array(zod.object({
    "id": zod.number(),
    "name": zod.string(),
    "slug": zod.string(),
    "ownerId": zod.number(),
    "memberCount": zod.number().optional(),
    "createdAt": zod.coerce.date()
  }))
});
var GetTeamParams = zod.object({
  "id": zod.coerce.number()
});
var GetTeamResponse = zod.object({
  "team": zod.object({
    "id": zod.number(),
    "name": zod.string(),
    "slug": zod.string(),
    "ownerId": zod.number(),
    "memberCount": zod.number().optional(),
    "createdAt": zod.coerce.date()
  }),
  "members": zod.array(zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "teamId": zod.number(),
    "role": zod.string(),
    "user": zod.object({
      "id": zod.number(),
      "email": zod.string(),
      "name": zod.string(),
      "avatarUrl": zod.string().nullish(),
      "role": zod.string(),
      "createdAt": zod.coerce.date()
    }).optional()
  }))
});
var AddTeamMemberParams = zod.object({
  "id": zod.coerce.number()
});
var AddTeamMemberBody = zod.object({
  "email": zod.string().email()
});
var AddTeamMemberResponse = zod.object({
  "member": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "teamId": zod.number(),
    "role": zod.string(),
    "user": zod.object({
      "id": zod.number(),
      "email": zod.string(),
      "name": zod.string(),
      "avatarUrl": zod.string().nullish(),
      "role": zod.string(),
      "createdAt": zod.coerce.date()
    }).optional()
  })
});
var RemoveTeamMemberParams = zod.object({
  "id": zod.coerce.number(),
  "userId": zod.coerce.number()
});
var RemoveTeamMemberResponse = zod.object({
  "message": zod.string()
});
var GetMySubscriptionResponse = zod.object({
  "subscription": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "teamId": zod.number().nullish(),
    "plan": zod.enum(["free", "pro", "team"]),
    "status": zod.string(),
    "currentPeriodStart": zod.coerce.date(),
    "currentPeriodEnd": zod.coerce.date().nullish()
  })
});
var UpdateSubscriptionBody = zod.object({
  "plan": zod.enum(["free", "pro", "team"])
});
var UpdateSubscriptionResponse = zod.object({
  "subscription": zod.object({
    "id": zod.number(),
    "userId": zod.number(),
    "teamId": zod.number().nullish(),
    "plan": zod.enum(["free", "pro", "team"]),
    "status": zod.string(),
    "currentPeriodStart": zod.coerce.date(),
    "currentPeriodEnd": zod.coerce.date().nullish()
  })
});

// src/routes/health.ts
var router = Router();
router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});
var health_default = router;

// src/routes/stats.ts
import { Router as Router2 } from "express";
var router2 = Router2();
router2.get("/stats", (_req, res) => {
  res.json({
    activeUsers: 500,
    videosCreated: 10,
    appStoreRating: 4.9,
    countries: 180
  });
});
var stats_default = router2;

// src/routes/auth.ts
import { Router as Router3 } from "express";

// ../../lib/db/src/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// ../../lib/db/src/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  insertSessionSchema: () => insertSessionSchema,
  insertSubscriptionSchema: () => insertSubscriptionSchema,
  insertTeamMemberSchema: () => insertTeamMemberSchema,
  insertTeamSchema: () => insertTeamSchema,
  insertUserSchema: () => insertUserSchema,
  insertVideoAnalyticsSchema: () => insertVideoAnalyticsSchema,
  insertVideoSchema: () => insertVideoSchema,
  insertVideoShareSchema: () => insertVideoShareSchema,
  publicUserSchema: () => publicUserSchema,
  selectUserSchema: () => selectUserSchema,
  selectVideoSchema: () => selectVideoSchema,
  sessionsTable: () => sessionsTable,
  subscriptionsTable: () => subscriptionsTable,
  teamMembersTable: () => teamMembersTable,
  teamsTable: () => teamsTable,
  usersTable: () => usersTable,
  videoAnalyticsTable: () => videoAnalyticsTable,
  videoSharesTable: () => videoSharesTable,
  videosTable: () => videosTable
});

// ../../lib/db/src/schema/users.ts
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ../../node_modules/.pnpm/drizzle-zod@0.8.3_drizzle-o_9023862330606cbd2d7b4dbe0f6a6add/node_modules/drizzle-zod/index.mjs
import { z } from "zod/v4";
import { isTable, getTableColumns, getViewSelectedFields, is, Column, SQL, isView } from "drizzle-orm";
var CONSTANTS = {
  INT8_MIN: -128,
  INT8_MAX: 127,
  INT8_UNSIGNED_MAX: 255,
  INT16_MIN: -32768,
  INT16_MAX: 32767,
  INT16_UNSIGNED_MAX: 65535,
  INT24_MIN: -8388608,
  INT24_MAX: 8388607,
  INT24_UNSIGNED_MAX: 16777215,
  INT32_MIN: -2147483648,
  INT32_MAX: 2147483647,
  INT32_UNSIGNED_MAX: 4294967295,
  INT48_MIN: -140737488355328,
  INT48_MAX: 140737488355327,
  INT48_UNSIGNED_MAX: 281474976710655,
  INT64_MIN: -9223372036854775808n,
  INT64_MAX: 9223372036854775807n,
  INT64_UNSIGNED_MAX: 18446744073709551615n
};
function isColumnType(column, columnTypes) {
  return columnTypes.includes(column.columnType);
}
function isWithEnum(column) {
  return "enumValues" in column && Array.isArray(column.enumValues) && column.enumValues.length > 0;
}
var isPgEnum = isWithEnum;
var literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
var jsonSchema = z.union([
  literalSchema,
  z.record(z.string(), z.any()),
  z.array(z.any())
]);
var bufferSchema = z.custom((v) => v instanceof Buffer);
function columnToSchema(column, factory) {
  const z$1 = factory?.zodInstance ?? z;
  const coerce2 = factory?.coerce ?? {};
  let schema;
  if (isWithEnum(column)) {
    schema = column.enumValues.length ? z$1.enum(column.enumValues) : z$1.string();
  }
  if (!schema) {
    if (isColumnType(column, ["PgGeometry", "PgPointTuple"])) {
      schema = z$1.tuple([z$1.number(), z$1.number()]);
    } else if (isColumnType(column, ["PgGeometryObject", "PgPointObject"])) {
      schema = z$1.object({ x: z$1.number(), y: z$1.number() });
    } else if (isColumnType(column, ["PgHalfVector", "PgVector"])) {
      schema = z$1.array(z$1.number());
      schema = column.dimensions ? schema.length(column.dimensions) : schema;
    } else if (isColumnType(column, ["PgLine"])) {
      schema = z$1.tuple([z$1.number(), z$1.number(), z$1.number()]);
    } else if (isColumnType(column, ["PgLineABC"])) {
      schema = z$1.object({
        a: z$1.number(),
        b: z$1.number(),
        c: z$1.number()
      });
    } else if (isColumnType(column, ["PgArray"])) {
      schema = z$1.array(columnToSchema(column.baseColumn, factory));
      schema = column.size ? schema.length(column.size) : schema;
    } else if (column.dataType === "array") {
      schema = z$1.array(z$1.any());
    } else if (column.dataType === "number") {
      schema = numberColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "bigint") {
      schema = bigintColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "boolean") {
      schema = coerce2 === true || coerce2.boolean ? z$1.coerce.boolean() : z$1.boolean();
    } else if (column.dataType === "date") {
      schema = coerce2 === true || coerce2.date ? z$1.coerce.date() : z$1.date();
    } else if (column.dataType === "string") {
      schema = stringColumnToSchema(column, z$1, coerce2);
    } else if (column.dataType === "json") {
      schema = jsonSchema;
    } else if (column.dataType === "custom") {
      schema = z$1.any();
    } else if (column.dataType === "buffer") {
      schema = bufferSchema;
    }
  }
  if (!schema) {
    schema = z$1.any();
  }
  return schema;
}
function numberColumnToSchema(column, z2, coerce2) {
  let unsigned = column.getSQLType().includes("unsigned");
  let min;
  let max;
  let integer8 = false;
  if (isColumnType(column, ["MySqlTinyInt", "SingleStoreTinyInt"])) {
    min = unsigned ? 0 : CONSTANTS.INT8_MIN;
    max = unsigned ? CONSTANTS.INT8_UNSIGNED_MAX : CONSTANTS.INT8_MAX;
    integer8 = true;
  } else if (isColumnType(column, [
    "PgSmallInt",
    "PgSmallSerial",
    "MySqlSmallInt",
    "SingleStoreSmallInt"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT16_MIN;
    max = unsigned ? CONSTANTS.INT16_UNSIGNED_MAX : CONSTANTS.INT16_MAX;
    integer8 = true;
  } else if (isColumnType(column, [
    "PgReal",
    "MySqlFloat",
    "MySqlMediumInt",
    "SingleStoreMediumInt",
    "SingleStoreFloat"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT24_MIN;
    max = unsigned ? CONSTANTS.INT24_UNSIGNED_MAX : CONSTANTS.INT24_MAX;
    integer8 = isColumnType(column, ["MySqlMediumInt", "SingleStoreMediumInt"]);
  } else if (isColumnType(column, [
    "PgInteger",
    "PgSerial",
    "MySqlInt",
    "SingleStoreInt"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT32_MIN;
    max = unsigned ? CONSTANTS.INT32_UNSIGNED_MAX : CONSTANTS.INT32_MAX;
    integer8 = true;
  } else if (isColumnType(column, [
    "PgDoublePrecision",
    "MySqlReal",
    "MySqlDouble",
    "SingleStoreReal",
    "SingleStoreDouble",
    "SQLiteReal"
  ])) {
    min = unsigned ? 0 : CONSTANTS.INT48_MIN;
    max = unsigned ? CONSTANTS.INT48_UNSIGNED_MAX : CONSTANTS.INT48_MAX;
  } else if (isColumnType(column, [
    "PgBigInt53",
    "PgBigSerial53",
    "MySqlBigInt53",
    "MySqlSerial",
    "SingleStoreBigInt53",
    "SingleStoreSerial",
    "SQLiteInteger"
  ])) {
    unsigned = unsigned || isColumnType(column, ["MySqlSerial", "SingleStoreSerial"]);
    min = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
    max = Number.MAX_SAFE_INTEGER;
    integer8 = true;
  } else if (isColumnType(column, ["MySqlYear", "SingleStoreYear"])) {
    min = 1901;
    max = 2155;
    integer8 = true;
  } else {
    min = Number.MIN_SAFE_INTEGER;
    max = Number.MAX_SAFE_INTEGER;
  }
  let schema = coerce2 === true || coerce2?.number ? integer8 ? z2.coerce.number() : z2.coerce.number().int() : integer8 ? z2.int() : z2.number();
  schema = schema.gte(min).lte(max);
  return schema;
}
function bigintColumnToSchema(column, z2, coerce2) {
  const unsigned = column.getSQLType().includes("unsigned");
  const min = unsigned ? 0n : CONSTANTS.INT64_MIN;
  const max = unsigned ? CONSTANTS.INT64_UNSIGNED_MAX : CONSTANTS.INT64_MAX;
  const schema = coerce2 === true || coerce2?.bigint ? z2.coerce.bigint() : z2.bigint();
  return schema.gte(min).lte(max);
}
function stringColumnToSchema(column, z2, coerce2) {
  if (isColumnType(column, ["PgUUID"])) {
    return z2.uuid();
  }
  let max;
  let regex;
  let fixed = false;
  if (isColumnType(column, ["PgVarchar", "SQLiteText"])) {
    max = column.length;
  } else if (isColumnType(column, ["MySqlVarChar", "SingleStoreVarChar"])) {
    max = column.length ?? CONSTANTS.INT16_UNSIGNED_MAX;
  } else if (isColumnType(column, ["MySqlText", "SingleStoreText"])) {
    if (column.textType === "longtext") {
      max = CONSTANTS.INT32_UNSIGNED_MAX;
    } else if (column.textType === "mediumtext") {
      max = CONSTANTS.INT24_UNSIGNED_MAX;
    } else if (column.textType === "text") {
      max = CONSTANTS.INT16_UNSIGNED_MAX;
    } else {
      max = CONSTANTS.INT8_UNSIGNED_MAX;
    }
  }
  if (isColumnType(column, [
    "PgChar",
    "MySqlChar",
    "SingleStoreChar"
  ])) {
    max = column.length;
    fixed = true;
  }
  if (isColumnType(column, ["PgBinaryVector"])) {
    regex = /^[01]+$/;
    max = column.dimensions;
  }
  let schema = coerce2 === true || coerce2?.string ? z2.coerce.string() : z2.string();
  schema = regex ? schema.regex(regex) : schema;
  return max && fixed ? schema.length(max) : max ? schema.max(max) : schema;
}
function getColumns(tableLike) {
  return isTable(tableLike) ? getTableColumns(tableLike) : getViewSelectedFields(tableLike);
}
function handleColumns(columns, refinements, conditions, factory) {
  const columnSchemas = {};
  for (const [key, selected] of Object.entries(columns)) {
    if (!is(selected, Column) && !is(selected, SQL) && !is(selected, SQL.Aliased) && typeof selected === "object") {
      const columns2 = isTable(selected) || isView(selected) ? getColumns(selected) : selected;
      columnSchemas[key] = handleColumns(columns2, refinements[key] ?? {}, conditions, factory);
      continue;
    }
    const refinement = refinements[key];
    if (refinement !== void 0 && typeof refinement !== "function") {
      columnSchemas[key] = refinement;
      continue;
    }
    const column = is(selected, Column) ? selected : void 0;
    const schema = column ? columnToSchema(column, factory) : z.any();
    const refined = typeof refinement === "function" ? refinement(schema) : schema;
    if (conditions.never(column)) {
      continue;
    } else {
      columnSchemas[key] = refined;
    }
    if (column) {
      if (conditions.nullable(column)) {
        columnSchemas[key] = columnSchemas[key].nullable();
      }
      if (conditions.optional(column)) {
        columnSchemas[key] = columnSchemas[key].optional();
      }
    }
  }
  return z.object(columnSchemas);
}
function handleEnum(enum_, factory) {
  const zod2 = factory?.zodInstance ?? z;
  return zod2.enum(enum_.enumValues);
}
var selectConditions = {
  never: () => false,
  optional: () => false,
  nullable: (column) => !column.notNull
};
var insertConditions = {
  never: (column) => column?.generated?.type === "always" || column?.generatedIdentity?.type === "always",
  optional: (column) => !column.notNull || column.notNull && column.hasDefault,
  nullable: (column) => !column.notNull
};
var createSelectSchema = (entity, refine) => {
  if (isPgEnum(entity)) {
    return handleEnum(entity);
  }
  const columns = getColumns(entity);
  return handleColumns(columns, refine ?? {}, selectConditions);
};
var createInsertSchema = (entity, refine) => {
  const columns = getColumns(entity);
  return handleColumns(columns, refine ?? {}, insertConditions);
};

// ../../lib/db/src/schema/users.ts
var usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  passwordHash: text("password_hash").notNull(),
  avatarUrl: text("avatar_url"),
  role: varchar("role", { length: 50 }).notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
});
var insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  passwordHash: true,
  role: true,
  createdAt: true,
  updatedAt: true
});
var selectUserSchema = createSelectSchema(usersTable).omit({
  passwordHash: true
});
var publicUserSchema = selectUserSchema;

// ../../lib/db/src/schema/sessions.ts
import { pgTable as pgTable2, serial as serial2, integer, text as text2, timestamp as timestamp2 } from "drizzle-orm/pg-core";
var sessionsTable = pgTable2("sessions", {
  id: serial2("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  token: text2("token").notNull().unique(),
  expiresAt: timestamp2("expires_at").notNull(),
  createdAt: timestamp2("created_at").notNull().defaultNow()
});
var insertSessionSchema = createInsertSchema(sessionsTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/videos.ts
import { pgTable as pgTable3, serial as serial3, integer as integer2, text as text3, timestamp as timestamp3, varchar as varchar2, doublePrecision } from "drizzle-orm/pg-core";
var videosTable = pgTable3("videos", {
  id: serial3("id").primaryKey(),
  userId: integer2("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: varchar2("title", { length: 255 }).notNull(),
  description: text3("description"),
  fileUrl: text3("file_url"),
  thumbnailUrl: text3("thumbnail_url"),
  duration: doublePrecision("duration"),
  resolution: varchar2("resolution", { length: 50 }),
  fileSize: integer2("file_size"),
  status: varchar2("status", { length: 50 }).notNull().default("processing"),
  visibility: varchar2("visibility", { length: 50 }).notNull().default("private"),
  createdAt: timestamp3("created_at").notNull().defaultNow(),
  updatedAt: timestamp3("updated_at").notNull().defaultNow()
});
var insertVideoSchema = createInsertSchema(videosTable).omit({
  id: true,
  userId: true,
  fileUrl: true,
  thumbnailUrl: true,
  duration: true,
  resolution: true,
  fileSize: true,
  status: true,
  createdAt: true,
  updatedAt: true
});
var selectVideoSchema = createSelectSchema(videosTable);

// ../../lib/db/src/schema/video-shares.ts
import { pgTable as pgTable4, serial as serial4, integer as integer3, text as text4, timestamp as timestamp4 } from "drizzle-orm/pg-core";
var videoSharesTable = pgTable4("video_shares", {
  id: serial4("id").primaryKey(),
  videoId: integer3("video_id").notNull().references(() => videosTable.id, { onDelete: "cascade" }),
  shareToken: text4("share_token").notNull().unique(),
  password: text4("password"),
  expiresAt: timestamp4("expires_at"),
  createdAt: timestamp4("created_at").notNull().defaultNow()
});
var insertVideoShareSchema = createInsertSchema(videoSharesTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/video-analytics.ts
import { pgTable as pgTable5, serial as serial5, integer as integer4, text as text5, timestamp as timestamp5, doublePrecision as doublePrecision2, varchar as varchar4 } from "drizzle-orm/pg-core";
var videoAnalyticsTable = pgTable5("video_analytics", {
  id: serial5("id").primaryKey(),
  videoId: integer4("video_id").notNull().references(() => videosTable.id, { onDelete: "cascade" }),
  viewerIp: varchar4("viewer_ip", { length: 45 }),
  userAgent: text5("user_agent"),
  watchedSeconds: doublePrecision2("watched_seconds").notNull().default(0),
  totalDuration: doublePrecision2("total_duration").notNull().default(0),
  referrer: text5("referrer"),
  createdAt: timestamp5("created_at").notNull().defaultNow()
});
var insertVideoAnalyticsSchema = createInsertSchema(videoAnalyticsTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/teams.ts
import { pgTable as pgTable6, serial as serial6, integer as integer5, varchar as varchar5, timestamp as timestamp6 } from "drizzle-orm/pg-core";
var teamsTable = pgTable6("teams", {
  id: serial6("id").primaryKey(),
  name: varchar5("name", { length: 255 }).notNull(),
  slug: varchar5("slug", { length: 255 }).notNull().unique(),
  ownerId: integer5("owner_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp6("created_at").notNull().defaultNow()
});
var insertTeamSchema = createInsertSchema(teamsTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/team-members.ts
import { pgTable as pgTable7, serial as serial7, integer as integer6, varchar as varchar6, timestamp as timestamp7 } from "drizzle-orm/pg-core";
var teamMembersTable = pgTable7("team_members", {
  id: serial7("id").primaryKey(),
  teamId: integer6("team_id").notNull().references(() => teamsTable.id, { onDelete: "cascade" }),
  userId: integer6("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  role: varchar6("role", { length: 50 }).notNull().default("member"),
  createdAt: timestamp7("created_at").notNull().defaultNow()
});
var insertTeamMemberSchema = createInsertSchema(teamMembersTable).omit({
  id: true,
  createdAt: true
});

// ../../lib/db/src/schema/subscriptions.ts
import { pgTable as pgTable8, serial as serial8, integer as integer7, varchar as varchar7, timestamp as timestamp8 } from "drizzle-orm/pg-core";
var subscriptionsTable = pgTable8("subscriptions", {
  id: serial8("id").primaryKey(),
  userId: integer7("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  teamId: integer7("team_id").references(() => teamsTable.id, { onDelete: "set null" }),
  plan: varchar7("plan", { length: 50 }).notNull().default("free"),
  status: varchar7("status", { length: 50 }).notNull().default("active"),
  currentPeriodStart: timestamp8("current_period_start").notNull().defaultNow(),
  currentPeriodEnd: timestamp8("current_period_end"),
  createdAt: timestamp8("created_at").notNull().defaultNow(),
  updatedAt: timestamp8("updated_at").notNull().defaultNow()
});
var insertSubscriptionSchema = createInsertSchema(subscriptionsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// ../../lib/db/src/index.ts
var { Pool } = pg;
var poolInstance;
function getPool() {
  if (!poolInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    poolInstance = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return poolInstance;
}
var pool = new Proxy({}, {
  get(_target, prop, receiver) {
    if (prop === "constructor") return pg.Pool;
    const real = getPool();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
  getPrototypeOf() {
    return pg.Pool.prototype;
  }
});
var db = drizzle(pool, { schema: schema_exports });

// src/lib/auth.ts
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
var SALT_ROUNDS = 10;
var SESSION_DURATION_DAYS = 30;
async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}
async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
function generateSessionToken() {
  return crypto.randomBytes(48).toString("hex");
}
function getExpiresAt() {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + SESSION_DURATION_DAYS);
  return date;
}
async function createSession(userId) {
  const token = generateSessionToken();
  await db.insert(sessionsTable).values({
    userId,
    token,
    expiresAt: getExpiresAt()
  });
  return token;
}
async function getSessionUserId(token) {
  if (!token) return null;
  const [session] = await db.select().from(sessionsTable).where(eq(sessionsTable.token, token)).limit(1);
  if (!session) return null;
  if (session.expiresAt < /* @__PURE__ */ new Date()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));
    return null;
  }
  return session.userId;
}
async function deleteSession(token) {
  await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
}
async function getUserById(id) {
  const [user] = await db.select({
    id: usersTable.id,
    email: usersTable.email,
    name: usersTable.name,
    avatarUrl: usersTable.avatarUrl,
    role: usersTable.role,
    createdAt: usersTable.createdAt
  }).from(usersTable).where(eq(usersTable.id, id)).limit(1);
  return user ?? null;
}
async function getUserByEmail(email) {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  return user ?? null;
}

// src/middlewares/auth.ts
async function requireAuth(req, res, next) {
  const token = req.cookies?.session;
  const userId = await getSessionUserId(token);
  if (!userId) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  req.userId = userId;
  next();
}
async function optionalAuth(req, _res, next) {
  const token = req.cookies?.session;
  req.userId = await getSessionUserId(token) ?? void 0;
  next();
}

// src/routes/auth.ts
var router3 = Router3();
router3.post("/register", async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { email, name, password } = parsed.data;
  const existing = await getUserByEmail(email);
  if (existing) {
    res.status(409).json({ error: "An account with this email already exists" });
    return;
  }
  const passwordHash = await hashPassword(password);
  const [user] = await db.insert(usersTable).values({ email, name, passwordHash }).returning({ id: usersTable.id, email: usersTable.email, name: usersTable.name, avatarUrl: usersTable.avatarUrl, role: usersTable.role, createdAt: usersTable.createdAt });
  const token = await createSession(user.id);
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1e3,
    path: "/"
  });
  res.status(201).json({ user });
});
router3.post("/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const { email, password } = parsed.data;
  const user = await getUserByEmail(email);
  if (!user || !await verifyPassword(password, user.passwordHash)) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }
  const token = await createSession(user.id);
  res.cookie("session", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1e3,
    path: "/"
  });
  const { passwordHash: _, ...safeUser } = user;
  res.json({ user: safeUser });
});
router3.post("/logout", async (req, res) => {
  const token = req.cookies?.session;
  if (token) {
    await deleteSession(token);
  }
  res.clearCookie("session", { path: "/" });
  res.json({ message: "Logged out" });
});
router3.get("/me", requireAuth, async (req, res) => {
  const user = await getUserById(req.userId);
  if (!user) {
    res.status(401).json({ error: "User not found" });
    return;
  }
  res.json({ user });
});
var auth_default = router3;

// src/routes/videos.ts
import { Router as Router4 } from "express";
import { eq as eq2, and, desc, count } from "drizzle-orm";
import crypto2 from "node:crypto";
var router4 = Router4();
router4.get("/", requireAuth, async (req, res) => {
  const limit = Math.min(Math.abs(Number(req.query.limit)) || 20, 100);
  const offset = Math.abs(Number(req.query.offset)) || 0;
  const [totalResult] = await db.select({ value: count() }).from(videosTable).where(eq2(videosTable.userId, req.userId));
  const videos = await db.select().from(videosTable).where(eq2(videosTable.userId, req.userId)).orderBy(desc(videosTable.createdAt)).limit(limit).offset(offset);
  res.json({ videos, total: Number(totalResult.value) });
});
router4.post("/", requireAuth, async (req, res) => {
  const parsed = CreateVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const [video] = await db.insert(videosTable).values({ userId: req.userId, title: parsed.data.title, description: parsed.data.description ?? null }).returning();
  res.status(201).json({ video });
});
router4.get("/:id", requireAuth, async (req, res) => {
  const [video] = await db.select().from(videosTable).where(and(eq2(videosTable.id, Number(req.params.id)), eq2(videosTable.userId, req.userId))).limit(1);
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json({ video });
});
router4.patch("/:id", requireAuth, async (req, res) => {
  const parsed = UpdateVideoBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const [video] = await db.update(videosTable).set({ ...parsed.data, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq2(videosTable.id, Number(req.params.id)), eq2(videosTable.userId, req.userId))).returning();
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json({ video });
});
router4.delete("/:id", requireAuth, async (req, res) => {
  const [deleted] = await db.delete(videosTable).where(and(eq2(videosTable.id, Number(req.params.id)), eq2(videosTable.userId, req.userId))).returning();
  if (!deleted) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  res.json({ message: "Video deleted" });
});
router4.post("/:id/share", requireAuth, async (req, res) => {
  const videoId = Number(req.params.id);
  const [video] = await db.select().from(videosTable).where(and(eq2(videosTable.id, videoId), eq2(videosTable.userId, req.userId))).limit(1);
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  const parsed = CreateShareLinkBody.safeParse(req.body);
  const shareToken = crypto2.randomBytes(24).toString("hex");
  let expiresAt;
  if (parsed.success && parsed.data.expiresInHours) {
    expiresAt = /* @__PURE__ */ new Date();
    expiresAt.setHours(expiresAt.getHours() + parsed.data.expiresInHours);
  }
  await db.insert(videoSharesTable).values({
    videoId,
    shareToken,
    password: parsed.success ? parsed.data.password ?? null : null,
    expiresAt: expiresAt ?? null
  });
  const url = `/videos/shared/${shareToken}`;
  res.json({ token: shareToken, url });
});
router4.get("/shared/:token", optionalAuth, async (req, res) => {
  const [share] = await db.select().from(videoSharesTable).where(eq2(videoSharesTable.shareToken, req.params.token)).limit(1);
  if (!share || share.expiresAt && share.expiresAt < /* @__PURE__ */ new Date()) {
    res.status(404).json({ error: "Share link not found or expired" });
    return;
  }
  const [video] = await db.select().from(videosTable).where(eq2(videosTable.id, share.videoId)).limit(1);
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  const [owner] = await db.select({
    id: usersTable.id,
    email: usersTable.email,
    name: usersTable.name,
    avatarUrl: usersTable.avatarUrl,
    role: usersTable.role,
    createdAt: usersTable.createdAt
  }).from(usersTable).where(eq2(usersTable.id, video.userId)).limit(1);
  res.json({ video, owner });
});
router4.post("/:id/analytics", async (req, res) => {
  const videoId = Number(req.params.id);
  const parsed = RecordAnalyticsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid analytics data" });
    return;
  }
  const [video] = await db.select({ id: videosTable.id }).from(videosTable).where(eq2(videosTable.id, videoId)).limit(1);
  if (!video) {
    res.status(404).json({ error: "Video not found" });
    return;
  }
  await db.insert(videoAnalyticsTable).values({
    videoId,
    watchedSeconds: parsed.data.watchedSeconds,
    totalDuration: parsed.data.totalDuration,
    referrer: parsed.data.referrer ?? null,
    viewerIp: req.ip ?? null,
    userAgent: req.headers["user-agent"] ?? null
  });
  res.json({ message: "Analytics recorded" });
});
var videos_default = router4;

// src/routes/teams.ts
import { Router as Router5 } from "express";
import { eq as eq3, and as and2 } from "drizzle-orm";
var router5 = Router5();
router5.post("/", requireAuth, async (req, res) => {
  const parsed = CreateTeamBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
    return;
  }
  const slug = parsed.data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const [team] = await db.insert(teamsTable).values({
    name: parsed.data.name,
    slug,
    ownerId: req.userId
  }).returning();
  await db.insert(teamMembersTable).values({
    teamId: team.id,
    userId: req.userId,
    role: "owner"
  });
  res.status(201).json({ team: { ...team, memberCount: 1 } });
});
router5.get("/", requireAuth, async (req, res) => {
  const memberships = await db.select({
    team: teamsTable,
    role: teamMembersTable.role
  }).from(teamMembersTable).innerJoin(teamsTable, eq3(teamMembersTable.teamId, teamsTable.id)).where(eq3(teamMembersTable.userId, req.userId));
  const teams = await Promise.all(
    memberships.map(async ({ team, role }) => {
      const [result] = await db.select({ count: db.$count(teamMembersTable, eq3(teamMembersTable.teamId, team.id)) }).from(teamMembersTable);
      return { ...team, memberCount: Number(result?.count ?? 1) };
    })
  );
  res.json({ teams });
});
router5.get("/:id", requireAuth, async (req, res) => {
  const teamId = Number(req.params.id);
  const [membership] = await db.select().from(teamMembersTable).where(and2(eq3(teamMembersTable.teamId, teamId), eq3(teamMembersTable.userId, req.userId))).limit(1);
  if (!membership) {
    res.status(404).json({ error: "Team not found" });
    return;
  }
  const [team] = await db.select().from(teamsTable).where(eq3(teamsTable.id, teamId)).limit(1);
  const members = await db.select({
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
      createdAt: usersTable.createdAt
    }
  }).from(teamMembersTable).innerJoin(usersTable, eq3(teamMembersTable.userId, usersTable.id)).where(eq3(teamMembersTable.teamId, teamId));
  res.json({ team: { ...team, memberCount: members.length }, members });
});
router5.post("/:id/members", requireAuth, async (req, res) => {
  const teamId = Number(req.params.id);
  const parsed = AddTeamMemberBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }
  const [membership] = await db.select().from(teamMembersTable).where(and2(eq3(teamMembersTable.teamId, teamId), eq3(teamMembersTable.userId, req.userId))).limit(1);
  if (!membership || membership.role !== "owner") {
    res.status(403).json({ error: "Only team owners can add members" });
    return;
  }
  const user = await getUserByEmail(parsed.data.email);
  if (!user) {
    res.status(404).json({ error: "User not found with that email" });
    return;
  }
  const [existing] = await db.select().from(teamMembersTable).where(and2(eq3(teamMembersTable.teamId, teamId), eq3(teamMembersTable.userId, user.id))).limit(1);
  if (existing) {
    res.status(409).json({ error: "User is already a member of this team" });
    return;
  }
  const [member] = await db.insert(teamMembersTable).values({
    teamId,
    userId: user.id,
    role: "member"
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
        createdAt: user.createdAt
      }
    }
  });
});
router5.delete("/:id/members/:userId", requireAuth, async (req, res) => {
  const teamId = Number(req.params.id);
  const memberUserId = Number(req.params.userId);
  const [membership] = await db.select().from(teamMembersTable).where(and2(eq3(teamMembersTable.teamId, teamId), eq3(teamMembersTable.userId, req.userId))).limit(1);
  if (!membership || membership.role !== "owner") {
    res.status(403).json({ error: "Only team owners can remove members" });
    return;
  }
  await db.delete(teamMembersTable).where(and2(eq3(teamMembersTable.teamId, teamId), eq3(teamMembersTable.userId, memberUserId)));
  res.json({ message: "Member removed" });
});
var teams_default = router5;

// src/routes/subscriptions.ts
import { Router as Router6 } from "express";
import { eq as eq4 } from "drizzle-orm";
var router6 = Router6();
router6.get("/me", requireAuth, async (req, res) => {
  const [subscription] = await db.select().from(subscriptionsTable).where(eq4(subscriptionsTable.userId, req.userId)).limit(1);
  if (!subscription) {
    const [created] = await db.insert(subscriptionsTable).values({
      userId: req.userId,
      plan: "free"
    }).returning();
    res.json({ subscription: created });
    return;
  }
  res.json({ subscription });
});
router6.put("/me", requireAuth, async (req, res) => {
  const parsed = UpdateSubscriptionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid plan" });
    return;
  }
  const [existing] = await db.select().from(subscriptionsTable).where(eq4(subscriptionsTable.userId, req.userId)).limit(1);
  let subscription;
  if (existing) {
    [subscription] = await db.update(subscriptionsTable).set({ plan: parsed.data.plan, updatedAt: /* @__PURE__ */ new Date() }).where(eq4(subscriptionsTable.userId, req.userId)).returning();
  } else {
    [subscription] = await db.insert(subscriptionsTable).values({ userId: req.userId, plan: parsed.data.plan }).returning();
  }
  res.json({ subscription });
});
var subscriptions_default = router6;

// src/routes/index.ts
var router7 = Router7();
router7.use(health_default);
router7.use(stats_default);
router7.use("/auth", auth_default);
router7.use("/videos", videos_default);
router7.use("/teams", teams_default);
router7.use("/subscriptions", subscriptions_default);
var routes_default = router7;

// src/lib/logger.ts
import pino from "pino";
var isProduction = process.env.NODE_ENV === "production";
var logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']"
  ],
  ...isProduction ? {} : {
    transport: {
      target: "pino-pretty",
      options: { colorize: true }
    }
  }
});

// src/app.ts
var app = express();
app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0]
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode
        };
      }
    }
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", routes_default);
var app_default = app;

// ../../api/_entry.ts
var entry_default = app_default;
export {
  entry_default as default
};
