import { memoRepository } from "../repositories/memo.js";

export const readMemo = async (id: number, path: string) => {
  const memo = await memoRepository.read(id, path);
  return memo;
};
