import express from "express";
import cors from "cors";

import { importMemo } from "@/infrastructure/memo";

// TODO: モジュール考える

export const serve = (homedir: string) => {
  const app = express();
  app.use(express.json());

  // CORS
  const allowedOrigins = ["http://localhost:3000"];
  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };
  app.use(cors(options));

  // エラーハンドリングミドルウェア
  // app.use((err: any, req: express.Request, res: express.Response) => {
  //   console.error(err);
  //   res.status(err.statusCode || 500).json({ error: err.message });
  // });

  // Memo の取得
  app.get("/api/memos", async (req, res) => {
    console.log("server!", req.query);

    if (!req.query.name) {
      // TODO: ちゃんと error をレスポンスする
      throw new Error("query name がないよ");
    }

    const fileName = req.query.name as string;
    console.log("import...", `${homedir}/${fileName}.md`);
    const memo = await importMemo(`${homedir}/${fileName}.md`);
    res.json(memo);
  });

  app.listen(8000, () => console.log("listening on port 8000..."));
};

// TODO: domain に定義
export type Server = typeof serve;
