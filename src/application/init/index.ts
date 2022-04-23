import { Clone } from "@/domain/memo";
import { Question } from "@/domain/interaction/question";

// 初期化する
// gitmemo を使える状態にする
// init 関数は presentation で利用される

type Init = (
  clone: Clone,
  question: Question
) => (remote: string, local: string) => Promise<boolean>;

export const init: Init = (clone, question) => async (aas, local) => {
  const remote = await question("リポジトリの URL を入力してください: ");
  if (!remote) {
    console.log("空文字です");
    return false;
  }

  clone(remote, local)
    .then((result) => {
      console.log("成功", result);
      return true;
    })
    .catch((error) => {
      console.log("失敗", error);
      return false;
    });
};
