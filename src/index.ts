import clone from "@/infrastructure/repository/clone";
import { question } from "@/presentation/question";

(async () =>
  await question("リポジトリの URL を入力してください: ").then((repository) => {
    if (!repository) {
      console.log("空文字です");
      return;
    }

    clone(repository, "~/Desktop/gitmemo/")
      .then((result) => {
        console.log("成功", result);
      })
      .catch((error) => {
        console.log("失敗", error);
      });
  }))();
