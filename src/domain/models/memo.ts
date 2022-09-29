import * as z from "zod";

/**
 * ツリー形式のパスのひと塊
 */
type PathChunk = { name: string; fullPath: string; children: PathChunk[] };

/**
 * ツリー形式のパス一覧
 */
export type Path = PathChunk[];

export const memoSchema = z.object({
  id: z.number(),
  path: z.string(),
  title: z.string(),
  isStar: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  tags: z.string().array(),
  body: z.string().optional(),
});

/**
 * メモ
 */
export type Memo = z.infer<typeof memoSchema>;
