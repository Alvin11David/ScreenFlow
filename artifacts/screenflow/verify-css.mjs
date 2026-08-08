import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const logs = [];
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on("requestfailed", (r) => logs.push(`[reqfailed] ${r.url()} ${r.failure()?.errorText}`));
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`));

await page.goto("http://localhost:5173/login", { waitUntil: "load", timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

const styles = await page.evaluate(() => {
  const sheets = [...document.styleSheets].map((s) => {
    let rules = 0;
    try { rules = s.cssRules.length; } catch (e) { rules = -1; }
    return { href: s.href, rules };
  });
  const fixedDiv = document.querySelector("div.fixed");
  const card = document.querySelector(".card");
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      position: s.position, bg: s.backgroundColor, h: s.height, w: s.width,
      display: s.display, overflow: s.overflow, z: s.zIndex,
    };
  };
  return {
    sheets,
    hasTailwindVars: !!document.querySelector('[style*="--tw"]') || (document.styleSheets.length > 0 && Array.from(document.styleSheets).some((s) => {
      try { return [...s.cssRules].some((r) => r.cssText.includes("--tw-") || r.cssText.includes("--color-")); } catch { return false; }
    })),
    fixedDiv: fixedDiv ? cs(fixedDiv) : null,
    card: card ? cs(card) : null,
    bodyFont: getComputedStyle(document.body).fontFamily,
    bodyBg: getComputedStyle(document.body).backgroundColor,
  };
});
console.log(JSON.stringify({ styles, logs }, null, 2));
await browser.close();
