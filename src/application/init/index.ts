import { FetchMemos } from "@/domain/memo";
import { Question } from "@/domain/interaction/question";
import os from "os";

const HOME_DIR = os.homedir() + "/gitmemo";

// 初期化する
// gitmemo を使える状態にする
// init 関数は presentation で利用される

/**
 * 初期化する
 */
type Init = (clone: FetchMemos, question: Question) => () => Promise<boolean>;

export const init: Init = (clone, question) => async () => {
  const remote = await question("リポジトリの URL を入力してください: ");
  if (!remote) {
    console.log("空文字です");
  }

  clone(remote, HOME_DIR)
    .then((result) => {
      console.log("成功", result);
      return true;
    })
    .catch((error) => {
      console.log("失敗", error);
    });

  return false;
};
