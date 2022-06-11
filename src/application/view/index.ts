import os from "os";
import { ImportMemo } from "@/domain/memo";

const HOME_DIR = os.homedir() + "/gitmemo";

/**
 * Memo を表示する
 */
type View = (importMemo: ImportMemo) => (fileName: string) => string[];

export const view: View = (importMemo) => (fileName) => {
  const memo = importMemo(`${HOME_DIR}/${fileName}`);
  return memo.body;
};
