import express from "express";
import cors from "cors";
import router from "./router";

const serve = () => {
  // CORS
  const allowedOrigins = ["http://localhost:3000"];
  const options = {
    origin: allowedOrigins,
  };

  const app = express();

  app.use(express.json());
  app.use(cors(options));
  app.use("/api", router);

  app.listen(8000, () => console.log("listening on port 8000..."));
};

export default { serve };
