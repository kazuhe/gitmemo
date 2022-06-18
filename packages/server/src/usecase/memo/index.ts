import os from "os";
import fs from "fs";
import { ReadMemo, Clone, Question } from "@/domain";

const HOME_DIR = os.homedir() + "/gitmemo";

export const readMemo: ReadMemo = async (name) =>
  await fs.promises.readFile(name, "utf-8");

export const initMemo = async (question: Question, clone: Clone) => {
  const remote = await question("リポジトリの URL を入力してください: ").catch(
    () => ""
  );
  if (!remote) return false;

  return clone(remote, HOME_DIR)
    .then(() => {
      console.log(`🎉 "${HOME_DIR}" に GitMemo をセットアップしました`);
      return true;
    })
    .catch((error) => {
      console.log("🚨 初期化に失敗しました", error);
      return false;
    });
};
