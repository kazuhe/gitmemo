import { join, dirname } from "node:path";
import { cwd, env } from "node:process";
import { fileURLToPath } from "node:url";
import express from "express";
import { createRouter } from "./api/router.js";
import { createWebsocket } from "./api/websocket.js";

export const server = () => {
  const publicDir = join(
    dirname(fileURLToPath(import.meta.url)),
    "..",
    "client"
  );
  const isDev = env["NODE_ENV"] === "dev";
  const root = isDev ? cwd() + "/playground" : cwd();

  const app = express();
  const router = createRouter(root);
  app.use(router);
  app.use(express.static(publicDir));

  const server = createWebsocket(app);

  server.listen(3000, () => {
    console.log("App is running at http://localhost:3000");
  });
};
