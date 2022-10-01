/**
 * ツリー形式のパスのひと塊
 */
type PathChunk = { name: string; fullPath: string; children: PathChunk[] };

/**
 * ツリー形式のパス一覧
 */
export type Path = PathChunk[];

/**
 * メモ
 */
export type Memo = {
  id: number;
  path: string;
  title: string;
  isStar: boolean;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  body?: string;
};
