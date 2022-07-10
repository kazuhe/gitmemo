import DB from "..";
import { newMemo } from "@/domain";
import { MemoRepository } from "@/usecase";

// 初期データ
const memo1 = newMemo("memo1");
const memo2 = newMemo("memo2", "fooCategory");
DB.memos = [memo1, memo2];

console.log("DB.memos", DB.memos);

// TODO: 型
/**
 * 指定された id のメモを返す
 *
 * @param array 配列
 * @param {...any} array."0" 配列
 * @param size chunkサイズ
 * @returns メモ
 */
export const arrayChunk = ([...array], size = 1) =>
  array.reduce(
    (acc, _, index) =>
      index % size ? acc : [...acc, array.slice(index, index + size)],
    []
  );

/**
 * 指定された id のメモを返す
 *
 * @param id ID
 * @returns メモ
 */
export const find: MemoRepository["find"] = async (id) => {
  const queryResults = DB.memos.filter((memo) => memo.id === id);
  if (queryResults.length === 0) return;

  return queryResults[0];
};

/**
 * 特定の範囲のメモを返す
 *
 * @param per_page 1ページあたりの数
 * @param page ページ
 * @returns 全てのメモ
 */
export const findAll: MemoRepository["findAll"] = async (per_page, page) => {
  const chunk = arrayChunk(DB.memos, per_page);
  return chunk[page - 1];
};

export const memoRepository: MemoRepository = { find, findAll };
