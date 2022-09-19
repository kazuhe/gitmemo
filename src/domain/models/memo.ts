import * as z from "zod";

/**
 * ツリー形式のパスのひと塊
 */
type PathChunk = { name: string; children: PathChunk[] };

/**
 * ツリー形式のパス一覧
 */
export type Path = PathChunk[];

export const memoSchema = z.object({
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
