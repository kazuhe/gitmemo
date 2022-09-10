import chokidar from "chokidar";
import type { Emitter } from "../types.js";

/**
 * Memo の追加・変更・削除を監視する
 */
type MemoWatcher = (
  path: string
) => (
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

export const memoWatcher: MemoWatcher =
  (path) => (initLister, ready, listener) => {
    const ignored = [
      "**/node_modules/**",
      "**/**/*.json",
      "**/**/*.js",
      "**/**/*.tgz",
    ];

    const watcher = chokidar.watch(path, {
      // persistent: false,
      // awaitWriteFinish: {
      //   stabilityThreshold: 50000,
      //   pollInterval: 50000,
      // },
      ignored,
    });

    chokidar
      .watch(path, {
        persistent: false,
        ignored,
      })
      .on("all", initLister);

    watcher.on("ready", () => {
      ready();
      watcher.on("all", listener);
    });

    return () => watcher.close();
  };
