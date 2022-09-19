import { readFile } from "node:fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Memo } from "../../domain/models/memo.js";
import {
  isMemo,
  MemoRepository,
  ReadMemo,
} from "../../domain/services/memo.js";

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
    updatedAt: data["updatedAt"] || undefined,
    tags: data["tags"],
    body: html,
  };

  try {
    return isMemo(memo);
  } catch (e) {
    return {
      id: 0,
      title: "Memo の取得に失敗しました",
      isStar: false,
      createdAt: "",
      tags: [],
      body:
        "<h2>Memo の取得に失敗しました</h2>\n" +
        "<p>---</p>\n" +
        e +
        "<p>---</p>",
    };
  }
};

export const read: ReadMemo = async (path: string) => {
  const memo = await readFile(path, "utf-8")
    .then((result) => convertMemo(result))
    .catch((error) => {
      console.error("[ERROR]:", error);
      return error.message;
    });
  return memo;
};

export const memoRepository: MemoRepository = { read };
