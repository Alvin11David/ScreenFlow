import { renderToString } from "react-dom/server";
import App from "./App";
import { seoRoutes, SITE_URL } from "./lib/seo";

export function render(path: string): string {
  return renderToString(<App ssrPath={path} />);
}

export { seoRoutes, SITE_URL };
