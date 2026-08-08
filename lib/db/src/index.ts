import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

let poolInstance: pg.Pool | undefined;

function getPool(): pg.Pool {
  if (!poolInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?",
      );
    }
    poolInstance = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return poolInstance;
}

export const pool = new Proxy({} as pg.Pool, {
  get(_target, prop, receiver) {
    if (prop === "constructor") return pg.Pool;
    const real = getPool();
    const value = Reflect.get(real, prop, receiver);
    return typeof value === "function" ? value.bind(real) : value;
  },
  getPrototypeOf() {
    return pg.Pool.prototype;
  },
});

export const db = drizzle(pool, { schema });

export * from "./schema";
