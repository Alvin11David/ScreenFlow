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
  const canvases = [...document.querySelectorAll("canvas")].map((c) => ({
    w: c.width,
    h: c.height,
    cw: c.clientWidth,
    ch: c.clientHeight,
  }));
  return {
    canvases,
    scrollable: document.documentElement.scrollHeight > window.innerHeight,
    innerHeight: window.innerHeight,
    scrollHeight: document.documentElement.scrollHeight,
    bodyScrollHeight: document.body.scrollHeight,
    title: document.title,
  };
});

await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/laser-login.png" });
console.log(JSON.stringify({ result, logs: logs.slice(0, 40) }, null, 2));
await browser.close();
