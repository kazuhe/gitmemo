import { readFile } from "node:fs/promises";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { ReadMemo } from "../../domain/memo.js";

export const read: ReadMemo = async (id, path) => {
  console.log("Read", id, path);
  const memo = await readFile(`${path}/${id}.md`, "utf-8")
    .then((result) => sanitizeHtml(marked.parse(result)))
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
