import * as z from "zod";

const memoSchema = z.object({
  id: z.number(),
  title: z.string(),
  isStar: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  tags: z.string().array().optional(),
  body: z.string().optional(),
});

/**
 * メモ
 */
export type Memo = z.infer<typeof memoSchema>;

/**
 * バリデーション
 */
export const isMemo = (v: any): Memo => {
  try {
    const memo = memoSchema.parse(v);
    return memo;
  } catch (e) {
    console.error("*** Memo が正しい形式ではありません ***\n", e);
    if (typeof e === "string") {
      throw new Error(e);
    }
    throw new Error("例外が発生しました");
  }
};

/**
 * メモを取得する
 */
export type ReadMemo = (id: number, path: string) => Promise<Memo>;
