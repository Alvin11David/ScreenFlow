import { Pool } from "pg";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL must be set");
  process.exit(1);
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: node apply-migration.mjs <sql-file>");
  process.exit(1);
}

const sqlPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  file,
);
const sql = readFileSync(sqlPath, "utf8");

const pool = new Pool({ connectionString: url });

try {
  const result = await pool.query(sql);
  console.log("Migration applied successfully");
  if (Array.isArray(result)) {
    for (const r of result) console.log(r.command, r.rowCount);
  } else {
    console.log(result.command, result.rowCount);
  }
} catch (err) {
  console.error("Migration failed:", err.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
