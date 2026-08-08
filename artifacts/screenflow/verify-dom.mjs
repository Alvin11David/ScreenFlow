import puppeteer from "puppeteer";
import sharp from "sharp";

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto("http://localhost:5173/login", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

const dom = await page.evaluate(() => {
  const body = document.body;
  const card = document.querySelector(".card") || [...document.querySelectorAll("div")].find((d) => d.textContent?.includes("Welcome back"));
  const canvas = document.querySelector("canvas");
  const cs = (el) => el ? { ...(() => { const s = getComputedStyle(el); return { visibility: s.visibility, opacity: s.opacity, display: s.display, color: s.color, bg: s.backgroundColor }; })() } : null;
  return {
    innerTextLen: body.innerText?.length ?? -1,
    innerTextSample: body.innerText?.slice(0, 120),
    cardRect: card ? { x: card.getBoundingClientRect().x, y: card.getBoundingClientRect().y, w: card.getBoundingClientRect().width, h: card.getBoundingClientRect().height } : null,
    cardStyle: cs(card),
    canvasRect: canvas ? { x: canvas.getBoundingClientRect().x, y: canvas.getBoundingClientRect().y, w: canvas.getBoundingClientRect().width, h: canvas.getBoundingClientRect().height } : null,
    canvasStyle: cs(canvas),
    webglVersion: (() => { const c = document.createElement("canvas"); const g2 = c.getContext("webgl2"); return g2 ? "webgl2" : (c.getContext("webgl") ? "webgl1" : "none"); })(),
    html: document.documentElement.outerHTML.length,
  };
});

await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-px2.png" });

const { data, info } = await sharp("C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-px2.png").raw().toBuffer({ resolveWithObject: true });
let nonBlack = 0, sum = 0;
for (let i = 0; i < data.length; i += info.channels) {
  const v = Math.max(data[i], data[i + 1], data[i + 2]);
  if (v > 10) { nonBlack++; sum += v; }
}
const pixels = {
  w: info.width, h: info.height,
  nonBlack,
  pct: ((nonBlack / (info.width * info.height)) * 100).toFixed(2),
  avg: nonBlack ? Math.round(sum / nonBlack) : 0,
};

console.log(JSON.stringify({ dom, pixels, logs: logs.slice(0, 30) }, null, 2));
await browser.close();
