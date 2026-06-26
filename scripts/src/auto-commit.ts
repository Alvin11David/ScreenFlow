import { watch } from "fs";
import { execSync } from "child_process";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../..");
const DEBOUNCE_MS = 30_000;
const POLL_INTERVAL = 5_000;

let timer: ReturnType<typeof setTimeout> | null = null;
let lastCommit = 0;

function commitAndPush() {
  const now = Date.now();
  if (now - lastCommit < DEBOUNCE_MS) return;

  try {
    execSync("git add -A", { cwd: ROOT, stdio: "pipe" });
    const status = execSync("git status --porcelain", { cwd: ROOT, stdio: "pipe" }).toString().trim();
    if (!status) return;

    execSync(`git commit -m "auto-commit: ${new Date().toISOString()}"`, { cwd: ROOT, stdio: "pipe" });
    execSync("git push", { cwd: ROOT, stdio: "pipe" });
    lastCommit = now;
    console.log(`[auto-commit] committed & pushed at ${new Date().toISOString()}`);
  } catch (e: unknown) {
    const err = e as Error;
    console.error(`[auto-commit] error: ${err.message}`);
  }
}

function scheduleCommit() {
  if (timer) clearTimeout(timer);
  timer = setTimeout(commitAndPush, DEBOUNCE_MS);
}

console.log("[auto-commit] watching for changes...");

try {
  watch(ROOT, { recursive: true }).on("change", (event, filename) => {
    if (!filename) return;
    const p = filename.toString();
    if (
      p.startsWith(".git") ||
      p.startsWith("node_modules") ||
      p.endsWith(".tsbuildinfo")
    ) return;
    scheduleCommit();
  });
} catch {
  console.log("[auto-commit] falling back to polling...");
  let prev = execSync("git status --porcelain", { cwd: ROOT, stdio: "pipe" }).toString();
  setInterval(() => {
    const cur = execSync("git status --porcelain", { cwd: ROOT, stdio: "pipe" }).toString();
    if (cur !== prev) {
      prev = cur;
      scheduleCommit();
    }
  }, POLL_INTERVAL);
}
