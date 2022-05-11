import { clone } from "..";

describe("clone", () => {
  test("正しい引数で実行されること", async () => {
    expect.assertions(1);
    const exec = jest.fn().mockResolvedValue("");
    const target = clone(exec);

    await target("remote", "local");
    expect(exec).toHaveBeenCalledWith("git clone remote local");
  });

  test("成功した場合", async () => {
    expect.assertions(1);
    const exec = jest.fn().mockResolvedValue("");
    const target = clone(exec);

    const result = await target("remote", "local");
    expect(result).toBe("Successful clone");
  });

  test("失敗した場合はエラーメッセージが reject されること", async () => {
    expect.assertions(1);
    const exec = jest.fn().mockRejectedValue("失敗");
    const target = clone(exec);

    const result = await target("remote", "local");
    expect(result).toBe("失敗");
  });
});
