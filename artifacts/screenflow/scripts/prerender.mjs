import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist", "public");

const routes = ["/", "/thanks"];
const PORT = 7890;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".xml": "text/xml",
  ".txt": "text/plain",
  ".woff2": "font/woff2",
};

function startServer(rootDir) {
  return http.createServer((req, res) => {
    let filePath = path.join(rootDir, req.url === "/" ? "index.html" : req.url);

    if (!fs.existsSync(filePath)) {
      filePath = path.join(rootDir, "index.html");
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  }).listen(PORT, "127.0.0.1");
}

function findSystemBrowser() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/snap/bin/chromium",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function tryLaunchPuppeteer() {
  // First: let puppeteer find its own cached browser (works on Linux/CI)
  try {
    return await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch {}

  // Second: try a system-installed browser
  const systemPath = findSystemBrowser();
  if (systemPath) {
    try {
      return await puppeteer.launch({
        headless: true,
        executablePath: systemPath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    } catch {}
  }

  return null;
}

async function prerender() {
  console.log(`Starting server on http://127.0.0.1:${PORT}...`);
  const server = startServer(distDir);

  const browser = await tryLaunchPuppeteer();
  if (!browser) {
    console.warn("No browser available for prerendering. Deploying SPA without prerender.");
    console.warn("Install puppeteer's browser locally: npx puppeteer browsers install chrome");
    server.close();
    return;
  }

  try {
    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`  Prerendering ${route}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      await page.waitForSelector("#root > *", { timeout: 10000 }).catch(() => {
        console.log(`  Warning: #root children not found on ${route}, proceeding anyway`);
      });

      await new Promise((r) => setTimeout(r, 2000));

      const html = await page.content();
      await page.close();

      if (route === "/") {
        fs.writeFileSync(path.join(distDir, "index.html"), html, "utf-8");
        console.log(`  Saved ${route} → dist/public/index.html (${(html.length / 1024).toFixed(1)} KB)`);
      } else if (route === "/thanks") {
        const thanksDir = path.join(distDir, "thanks");
        fs.mkdirSync(thanksDir, { recursive: true });
        fs.writeFileSync(path.join(thanksDir, "index.html"), html, "utf-8");
        console.log(`  Saved ${route} → dist/public/thanks/index.html (${(html.length / 1024).toFixed(1)} KB)`);
      }
    }

    console.log("Prerendering complete!");
  } catch (err) {
    console.error("Prerendering failed:", err);
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender();
