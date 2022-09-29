import { describe, test, expect } from "vitest";
import { dateFormat } from "../date.js";

describe("dateFormat", () => {
  test.each([
    [new Date(2022, 8, 30, 9, 30), "2022-09-30 09:30"],
    [new Date(2022, 8, 30, 13, 0), "2022-09-30 13:00"],
    [new Date(""), ""],
  ])("dateFormat(%s) の時 %s を返すこと", (date, expected) => {
    expect(dateFormat(date)).toBe(expected);
  });
});
