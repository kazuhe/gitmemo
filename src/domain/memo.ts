import * as z from "zod";

/**
 * ツリー形式のパスのひと塊
 */
export type PathChunk = { name: string; children: PathChunk[] };

/**
 * ツリー形式のパス一覧
 */
export type Path = PathChunk[];

const memoSchema = z.object({
  id: z.number(),
  title: z.string(),
  isStar: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.string().array(),
  body: z.string(),
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
    console.error("Memo が正しい形式ではありません", e);
    throw new Error("Memo が正しい形式ではありません");
  }
};

/**
 * メモを取得する
 */
export type ReadMemo = (id: number, path: string) => Promise<Memo>;
