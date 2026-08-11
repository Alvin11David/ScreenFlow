import puppeteer from "puppeteer";
import sharp from "sharp";

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--disable-background-timer-throttling", "--disable-renderer-backgrounding"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:5173/", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/beam.png" });
const { data, info } = await sharp("C:/Users/ALVIN/AppData/Local/Temp/opencode/beam.png").raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
const cx = W / 2;

// Vertical profile of purple pixels in the center column (±50px), excluding the card's x-range is impossible,
// so we report counts per 50px strip and find extreme y values for strips outside the card.
const stripCount = [];
let maxYAbove = -1, minYBelow = -1, maxYAboveFound = 0, minYBelowFound = 0;
for (let y = 0; y < H; y++) {
  let c = 0;
  for (let x = cx - 50; x < cx + 50; x++) {
    const i = (y * W + x) * 3;
    if (data[i + 2] > 60 && data[i] > 40 && data[i + 1] < data[i + 2] * 0.8) c++;
  }
  if (y % 50 === 0) stripCount.push([y, c]);
  if (y < 250 && c > 0) { maxYAbove = y; maxYAboveFound = Math.max(maxYAboveFound, c); }
  if (y > 680 && c > 0) { minYBelow = y; minYBelowFound = Math.max(minYBelowFound, c); }
}
console.log(JSON.stringify({
  strips: stripCount.filter(([, c]) => c > 0),
  beamTop: maxYAbove, // highest y below 250 with beam purple (largest y above card)
  beamBottomStart: minYBelow, // lowest y above 680 with beam purple (smallest y below card)
}, null, 2));
await browser.close();
