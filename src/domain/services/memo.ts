import { Memo, Path, memoSchema } from "../models/memo.js";

/**
 * メモを取得する
 */
export type ReadMemo = (path: string) => Promise<Memo>;

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
 * バリデーション
 */
export const isMemo = (v: unknown): Memo => {
  try {
    const memo = memoSchema.parse(v);
    return memo;
  } catch (e) {
    console.error("Memo が正しい形式ではありません", e);
    throw new Error("Memo が正しい形式ではありません");
  }
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