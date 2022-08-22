import fs from "fs";

/**
 * メモを取得する
 * 
 * @param path 対象メモの絶対パス
 * @returns メモ
 */
export const fetchMemo = async (path: string): Promise<string> => {
  const memo = await fs.promises.readFile(path, "utf-8").catch((error) => {
    console.error("[ERROR]:", error)
    return error.message
  })
  return memo;
}
