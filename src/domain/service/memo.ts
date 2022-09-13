import { Memo, Path, memoSchema } from "../model/memo.js";

/**
 * メモを取得する
 */
export type ReadMemo = (id: number, path: string) => Promise<Memo>;

/**
 * クライアントに Emit する
 */
export type Emitter<T> = (args: T) => void;

/**
 * クライアントに Path を Emit する
 */
export type PathEmitter = Emitter<Path>;

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
