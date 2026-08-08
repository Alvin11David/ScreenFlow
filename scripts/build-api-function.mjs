import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Some plugins (e.g. esbuild) may use `require` to resolve dependencies
globalThis.require = createRequire(import.meta.url);
const require = globalThis.require;

const { build } = require("esbuild");

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  await build({
    entryPoints: [path.join(rootDir, "api", "_entry.ts")],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: path.join(rootDir, "api", "index.mjs"),
    logLevel: "info",
    // Runtime dependencies are installed by Vercel and resolved from node_modules.
    // Workspace packages (@workspace/db, @workspace/api-zod) are TypeScript source
    // and must be bundled in. pino/thread-stream stay external so their worker
    // files are never bundled into the single-function output.
    external: [
      "express",
      "cors",
      "cookie-parser",
      "pino",
      "pino-http",
      "pino-pretty",
      "thread-stream",
      "drizzle-orm",
      "pg",
      "bcryptjs",
      "zod",
      // native / unbundleable guards
      "pg-native",
      "bufferutil",
      "utf-8-validate",
      "*.node",
    ],
    sourcemap: false,
    // Keep CJS-only packages (express, pg, ...) working inside the ESM output
    banner: {
      js: `import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';

globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);
    `,
    },
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
