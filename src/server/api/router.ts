import { Router } from "express";
import { readMemoListOfDir } from "../controllers/memo.js";

export const createRouter = (root: string) => {
  const router = Router();

  router.get("/api/greeting", (_, res) => {
    console.log("Requested by client... /api/greeting");
    res.json({ greeting: "Hello, world!" });
  });

  console.log(root);

  router.get("/api/memos", async (req, res) => {
    const path = req.query["path"];

    if (path === undefined) {
      const memoList = await readMemoListOfDir("");
      res.json(memoList);
    }

    if (typeof path === "string") {
      const memoList = await readMemoListOfDir(path);
      res.json(memoList);
    }
  });

  // router.get("/api/md", async (_, res) => {
  //   console.log("Requested by client... /api/md");

  //   // const md = await readMemo(1, root);
  //   // console.log("html", JSON.stringify(html));

  //   // res.send(md);
  // });

  return router;
};
