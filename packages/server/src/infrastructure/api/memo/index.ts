import express from "express";
import * as controller from "@/interface/controller";

const router = (router: express.Router) => {
  router.get("/memos", async (req, res) => {
    console.log("server!", req.query);

    const id = req.query.id;

    if (typeof id !== "string") {
      // TODO: ちゃんと error をレスポンスする
      throw new Error("query name がないよ");
    }

    const memo = await controller.getMemo(id);
    res.json(memo);
  });
};

// const router = (router: express.Router) => {
//   router.get("/memos", async (req, res) => {
//     console.log("server!", req.query);

//     if (typeof req.query.name !== "string") {
//       // TODO: ちゃんと error をレスポンスする
//       throw new Error("query name がないよ");
//     }

//     const memo = await controller.findMemo(req.query.name);
//     res.json(memo);
//   });
// };

export default { router };
