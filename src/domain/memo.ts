/**
 * ID
 */
type Id = number;

/**
 * パス
 */
type Path = string;

/**
 * タグ
 */
type Tags = string[];

/**
 * メモ
 */
type Memo = {
  id: Id;
  title: string;
  path: Path;
  isStar: boolean;
  createdAt: Date;
  updatedAt?: Date;
  tags?: Tags;
  body?: string;
};

/**
 * メモを取得する
 */
export type ReadMemo = (id: Id, path: Path) => Promise<Memo>;
