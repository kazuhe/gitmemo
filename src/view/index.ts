import express from "express";

const preview = () => {
  const app = express();
  app.get("/", (req: express.Request, res: express.Response) =>
    res.send("Hello World!")
  );
  app.listen(8080, () => console.log("listening on port 8000..."));
};

preview();
