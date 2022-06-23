import express from "express";
import * as controller from "@/interface/controller";

const router = (router: express.Router) => {
  router.get("/memos/:id", async (req, res) => {
    console.log("server!", req.query);
    const id = req.params.id;

    if (typeof id !== "string") {
      throw new Error(`id「${id}」は不正です`);
    }

    const memo = await controller.getMemo(id);

    if (memo === undefined) {
      throw new Error(`id「${id}」は存在しません`);
      // res.json(
      //   new Error(
      //     JSON.stringify({
      //       code: 404,
      //       message: "Not Found",
      //       description: `id「${id}」は存在しません`,
      //     })
      //   )
      // );
    }
    res.json(memo);
  });

  // router.get("/memos", async (req, res) => {
  //   console.log("server!", req.query);

  //   const id = req.query.id;

  //   if (typeof id !== "string") {
  //     // TODO: ちゃんと error をレスポンスする
  //     throw new Error("query name がないよ");
  //   }

  //   const memo = await controller.getMemo(id);
  //   res.json(memo);
  // });
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
