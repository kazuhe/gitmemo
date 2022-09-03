import { Router } from "express";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { select } from "../repository/select.js";

export const createRouter = (root: string) => {
  const router = Router();

  router.get("/api/greeting", (_, res) => {
    console.log("Requested by client... /api/greeting");
    res.json({ greeting: "Hello, world!" });
  });

  router.get("/api/md", async (_, res) => {
    console.log("Requested by client... /api/md");

    const md = await select(`${root}/index.md`);
    const html = sanitizeHtml(marked.parse(md));
    console.log("html", JSON.stringify(html));

    res.send(html);
  });

  return router;
};
