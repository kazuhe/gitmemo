/**
 * メモのカテゴリー
 */
type Category = string;

/**
 * メモ
 */
type Memo = {
  title: string;
  body: string[];
  category?: Category;
  createdAt: Date;
};

/**
 * メモ一覧を取得する
 */
export type FetchMemos = () => Promise<Memo[]>;
