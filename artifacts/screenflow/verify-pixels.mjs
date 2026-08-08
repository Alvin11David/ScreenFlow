import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--ignore-gpu-blocklist", "--enable-unsafe-swiftshader", "--enable-webgl", "--use-gl=angle"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto("http://localhost:5173/login", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 4000));

const result = await page.evaluate(() => {
  const canvas = document.querySelector("canvas");
  if (!canvas) return { error: "no canvas" };
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return { error: "no gl context" };
  return new Promise((resolve) => {
    const check = () => {
      const w = gl.drawingBufferWidth;
      const h = gl.drawingBufferHeight;
      const buf = new Uint8Array(w * h * 4);
      try {
        gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, buf);
      } catch (e) {
        resolve({ error: String(e) });
        return;
      }
      let nonBlack = 0;
      let maxV = 0;
      let sum = 0;
      let maxR = 0, maxG = 0, maxB = 0;
      let purple = 0, green = 0;
      for (let i = 0; i < buf.length; i += 4) {
        const r = buf[i], g = buf[i + 1], b = buf[i + 2], a = buf[i + 3];
        const v = Math.max(r, g, b);
        if (v > 10) {
          nonBlack++;
          maxV = Math.max(maxV, v);
          sum += v;
        }
        maxR = Math.max(maxR, r); maxG = Math.max(maxG, g); maxB = Math.max(maxB, b);
        if (b > 60 && r > 40 && g < b * 0.8) purple++;
        if (g > 60 && g > r && g > b) green++;
      }
      const frame = {
        w, h, nonBlack,
        nonBlackPct: (nonBlack / ((w * h) || 1)) * 100,
        maxV, maxR, maxG, maxB,
        avgNonBlack: nonBlack ? Math.round(sum / nonBlack) : 0,
        purple, green,
      };
      resolve(frame);
    };
    requestAnimationFrame(check);
    setTimeout(() => {
      check();
    }, 200);
  });
});

await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-px.png" });
console.log(JSON.stringify({ result, errors: logs.filter((l) => /error|Error|THREE|WebGL|Shader/i.test(l)).slice(0, 20) }, null, 2));
await browser.close();
