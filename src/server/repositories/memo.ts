import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { Memo, isMemo, ReadMemo } from "../../domain/memo.js";

/**
 * 読み込んだデータを Memo に変換する
 */
export const convertMemo = (d: string): Memo => {
  const { content, data } = matter(d);
  const html = sanitizeHtml(marked.parse(content));
  const memo = {
    id: data["id"],
    title: data["title"],
    isStar: data["isStar"],
    createdAt: data["createdAt"],
    updatedAt: data["updatedAt"],
    tags: data["tags"],
    body: html,
  };
  console.log("content", content);
  console.log("data", data);

  return isMemo(memo);
};

export const read: ReadMemo = async (id, path) => {
  const memo = await readFile(`${path}/${id}.md`, "utf-8")
    .then((result) => convertMemo(result))
    .catch((error) => {
      console.error("[ERROR]:", error);
      return error.message;
    });
  return memo;
};

/**
 * メモの永続化ロジック
 */
export type MemoRepository = {
  // create
  read: ReadMemo;
  // readAll
  // update
  // delete
};

export const memoRepository: MemoRepository = { read };
