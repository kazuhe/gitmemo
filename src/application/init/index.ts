import { FetchMemos } from "@/domain/memo";
import { Question } from "@/domain/interaction";
import os from "os";

const HOME_DIR = os.homedir() + "/gitmemo";

/**
 * GitMemo を初期化する
 */
type Init = (
  fetchMemos: FetchMemos,
  question: Question
) => () => Promise<boolean>;

export const init: Init = (fetchMemos, question) => async () => {
  const remote = await question("リポジトリの URL を入力してください: ");
  if (!remote) return false;

  await fetchMemos(remote, HOME_DIR)
    .then(() => {
      console.log(`🎉 "${HOME_DIR}" に GitMemo をセットアップしました`);
      return true;
    })
    .catch((error) => {
      console.log("🚨 初期化に失敗しました", error);
    });

  return false;
};
