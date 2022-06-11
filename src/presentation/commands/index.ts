import express from "express";
import cors from "cors";

import init from "./init";

const arg = process.argv[2];

/**
 * サブコマンド
 */
const commands: { [command: string]: () => Promise<boolean> } = {
  init,
};

const preview = () => {
  const app = express();

  app.use(express.json());
  const allowedOrigins = ["http://localhost:3000"];

  const options: cors.CorsOptions = {
    origin: allowedOrigins,
  };
  app.use(cors(options));

  app.get("/foo", (req: express.Request, res: express.Response) => {
    console.log("req.body", req.body);
    res.json(JSON.stringify({ message: "Hello World" }));
  });
  app.listen(8000, () => console.log("listening on port 8000..."));
};

if (arg === undefined) {
  preview();
} else {
  if (!commands[arg]) {
    console.log("🙅‍♂️ 存在しないコマンドです");
    process.exit(1);
  }
  commands[arg]();
}
