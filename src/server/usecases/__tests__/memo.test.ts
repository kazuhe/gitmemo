import { describe, test, expect } from "vitest";
import { rootRelativePath, toTree } from "../memo.js";

describe("rootRelativePath", () => {
  test.each([
    ["/Users/foo/bar/playground", "/Users/foo/bar/playground", undefined],
    [
      "/Users/foo/bar/playground",
      "/Users/foo/bar/playground/index.md",
      "/index.md",
    ],
    [
      "/Users/foo/bar/playground",
      "/Users/foo/bar/playground/hoge/index.md",
      "/hoge/index.md",
    ],
    [
      "/Users/foo/bar/playground",
      "/Users/foo/bar/playground/hoge/fuga",
      "/hoge/fuga",
    ],
    [
      "/Users/foo/bar/playground",
      "/Users/foo/bar/playground/hoge/fuga/index.md",
      "/hoge/fuga/index.md",
    ],
  ])("rootRelativePath(%s, %s) の時 %s を返すこと", (root, path, expected) => {
    expect(rootRelativePath(root, path)).toBe(expected);
  });
});

describe("toTree", () => {
  test("配列を tree 構造に変換する", () => {
    const paths = [
      "/FolderA/FolderB/FolderD/ItemA",
      "/FolderA/FolderB/ItemB",
      "/FolderE/FolderF/FolderG/ItemC",
      "/FolderE/FolderF/FolderG/ItemD",
      "/FolderE/FolderH/ItemE",
      "/FolderI",
    ];
    const expected = [
      {
        name: "FolderA",
        children: [
          {
            name: "FolderB",
            children: [
              {
                name: "FolderD",
                children: [{ name: "ItemA", children: [] }],
              },
              {
                name: "ItemB",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "FolderE",
        children: [
          {
            name: "FolderF",
            children: [
              {
                name: "FolderG",
                children: [
                  { name: "ItemC", children: [] },
                  { name: "ItemD", children: [] },
                ],
              },
            ],
          },
          { name: "FolderH", children: [{ name: "ItemE", children: [] }] },
        ],
      },
      {
        name: "FolderI",
        children: [],
      },
    ];
    expect(toTree(paths)).toStrictEqual(expected);
  });
});
