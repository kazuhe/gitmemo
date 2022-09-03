import { describe, test, expect } from "vitest";
import { increment } from "../";

describe("increment", () => {
  test.each([
    [-1, 0],
    [0, 1],
    [1, 2],
  ])("increment(%s) の時 %s を返すこと", (v, expected) => {
    expect(increment(v)).toBe(expected);
  });
});
