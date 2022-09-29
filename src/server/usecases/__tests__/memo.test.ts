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
        fullPath: "/FolderA",
        children: [
          {
            name: "FolderB",
            fullPath: "/FolderA/FolderB",
            children: [
              {
                name: "FolderD",
                fullPath: "/FolderA/FolderB/FolderD",
                children: [
                  {
                    name: "ItemA",
                    fullPath: "/FolderA/FolderB/FolderD/ItemA",
                    children: [],
                  },
                ],
              },
              {
                name: "ItemB",
                fullPath: "/FolderA/FolderB/ItemB",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "FolderE",
        fullPath: "/FolderE",
        children: [
          {
            name: "FolderF",
            fullPath: "/FolderE/FolderF",
            children: [
              {
                name: "FolderG",
                fullPath: "/FolderE/FolderF/FolderG",
                children: [
                  {
                    name: "ItemC",
                    fullPath: "/FolderE/FolderF/FolderG/ItemC",
                    children: [],
                  },
                  {
                    name: "ItemD",
                    fullPath: "/FolderE/FolderF/FolderG/ItemD",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            name: "FolderH",
            fullPath: "/FolderE/FolderH",
            children: [
              {
                name: "ItemE",
                fullPath: "/FolderE/FolderH/ItemE",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "FolderI",
        fullPath: "/FolderI",
        children: [],
      },
    ];
    expect(toTree(paths)).toStrictEqual(expected);
  });
});
