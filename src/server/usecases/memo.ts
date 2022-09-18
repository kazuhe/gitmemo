import { relative } from "node:path";
import { cwd, env } from "node:process";
import chokidar from "chokidar";
import type { Memo, Path } from "../../domain/models/memo.js";
import type { PathEmitter, ReadMemo } from "../../domain/services/memo.js";

/**
 * メモの永続化ロジック
 */
export type MemoRepository = {
  // create
  read: ReadMemo;
  // readAll
  // update
  // delete
};

/**
 * ルート相対パスを抽出する
 */
export const rootRelativePath = (
  root: string,
  path: string
): string | undefined => {
  const relativePath = relative(root, path);
  return relativePath === "" ? undefined : `/${relativePath}`;
};

/**
 * tree 構造に変換する
 */
export const toTree = (paths: string[]): Path => {
  const tree: Path = [];

  paths.map((path) => {
    const pathParts = path.split("/");
    pathParts.shift();

    // 初期化する
    let current = tree;

    pathParts.map((part) => {
      // 既に存在していれば変数に入る
      const existing = current.find((el) => el.name === part);

      if (existing) {
        // current を下の階層に変更する
        current = existing.children;
      } else {
        const chunk = {
          name: part,
          children: [],
        };
        // 参照渡しなので tree に追加される
        current.push(chunk);
        // current を下の階層に変更する
        current = chunk.children;
      }
    });
  });

  return tree;
};

/**
 * event によって paths に対するアクションを変更する
 */
export const pathHandler = (
  event: "add" | "addDir" | "change" | "unlink" | "unlinkDir",
  paths: string[],
  path: string
) => {
  if (event === "add" || event === "addDir") {
    paths.push(path);
  }
  if (event === "unlink" || event === "unlinkDir") {
    const index = paths.indexOf(path);
    paths.splice(index, 1);
  }
};

/**
 * パス一覧を読み込む
 */
export const readPaths = (root: string, emitter: PathEmitter): void => {
  const watcher = chokidar.watch(root, {
    ignored: [
      "**/node_modules/**",
      "**/**/*.json",
      "**/**/*.js",
      "**/**/*.tgz",
    ],
  });

  const paths: string[] = [];
  let isReady = false;

  watcher.on("ready", () => {
    console.log("Ready!");
    isReady = true;
    emitter(toTree(paths));
  });

  watcher.on("all", (event, path) => {
    console.log(`[${event}] ${rootRelativePath(root, path)}`);

    const relativePath = rootRelativePath(root, path);
    if (relativePath !== undefined) {
      pathHandler(event, paths, relativePath);
    }
    console.log("paths", paths);

    if (isReady) {
      emitter(toTree(paths));
    }
  });
};

/**
 * メモを読み込む
 */
const readMemo =
  (repository: MemoRepository, watcher: chokidar.FSWatcher) =>
  async (id: number, path: string): Promise<Memo> => {
    const memo = await repository.read(id, path);
    console.log("watcher", watcher);
    return memo;
  };

/**
 * メモのユースケース
 */
export const usecase = (repository: MemoRepository) => {
  /**
   * 開発環境かどうか
   */
  const isDev = env["NODE_ENV"] === "dev";

  /**
   * メモが存在するルートパス
   */
  const root = isDev ? cwd() + "/playground" : cwd();

  /**
   * メモを監視する
   */
  const watcher = chokidar.watch(root, {
    ignored: [
      "**/node_modules/**",
      "**/**/*.json",
      "**/**/*.js",
      "**/**/*.tgz",
    ],
  });

  return {
    readMemo: readMemo(repository, watcher),
    readPaths,
  };
};
