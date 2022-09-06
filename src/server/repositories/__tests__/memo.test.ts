import { describe, test, expect } from "vitest";
import { convertMemo } from "../memo.js";

describe("convertMemo", () => {
  test("meta と body の値がある時、正しく変換していること", () => {
    const mock =
      "---\n" +
      "id: 1\n" +
      "title: Title\n" +
      "isStar: false\n" +
      "createdAt: 2022-09-04 16:30\n" +
      "updatedAt: 2022-09-15 12:30\n" +
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
    expect(convertMemo(mock)).toStrictEqual({
      id: 1,
      title: "Title",
      isStar: false,
      createdAt: "2022-09-04 16:30",
      updatedAt: "2022-09-15 12:30",
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

  test("meta の一部と body の値がない時、正しく変換していること", () => {
    const mock =
      "---\n" +
      "id: 1\n" +
      "title: Title\n" +
      "isStar: false\n" +
      "createdAt: 2022-09-04 16:30\n" +
      "updatedAt:\n" +
      "tags: []\n" +
      "---";
    expect(convertMemo(mock)).toStrictEqual({
      id: 1,
      title: "Title",
      isStar: false,
      createdAt: "2022-09-04 16:30",
      updatedAt: undefined,
      tags: [],
      body: "",
    });
  });

  test("必須の meta の値がない時、Memo の取得に失敗した旨を表現していること", () => {
    const mock =
      "---\n" +
      "title: Title\n" +
      "isStar: false\n" +
      "createdAt: 2022-09-04 16:30\n" +
      "updatedAt:\n" +
      "tags: []\n" +
      "---";
    expect(convertMemo(mock)).toStrictEqual({
      id: 0,
      title: "Memo の取得に失敗しました",
      isStar: false,
      createdAt: "",
      tags: [],
      body:
        "<h2>Memo の取得に失敗しました</h2>\n" +
        "<p>---</p>\n" +
        "Error: Memo が正しい形式ではありません" +
        "<p>---</p>",
    });
  });
});
