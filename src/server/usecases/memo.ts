import type { Emitter } from "../types.js";

/**
 * Memo の追加・変更・削除を監視する
 */
type MemoWatcher = (
  initLister: (
    eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
    path: string
  ) => void,
  ready: Emitter,
  listener: (
    eventName: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
    path: string
  ) => void
) => () => Promise<void>;

/**
 * パス一覧を返す
 */
export const readPaths = (watcher: MemoWatcher, emitter: Emitter) => {
  const paths: string[] = [];

  // 準備ができるまで
  const initLister = (event: string, path: string) => {
    console.log(`[${event}] ${path}`);
    paths.push(`[${event}] ${path}`);
  };

  // 準備ができた後
  const listener = (event: string, path: string) => {
    console.log(`[${event}] ${path}`);
    paths.push(`[${event}] ${path}`);
    emitter(paths);
  };

  const ready = () => emitter(paths);

  watcher(initLister, ready, listener);
};

export const usecase = {
  readPaths,
};
