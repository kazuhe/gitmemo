import { Clone } from "@/domain/git";
import { Question } from "@/domain/user";
import os from "os";

const HOME_DIR = os.homedir() + "/gitmemo";

/**
 * GitMemo を初期化する
 */
type Init = (clone: Clone, question: Question) => () => Promise<boolean>;

export const init: Init = (clone, question) => async () => {
  const remote = await question("リポジトリの URL を入力してください: ");
  if (!remote) return false;

  await clone(remote, HOME_DIR)
    .then(() => {
      console.log(`🎉 "${HOME_DIR}" に GitMemo をセットアップしました`);
      return true;
    })
    .catch((error) => {
      console.log("🚨 初期化に失敗しました", error);
    });

  return false;
};
