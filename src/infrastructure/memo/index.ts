import fs from "fs";
import { ImportMemo } from "@/domain/memo";

export const importMemo: ImportMemo = (name) => {
  if (fs.existsSync(name)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    console.log(require(name));
    return require(name);
  }
  throw new Error("Not found");
};
