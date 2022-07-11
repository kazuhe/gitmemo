import express from "express";
import * as controller from "@/interface/controller";

const router = (router: express.Router) => {
  /**
   * memo 一覧
   *
   * クエリパラメータ
   * - per_page 1ページあたりの数 default=30
   * - page ページ番号 default=1
   */
  router.get("/memos/", async (req, res) => {
    const per_page = Number(req.query.per_page);
    const page = Number(req.query.page);

    // TODO: リファクタリング
    // if (!per_page) {
    //   const error = new Error(`per_page が不適切です`);
    //   console.error(error);
    //   res.status(400).json({ message: error.message });
    // }

    // if (!page) {
    //   const error = new Error(`page が不適切です`);
    //   console.error(error);
    //   res.status(400).json({ message: error.message });
    // }

    const memo = await controller.findAllMemo(per_page, page);
    res.json(memo);
  });

  /**
   * 特定の memo
   */
  router.get("/memos/:id", async (req, res) => {
    console.log("server!", req.params);
    const id = req.params.id;
    const memo = await controller.getMemo(id);
    if (memo === undefined) {
      const error = new Error(`id「${id}」は存在しません`);
      console.error(error);
      res.status(404).json({ message: error.message });
    }
    res.json(memo);
  });

  /**
   * path 一覧
   */
  router.get("/memos/paths/", async (_, res) => {
    const memo = await controller.fetchAllPath();
    res.json(memo);
  });
};

export default { router };
