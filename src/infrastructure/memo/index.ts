import fs from "fs";
import { ImportMemo } from "@/domain/memo";

export const importMemo: ImportMemo = async (name) =>
  await fs.promises.readFile(name, "utf-8");
