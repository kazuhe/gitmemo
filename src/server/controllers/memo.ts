import type { PathEmitter } from "../../domain/service/memo.js";
import { memoRepository } from "../repositories/memo.js";
import { usecase } from "../usecases/memo.js";

export const readMemo = async (id: number, path: string) => {
  const memo = await memoRepository.read(id, path);
  return memo;
};

export const readPaths = (root: string, emitter: PathEmitter) => {
  // const watcher = memoWatcher(root);
  usecase.readPaths(root, emitter);
};
