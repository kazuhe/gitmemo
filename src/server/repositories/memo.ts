import type { Stats } from "node:fs";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename } from "node:path";
import { cwd, env } from "node:process";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Memo } from "../../domain/models/memo.js";
import type {
  MemoRepository,
  ReadMemo,
  ReadMemoListOfDir,
} from "../../domain/services/memo.js";

/* 開発環境かどうか */
const isDev = env["NODE_ENV"] === "dev";
/* メモが存在するルートパス */
const root = isDev ? cwd() + "/playground" : cwd();

/**
 * 読み込んだデータを Memo に変換する
 */
type ConvertMemo = (path: string, rawMemo: string, stats: Stats) => Memo;

export const convertMemo: ConvertMemo = (path, rawMemo, stats) => {
  const { content, data } = matter(rawMemo);
  const html = sanitizeHtml(marked.parse(content));
  const isStar = typeof data["isStar"] === "boolean" ? data["isStar"] : false;
  const tags = Array.isArray(data["tags"]) ? data["tags"] : [];
  return {
    id: stats.ino,
    path: path,
    title: basename(path),
    isStar,
    createdAt: stats.birthtime.toISOString(),
    updatedAt: stats.mtime.toISOString(),
    tags,
    body: html,
  };
};

export const read: ReadMemo = async (path) => {
  const fullPath = `${root}${path}`;
  const rawMemo = await readFile(fullPath, "utf-8");
  const stats = await stat(fullPath);
  const memo = convertMemo(path, rawMemo, stats);
  return memo;
};

/**
 * Markdown ファイルかどうか
 */
const isMarkdown = (path: string): boolean => /.md$/.test(path);

export const readMemoListOfDir: ReadMemoListOfDir = async (dirPath) => {
  const fullPath = root + dirPath;
  const direntList = await readdir(fullPath, { withFileTypes: true });
  const pathList = direntList
    .filter((dirent) => !dirent.isDirectory())
    .filter((dirent) => isMarkdown(dirent.name))
    .map((dirent) => `${dirPath}/${dirent.name}`);
  const memoList = await Promise.all(pathList.map(read));
  return memoList;
};

export const memoRepository: MemoRepository = { read, readMemoListOfDir };
