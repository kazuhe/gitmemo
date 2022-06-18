/**
 * メモをインポートする
 *
 * @param name ファイル名
 * @returns メモの中身
 */
export type ReadMemo = (name: string) => Promise<string>;
