/**
 * メモのカテゴリー
 */
// type Category = string;

/**
 * メモ
 */
// type Memo = {
//   title: string;
//   body: string[];
//   category?: Category;
//   createdAt: Date;
// };

/**
 * メモをインポートする
 *
 * @param name ファイル名
 * @returns メモの中身
 */
export type ImportMemo = (name: string) => Promise<string>;
