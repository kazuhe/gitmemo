import type { Stats } from "node:fs";
import { describe, test, expect } from "vitest";
import { convertMemo } from "../memo.js";

describe("convertMemo", () => {
  test("meta と body の値がある時、正しく変換していること", () => {
    expect(1).toBe(1);
  });
  const pathMock = "/foo/memo.md";
  const statsMock = {
    dev: 2114,
    ino: 48064969,
    mode: 33188,
    nlink: 1,
    uid: 85,
    gid: 100,
    rdev: 0,
    size: 527,
    blksize: 4096,
    blocks: 8,
    atimeMs: 1318289051000.1,
    mtimeMs: 1318289051000.1,
    ctimeMs: 1318289051000.1,
    birthtimeMs: 1318289051000.1,
    atime: new Date(2022, 10, 10, 10, 30),
    mtime: new Date(2022, 10, 10, 9, 30),
    ctime: new Date(2022, 10, 10, 9, 30),
    birthtime: new Date(2022, 10, 10, 9, 0),
  } as Stats;

  test("meta と body の値がある時、正しく変換していること", () => {
    const rawMemoMock =
      "---\n" +
      "isStar: true\n" +
      'tags: ["tagA", "tagB"]\n' +
      "---\n" +
      "\n" +
      "## Index\n" +
      "\n" +
      "text\n" +
      "\n" +
      "- list 🐱\n" +
      "- list 🐶\n" +
      '<script>window.alert("Hey")</script>';
    expect(convertMemo(pathMock, rawMemoMock, statsMock)).toStrictEqual({
      id: 48064969,
      path: "/foo/memo.md",
      title: "memo.md",
      isStar: true,
      createdAt: "2022-11-10T00:00:00.000Z",
      updatedAt: "2022-11-10T00:30:00.000Z",
      tags: ["tagA", "tagB"],
      body:
        "<h2>Index</h2>\n" +
        "<p>text</p>\n" +
        "<ul>\n" +
        "<li>list 🐱</li>\n" +
        "<li>list 🐶</li>\n" +
        "</ul>\n",
    });
  });

  test("meta の値がない時、正しく変換していること", () => {
    const rawMemoMock = "## Index";
    expect(convertMemo(pathMock, rawMemoMock, statsMock)).toStrictEqual({
      id: 48064969,
      path: "/foo/memo.md",
      title: "memo.md",
      isStar: false,
      createdAt: "2022-11-10T00:00:00.000Z",
      updatedAt: "2022-11-10T00:30:00.000Z",
      tags: [],
      body: "<h2>Index</h2>\n",
    });
  });

  test("body の値がない時、正しく変換していること", () => {
    const rawMemoMock =
      "---\n" + "isStar: true\n" + 'tags: ["tagA", "tagB"]\n' + "---";
    expect(convertMemo(pathMock, rawMemoMock, statsMock)).toStrictEqual({
      id: 48064969,
      path: "/foo/memo.md",
      title: "memo.md",
      isStar: true,
      createdAt: "2022-11-10T00:00:00.000Z",
      updatedAt: "2022-11-10T00:30:00.000Z",
      tags: ["tagA", "tagB"],
      body: "",
    });
  });

  test("meta と body の値がない時、正しく変換していること", () => {
    const rawMemoMock = "";
    expect(convertMemo(pathMock, rawMemoMock, statsMock)).toStrictEqual({
      id: 48064969,
      path: "/foo/memo.md",
      title: "memo.md",
      isStar: false,
      createdAt: "2022-11-10T00:00:00.000Z",
      updatedAt: "2022-11-10T00:30:00.000Z",
      tags: [],
      body: "",
    });
  });
});
