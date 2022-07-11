import DB from "..";
import { newMemo } from "@/domain";
import { MemoRepository } from "@/usecase";

// 初期データ
DB.memos = [
  newMemo("memo1", "home/test"),
  newMemo("memo2", "home/test", "fooCategory"),
  newMemo("memo3", "home", "fooCategory"),
  newMemo("memo4", "home", "bar"),
  newMemo("memo5", "home", "bar"),
  newMemo("memo6", "home/sample", "bar"),
  newMemo("memo7", "home/sample", "bar"),
  newMemo("memo8", "home/sample", "bar"),
  newMemo("memo9", "home/sample", "bar"),
  newMemo("memo10", "home", "bar"),
  newMemo("memo11", "home", "bar"),
  newMemo("memo12", "home", "bar"),
  newMemo("memo13", "home", "bar"),
  newMemo("memo14", "home", "bar"),
  newMemo("memo15", "home", "bar"),
];

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

/**
 * memo の path 一覧を返す
 */
export const fetchAllPath = async () => {
  // const uniq = (array: any) => {
  //   return array.filter(function (elem: any, index: any, self: any) {
  //     return self.indexOf(elem) === index;
  //   });
  // };

  // 受け取った引数の末尾に「"/"」がなければ追加する
  const toEndsWithSlash = (str: string) =>
    str.endsWith("/") ? str : str + "/";

  // path の一覧
  const paths = DB.memos.map((memo) => toEndsWithSlash(memo.path));
  console.log("paths", paths);

  // ユニークな path になった memo 一覧
  const uniqPathOfMemos = DB.memos.filter((memo, index) => {
    return paths.indexOf(memo.path) === index;
  });

  // ユニークな path 一覧
  const uniqPath = uniqPathOfMemos.map((memo) => memo.path);
  console.log("uniqPath", uniqPath);

  // 完成
  const obj = uniqPath.map((path) => {
    return {
      name: path,
    };
  });
  console.log("obj", obj);

  return DB.memos;
};

// @ts-expect-error
export const memoRepository: MemoRepository = { find, findAll, fetchAllPath };
