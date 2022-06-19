import os from "os";
import fs from "fs";
import { Memo, ReadMemo, Clone, Question } from "@/domain";

const HOME_DIR = os.homedir() + "/gitmemo";

/**
 * メモデータの永続化ロジック
 */
export type MemoRepository = {
  find: (id: string) => Promise<Memo | undefined>;
  // findAll(): Promise<Memo[]>;
  // create(memo: Memo): Promise<Memo>;
  // update(memo: Memo): Promise<Memo>;
  // delete(id: number): Promise<void>;
};

export const memo = (repository: MemoRepository) => {
  const getMemo = async (id: string) => repository.find(id);

  return { getMemo };
};

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
