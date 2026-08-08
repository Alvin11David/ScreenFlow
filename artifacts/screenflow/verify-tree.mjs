import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

await page.goto("http://localhost:5173/login", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

const tree = await page.evaluate(() => {
  const out = [];
  const walk = (el, depth) => {
    if (depth > 8) return;
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    out.push({
      d: depth,
      tag: el.tagName.toLowerCase(),
      cls: (el.className && typeof el.className === "string") ? el.className.slice(0, 90) : "",
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      pos: s.position,
      vis: s.visibility,
      z: s.zIndex,
      disp: s.display,
      text: el.childElementCount === 0 ? (el.textContent || "").slice(0, 40) : "",
    });
    for (const c of el.children) walk(c, depth + 1);
  };
  walk(document.body, 0);
  return out;
});
console.log(JSON.stringify(tree, null, 1));
await browser.close();
