import { readFile } from "node:fs/promises";

/**
 * データベースから単一データを取得する
 */
export const select = async (from: string): Promise<string> => {
  const result = await readFile(from, "utf-8").catch((error) => {
    console.error("[ERROR]:", error)
    return error.message
  })
  return result;
}