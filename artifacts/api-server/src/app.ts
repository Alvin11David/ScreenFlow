import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { recordRequest } from "./lib/metrics";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
const defaultCorsOrigins =
  "https://screen-flow-ltd.vercel.app,https://screen-recorder-v0-1.vercel.app";
const corsOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? process.env.CORS_ORIGIN ?? defaultCorsOrigins)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  const start = performance.now();
  res.on("finish", () => {
    recordRequest({
      statusCode: res.statusCode,
      durationMs: performance.now() - start,
    });
  });
  next();
});

app.use("/api", router);

export default app;
