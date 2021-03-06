import { v4 } from "uuid";

/**
 * カテゴリー
 */
type Category = string;

/**
 * メモ
 */
export type Memo = {
  id: string;
  title: string;
  category?: Category;
  body: string[];
  createdAt: Date;
};

/**
 * メモをインポートする
 *
 * @param name ファイル名
 * @returns メモの中身
 */
export type ReadMemo = (name: string) => Promise<string>;

export const newMemo = (
  title: Memo["title"],
  category?: Memo["category"]
): Memo => {
  const id = v4();
  return {
    id,
    title,
    category,
    body: [],
    createdAt: new Date(),
  };
};
