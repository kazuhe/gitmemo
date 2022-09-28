import type { Stats } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename } from "node:path";
import { cwd, env } from "node:process";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Memo } from "../../domain/models/memo.js";
import type {
  // isMemo,
  MemoRepository,
  ReadMemo,
  ReadMemoListOfDir,
} from "../../domain/services/memo.js";

/**
 * 読み込んだデータを Memo に変換する
 */
type ConvertMemo = (
  path: string,
  fileName: string,
  rawMemo: string,
  stats: Stats
) => Memo;

export const convertMemo: ConvertMemo = (path, fileName, rawMemo, stats) => {
  const { content, data } = matter(rawMemo);
  const html = sanitizeHtml(marked.parse(content));

  const memo = {
    id: stats.ino,
    path: path,
    title: fileName,
    isStar: data["isStar"],
    createdAt: new Date(stats.birthtime).toISOString(),
    updatedAt: new Date(stats.mtime).toISOString(),
    tags: data["tags"],
    body: html,
  };

  console.log("memo", memo);
  return memo;

  // try {
  //   return isMemo(memo);
  // } catch (e) {
  //   return {
  //     path: [],
  //     title: "Memo の取得に失敗しました",
  //     isStar: false,
  //     createdAt: "",
  //     tags: [],
  //     body:
  //       "<h2>Memo の取得に失敗しました</h2>\n" +
  //       "<p>---</p>\n" +
  //       e +
  //       "<p>---</p>",
  //   };
  // }
};

export const read: ReadMemo = async (path) => {
  /* 開発環境かどうか */
  const isDev = env["NODE_ENV"] === "dev";

  /* メモが存在するルートパス */
  const root = isDev ? cwd() + "/playground" : cwd();

  const fullPath = `${root}${path}`;
  console.log("[READ]fullPath", fullPath);
  const rawMemo = await readFile(fullPath, "utf-8");
  const stats = await stat(fullPath);
  const fileName = basename(fullPath);
  console.log("stats", stats);
  const memo = convertMemo(path, fileName, rawMemo, stats);
  return memo;
};

/**
 * Markdown ファイルかどうか
 */
const isMarkdown = (path: string): boolean => /.md$/.test(path);

export const readMemoListOfDir: ReadMemoListOfDir = async (dirPath) => {
  /* 開発環境かどうか */
  const isDev = env["NODE_ENV"] === "dev";
  /* メモが存在するルートパス */
  const root = isDev ? cwd() + "/playground" : cwd();
  const fullPath = root + dirPath;
  console.log("fullPath", fullPath);

  const direntList = await readdir(fullPath, { withFileTypes: true });
  const pathList = direntList
    .filter((dirent) => !dirent.isDirectory())
    .filter((dirent) => isMarkdown(dirent.name))
    .map((dirent) => `${dirPath}/${dirent.name}`);
  console.log("pathList", pathList);
  const memoList = await Promise.all(pathList.map(read));
  return memoList;
};

export const memoRepository: MemoRepository = { read, readMemoListOfDir };
