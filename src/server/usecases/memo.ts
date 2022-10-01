import { relative } from "node:path";
import { cwd, env } from "node:process";
import chokidar from "chokidar";
import type { Memo, Path } from "../../domain/models/memo.js";
import type {
  MemoEmitter,
  PathEmitter,
  MemoRepository,
} from "../../domain/services/memo.js";

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
    let fullPath = "";

    pathParts.map((part) => {
      // 既に存在していれば変数に入る
      const existing = current.find((el) => el.name === part);
      fullPath = fullPath + "/" + part;

      if (existing) {
        // current を下の階層に変更する
        current = existing.children;
      } else {
        const chunk = {
          name: part,
          fullPath,
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
  // if (event === "add" || event === "addDir") {
  if (event === "addDir") {
    paths.push(path);
  }
  // if (event === "unlink" || event === "unlinkDir") {
  if (event === "unlinkDir") {
    const index = paths.indexOf(path);
    paths.splice(index, 1);
  }
};

/**
 * 全てのディレクトリを読み込む
 */
export const readAllDirectory =
  (root: string, watcher: () => chokidar.FSWatcher) =>
  (emitter: PathEmitter): void => {
    const paths: string[] = [];
    let isReady = false;

    const watch = watcher();
    watch.on("ready", () => {
      console.log("Ready!");
      isReady = true;
      emitter(toTree(paths));
    });

    watch.on("all", (event, path) => {
      console.log(`[${event}] ${rootRelativePath(root, path)}`);

      const relativePath = rootRelativePath(root, path);
      if (relativePath !== undefined) {
        pathHandler(event, paths, relativePath);
      }

      if (isReady) {
        emitter(toTree(paths));
      }
    });
  };

/**
 * メモを読み込む
 */
const readMemo =
  (
    // root: string,
    repository: MemoRepository,
    watcher: () => chokidar.FSWatcher
  ) =>
  async (MemoEmitter: MemoEmitter, path: string): Promise<Memo> => {
    const read = () => repository.read(path);
    const memo = await read();
    MemoEmitter(await read());

    const watch = watcher();
    watch.on("change", async () => {
      MemoEmitter(await read());
    });
    return memo;
  };

/**
 * 特定の階層のメモ一覧を取得する
 */
const readMemoListOfDir =
  (repository: MemoRepository) =>
  async (dirPath: string): Promise<Memo[]> => {
    const memoList = await repository.readMemoListOfDir(dirPath);
    console.log("memoList", memoList);
    return memoList;
  };

/**
 * メモのユースケース
 */
export const usecase = (repository: MemoRepository) => {
  /* 開発環境かどうか */
  const isDev = env["NODE_ENV"] === "dev";

  /* メモが存在するルートパス */
  const root = isDev ? cwd() + "/playground" : cwd();

  /* メモを監視する */
  const watcher = () =>
    chokidar.watch(root, {
      ignored: [
        "**/node_modules/**",
        "**/**/*.json",
        "**/**/*.js",
        "**/**/*.tgz",
        "**/.git/**",
      ],
    });

  return {
    readMemo: readMemo(repository, watcher),
    readAllDirectory: readAllDirectory(root, watcher),
    readMemoListOfDir: readMemoListOfDir(repository),
  };
};
