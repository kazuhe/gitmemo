import express from "express";
import controller from "@/interface/controller";

const router = (router: express.Router) => {
  router.get("/memos", async (req, res) => {
    console.log("server!", req.query);

    if (typeof req.query.name !== "string") {
      // TODO: ちゃんと error をレスポンスする
      throw new Error("query name がないよ");
    }

    const memo = await controller.findMemo(req.query.name);
    res.json(memo);
  });
};

export default { router };
