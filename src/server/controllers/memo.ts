import type { PathEmitter } from "../../domain/services/memo.js";
import { memoRepository } from "../repositories/memo.js";
import { usecase } from "../usecases/memo.js";

const memoUsecase = usecase(memoRepository);

export const readMemo = async (id: number, path: string) => {
  const memo = await memoUsecase.readMemo(id, path);
  return memo;
};

export const readPaths = (emitter: PathEmitter) => {
  memoUsecase.readPaths(emitter);
};
