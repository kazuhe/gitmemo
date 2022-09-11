import { memoRepository } from "../repositories/memo.js";
import type { Emitter } from "../types.js";
import { usecase } from "../usecases/memo.js";

export const readMemo = async (id: number, path: string) => {
  const memo = await memoRepository.read(id, path);
  return memo;
};

export const readPaths = (root: string, emitter: Emitter) => {
  // const watcher = memoWatcher(root);
  usecase.readPaths(root, emitter);
};
