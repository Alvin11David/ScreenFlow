import puppeteer from "puppeteer";
import sharp from "sharp";

const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto("http://localhost:5173/", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

async function grabFrame() {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return new Promise((resolve) => {
      const read = () => {
        const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
        const buf = new Uint8Array(w * h * 4);
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buf);
        resolve(buf);
      };
      requestAnimationFrame(read);
    });
  });
}

const frameA = await grabFrame();
await new Promise((r) => setTimeout(r, 600));
const frameB = await grabFrame();

const anim = await page.evaluate((a, b) => {
  const w = 864, h = 540; // drawing buffer
  let diffPx = 0, maxDiff = 0;
  for (let i = 0; i < a.length; i += 4) {
    const d = Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]);
    if (d > 30) diffPx++;
    if (d > maxDiff) maxDiff = d;
  }
  return { diffPx, maxDiff, pct: ((diffPx / (w * h)) * 100).toFixed(2) };
}, Array.from(frameA), Array.from(frameB));

// Analyze screenshot: purple beam presence per region
await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-center.png" });
const { data, info } = await sharp("C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-center.png").raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const isPurple = (i) => data[i + 2] > 60 && data[i] > 40 && data[i + 1] < data[i + 2] * 0.8;
let centerCol = 0, topStrip = 0, bottomStrip = 0, total = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 3;
    if (isPurple(i)) {
      total++;
      if (Math.abs(x - W / 2) < 40) centerCol++;
      if (y < 60) topStrip++;
      if (y > H - 60) bottomStrip++;
    }
  }
}
const regions = {
  W, H,
  centerColPx: centerCol,
  topStripPx: topStrip,
  bottomStripPx: bottomStrip,
  totalPurple: total,
};
console.log(JSON.stringify({ anim, regions }, null, 2));
await browser.close();
