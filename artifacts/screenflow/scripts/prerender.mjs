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

async function prerender() {
  console.log(`Starting server on http://127.0.0.1:${PORT}...`);
  const server = startServer(distDir);

  let browser;
  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    for (const route of routes) {
      const url = `http://127.0.0.1:${PORT}${route}`;
      console.log(`  Prerendering ${route}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 720 });

      await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

      // Wait for React to render content
      await page.waitForSelector("#root > *", { timeout: 10000 }).catch(() => {
        console.log(`  Warning: #root children not found on ${route}, proceeding anyway`);
      });

      // Extra wait for any animations/lazy loading
      await new Promise((r) => setTimeout(r, 2000));

      const html = await page.content();
      await page.close();

      // Determine output path
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
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

prerender();
