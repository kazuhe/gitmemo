import express from "express";
import memo from "./memo";

const serve = () => {
  const app = express();
  const router = express.Router();

  memo.router(router);

  app.use(express.json());
  app.use("/api", router);
  app.listen(8000, () => console.log("listening on port 8000..."));
};

export default { serve };

// エラーハンドリングミドルウェア
// app.use((err: any, req: express.Request, res: express.Response) => {
//   console.error(err);
//   res.status(err.statusCode || 500).json({ error: err.message });
// });
