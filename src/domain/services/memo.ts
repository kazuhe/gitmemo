import type { Memo, Path } from "../models/memo.js";

/**
 * メモを取得する
 */
export type ReadMemo = (root: string, path: string) => Promise<Memo>;

/**
 * 特定の階層のメモ一覧を取得する
 */
export type ReadMemoListOfDir = (
  root: string,
  dirPath: string
) => Promise<Memo[]>;

/**
 * クライアントに Emit する
 */
export type Emitter<T> = (args: T) => void;

/**
 * クライアントに Path を Emit する
 */
export type PathEmitter = Emitter<Path>;

/**
 * クライアントに Memo を Emit する
 */
export type MemoEmitter = Emitter<Memo>;

/**
 * クライアントに Memo 一覧を Emit する
 */
export type MemoListEmitter = Emitter<Memo[]>;

/**
 * メモの永続化ロジック
 */
export type MemoRepository = {
  // create
  read: ReadMemo;
  readMemoListOfDir: ReadMemoListOfDir;
  // readAll
  // update
  // delete
};
