import DB from "..";
import { newMemo } from "@/domain";
import { MemoRepository } from "@/usecase";

// 初期データ
const memo1 = newMemo("memo1");
const memo2 = newMemo("memo2", "fooCategory");
DB.memos = [memo1, memo2];

console.log("DB.memos", DB.memos);

const find = async (id: string) => {
  const queryResults = DB.memos.filter((memo) => memo.id === id);
  if (queryResults.length === 0) return;

  return queryResults[0];
};

export const memoRepository: MemoRepository = { find };
