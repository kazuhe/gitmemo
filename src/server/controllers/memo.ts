import type { MemoEmitter, PathEmitter } from "../../domain/services/memo.js";
import { memoRepository } from "../repositories/memo.js";
import { usecase } from "../usecases/memo.js";

const memoUsecase = usecase(memoRepository);

export const readMemo = async (memoEmitter: MemoEmitter, path: string) => {
  const memo = await memoUsecase.readMemo(memoEmitter, path);
  return memo;
};

export const readAllDirectory = (emitter: PathEmitter) => {
  memoUsecase.readAllDirectory(emitter);
};
