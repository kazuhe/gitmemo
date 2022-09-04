import { Router } from "express";
import { readMemo } from "../controllers/memo.js";

export const createRouter = (root: string) => {
  const router = Router();

  router.get("/api/greeting", (_, res) => {
    console.log("Requested by client... /api/greeting");
    res.json({ greeting: "Hello, world!" });
  });

  router.get("/api/md", async (_, res) => {
    console.log("Requested by client... /api/md");

    const md = await readMemo(1, root);
    // console.log("html", JSON.stringify(html));

    res.send(md);
  });

  return router;
};
