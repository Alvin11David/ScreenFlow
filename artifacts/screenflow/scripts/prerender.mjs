import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPublic = path.resolve(__dirname, "..", "dist", "public");
const ssrBundle = path.resolve(__dirname, "..", "dist", "ssr", "index.js");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractAssetTags(template) {
  const tags = [];
  const linkRe = /<link[^>]*rel="(?:stylesheet|modulepreload)"[^>]*>/gi;
  const scriptRe = /<script[\s\S]*?<\/script>/gi;
  for (const m of template.matchAll(linkRe)) tags.push(m[0]);
  for (const m of template.matchAll(scriptRe)) tags.push(m[0]);
  return tags;
}

function buildHead(assetTags, route, SITE_URL) {
  const url = SITE_URL + (route.path === "/" ? "/" : route.path);
  const image = `${SITE_URL}/opengraph.jpg`;
  const robots = route.noindex
    ? '<meta name="robots" content="noindex, nofollow" />'
    : '<meta name="robots" content="index, follow" />';
  const keywords =
    route.keywords && route.keywords.length
      ? `<meta name="keywords" content="${escapeHtml(route.keywords.join(", "))}" />`
      : "";

  const jsonLd = (route.jsonLd || [])
    .map(
      (obj) =>
        `<script type="application/ld+json">${JSON.stringify(obj)}\n    </script>`
    )
    .join("\n    ");

  return [
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />',
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    keywords,
    robots,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    '<meta name="theme-color" content="#0a0c16" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    ...assetTags,
    jsonLd,
  ]
    .filter(Boolean)
    .join("\n    ");
}

function writeSitemap(distPublic, { seoRoutes, SITE_URL }) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = seoRoutes
    .filter((r) => !r.noindex && r.path === "/")
    .concat(seoRoutes.filter((r) => !r.noindex && r.path !== "/"));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((route) => {
      const loc = SITE_URL + (route.path === "/" ? "/" : route.path);
      const priority = route.path === "/" ? "1.0" : "0.8";
      const changefreq = route.path === "/" ? "weekly" : "monthly";
      return [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
    "</urlset>",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(distPublic, "sitemap.xml"), xml, "utf-8");
  console.log(`  Generated sitemap.xml (${urls.length} URLs)`);
}

function write404(distPublic, html, { SITE_URL }) {
  const outDir = path.join(distPublic);
  const content = html
    .replace(
      /<title>[^<]*<\/title>/,
      "<title>Page not found (404) — ScreenFlow</title>"
    )
    .replace(
      /<meta name="robots"[^>]*\/>/,
      '<meta name="robots" content="noindex, nofollow" />'
    )
    .replace(
      /<link rel="canonical"[^>]*\/>/,
      `<link rel="canonical" href="${SITE_URL}/" />`
    );
  fs.writeFileSync(path.join(outDir, "404.html"), content, "utf-8");
  console.log("  Generated 404.html");
}

async function prerender() {
  const template = fs.readFileSync(path.join(distPublic, "index.html"), "utf-8");
  const assetTags = extractAssetTags(template);

  const { render, seoRoutes, SITE_URL } = await import(
    pathToFileURL(ssrBundle).href
  );

  console.log(`Prerendering ${seoRoutes.length} routes...`);

  for (const route of seoRoutes) {
    const body = render(route.path);
    const head = buildHead(assetTags, route, SITE_URL);
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    ${head}
  </head>
  <body>
    <div id="root">${body}</div>
  </body>
</html>
`;
    const outDir =
      route.path === "/" ? distPublic : path.join(distPublic, route.path);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    console.log(
      `  Saved ${route.path} → ${path.relative(distPublic, path.join(outDir, "index.html"))} (${(html.length / 1024).toFixed(1)} KB)`
    );
  }

  writeSitemap(distPublic, { seoRoutes, SITE_URL });
  write404(distPublic, fs.readFileSync(path.join(distPublic, "index.html"), "utf-8"), {
    SITE_URL,
  });

  console.log("Prerendering complete!");
}

prerender().catch((err) => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
