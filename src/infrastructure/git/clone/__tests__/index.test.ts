import { clone } from "..";

describe("clone", () => {
  test("正しい引数で実行されること", () => {
    const execMock = jest.fn() as any;
    const target = clone(execMock);
    target("remote", "local");

    expect(execMock).toHaveBeenCalledWith(
      "git clone remote local",
      expect.any({})
    );
  });
});
