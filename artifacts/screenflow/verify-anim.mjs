import puppeteer from "puppeteer";
import sharp from "sharp";

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

// Count RAF frames over ~1s
const rafCount = await page.evaluate(() => new Promise((resolve) => {
  window.__rafCount = 0;
  const step = () => { window.__rafCount++; requestAnimationFrame(step); };
  requestAnimationFrame(step);
  setTimeout(() => resolve(window.__rafCount), 1000);
}));

async function shot(name) {
  await page.screenshot({ path: name });
  const { data, info } = await sharp(name).raw().toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height };
}

const s1 = await shot("C:/Users/ALVIN/AppData/Local/Temp/opencode/anim1.png");
await new Promise((r) => setTimeout(r, 900));
const s2 = await shot("C:/Users/ALVIN/AppData/Local/Temp/opencode/anim2.png");

// Compare only beam-relevant regions (top 100px, bottom 100px, excluding card)
function regionStats(S, x0, x1, y0, y1) {
  let purple = 0;
  const { data, W, H } = S;
  for (let y = Math.max(0, y0); y < Math.min(H, y1); y++) {
    for (let x = Math.max(0, x0); x < Math.min(W, x1); x++) {
      const i = (y * W + x) * 3;
      if (data[i + 2] > 60 && data[i] > 40 && data[i + 1] < data[i + 2] * 0.8) purple++;
    }
  }
  return purple;
}

const beamW = 160; // px either side of center
const cx = s1.W / 2;
const regions = {
  topPurple: regionStats(s1, cx - beamW, cx + beamW, 0, 100),
  bottomPurple: regionStats(s1, cx - beamW, cx + beamW, s1.H - 100, s1.H),
};

// Pixel diff in beam regions between two shots
function diffInRegion(a, b, x0, x1, y0, y1) {
  let d = 0;
  for (let y = Math.max(0, y0); y < Math.min(a.H, y1); y++) {
    for (let x = Math.max(0, x0); x < Math.min(a.W, x1); x++) {
      const i = (y * a.W + x) * 3;
      d += Math.abs(a.data[i] - b.data[i]) + Math.abs(a.data[i + 1] - b.data[i + 1]) + Math.abs(a.data[i + 2] - b.data[i + 2]);
    }
  }
  return d;
}
const topDiff = diffInRegion(s1, s2, cx - beamW, cx + beamW, 0, 100);
const botDiff = diffInRegion(s1, s2, cx - beamW, cx + beamW, s1.H - 100, s1.H);

console.log(JSON.stringify({ rafFramesPerSec: rafCount, regions, topDiff, botDiff }, null, 2));
await browser.close();
