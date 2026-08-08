import puppeteer from "puppeteer";
import sharp from "sharp";

const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto("http://localhost:5173/login", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

const layout = await page.evaluate(() => {
  const fixed = document.querySelector("div.fixed");
  const wrapper = [...document.querySelectorAll("div")].find((d) => (d.className || "").includes("justify-center") && (d.className || "").includes("h-full"));
  const eff = [...document.querySelectorAll("div")].find((d) => (d.className || "").includes("absolute inset-0"));
  const cardEl = [...document.querySelectorAll("div")].find((d) => (d.className || "").includes("max-w-md"));
  const r = (el) => { const b = el.getBoundingClientRect(); return { x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.width), h: Math.round(b.height) }; };
  return {
    effect: eff ? { cls: eff.className, ...r(eff), pos: getComputedStyle(eff).position } : null,
    wrapper: wrapper ? { ...r(wrapper), pos: getComputedStyle(wrapper).position } : null,
    card: cardEl ? { ...r(cardEl) } : null,
    viewport: window.innerHeight,
  };
});

await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-final.png" });
const { data, info } = await sharp("C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-final.png").raw().toBuffer({ resolveWithObject: true });
let nonBlack = 0, purple = 0, sum = 0;
for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const v = Math.max(r, g, b);
  if (v > 10) { nonBlack++; sum += v; }
  if (b > 60 && r > 40 && g < b * 0.8) purple++;
}
const pixels = {
  w: info.width, h: info.height, nonBlack,
  pct: ((nonBlack / (info.width * info.height)) * 100).toFixed(2),
  avg: nonBlack ? Math.round(sum / nonBlack) : 0,
  purple,
};

console.log(JSON.stringify({ layout, pixels, errors: logs.filter((l) => /error|Error|Shader|WebGL/i.test(l)) }, null, 2));
await browser.close();
