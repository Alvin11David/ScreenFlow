import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await browser.newPage();
await page.setViewport({ width: 400, height: 300 });
await page.setContent('<html><body style="background:#ff0000;color:#ffffff;font-size:40px">HELLO</body></html>');
await page.screenshot({ path: "C:/Users/ALVIN/AppData/Local/Temp/opencode/control.png" });
await browser.close();
console.log("done");
