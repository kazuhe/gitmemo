/**
 * メモ
 */
type Memo = {
  title: string;
  body: string[];
  category?: string;
  createdAt: Date;
};

/**
 * メモの一覧を取得する
 * @param remote remote path
 * @param local local path
 */
export type FetchMemos = (remote: string, local: string) => Promise<string>;
