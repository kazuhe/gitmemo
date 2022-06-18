import express from "express";
import cors from "cors";
import memo from "./memo";

const serve = () => {
  const app = express();
  const router = express.Router();

  const allowedOrigins = ["http://localhost:3000"];
  const options = {
    origin: allowedOrigins,
  };

  memo.router(router);

  app.use(express.json());
  app.use(cors(options));
  app.use("/api", router);
  app.listen(8000, () => console.log("listening on port 8000..."));
};

export default { serve };

// エラーハンドリングミドルウェア
// app.use((err: any, req: express.Request, res: express.Response) => {
//   console.error(err);
//   res.status(err.statusCode || 500).json({ error: err.message });
// });
