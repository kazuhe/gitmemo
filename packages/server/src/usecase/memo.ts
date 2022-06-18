import fs from "fs";
import { ReadMemo } from "@/domain";

export const readMemo: ReadMemo = async (name) =>
  await fs.promises.readFile(name, "utf-8");
