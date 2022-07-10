import { arrayChunk, find, findAll } from "..";
import { newMemo } from "@/domain";

jest.mock("../..");
import DB from "../..";

describe("arrayChunk", () => {
  let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let cache: number[] = [];

  beforeEach(() => {
    cache = [...array];
  });

  afterEach(() => {
    array = cache;
  });

  test.each([
    [11, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]],
    [10, [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]],
    [
      5,
      [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
      ],
    ],
    [3, [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]],
  ])("size=%p の時、正しく値が返されること", (size, expected) => {
    expect(arrayChunk(array, size)).toStrictEqual(expected);
  });
});

describe("find", () => {
  test("受け取った id と一致するメモが返されること", async () => {
    const mock = newMemo("mock");
    DB.memos = [mock];
    const result = await find(mock.id);
    expect(result).toEqual(mock);
  });
});

describe("findAll", () => {
  const mock1 = newMemo("mock1");
  const mock2 = newMemo("mock2");
  const mock3 = newMemo("mock3");

  beforeEach(() => {
    DB.memos = [mock1, mock2, mock3];
  });

  test.each([
    [2, 1, [mock1, mock2]],
    [2, 2, [mock3]],
    [3, 1, [mock1, mock2, mock3]],
    [3, 2, undefined],
  ])(
    "per_page=%p, page=%p の時、%p が返されること",
    async (per_page, page, expected) => {
      expect(await findAll(per_page, page)).toStrictEqual(expected);
    }
  );
});
