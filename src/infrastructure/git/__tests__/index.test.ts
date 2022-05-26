import { clone } from "..";
import { exec } from "../../nodejs";

jest.mock("../../nodejs");

describe("clone", () => {
  // beforeEach(() => {
  //   (exec as any).mockReset();
  // });

  test("正しい引数で実行されること", async () => {
    (exec as any).mockResolvedValue("");
    expect.assertions(1);
    await clone("remote", "local");

    expect(exec).toHaveBeenCalledWith("git clone remote local");
  });

  test("成功した場合", async () => {
    (exec as any).mockResolvedValue("");
    expect.assertions(1);

    const result = await clone("remote", "local");
    expect(result).toBe("Successful clone");
  });

  test("失敗した場合はエラーメッセージが reject されること", async () => {
    (exec as any).mockRejectedValue("Fail");

    expect.assertions(1);

    const result = await clone("remote", "local");
    expect(result).toBe("Fail");
  });
});

// describe("clone", () => {
//   test("正しい引数で実行されること", async () => {
//     expect.assertions(1);
//     const exec = jest.fn().mockResolvedValue("");
//     const target = clone(exec);

//     await target("remote", "local");
//     expect(exec).toHaveBeenCalledWith("git clone remote local");
//   });

//   test("成功した場合", async () => {
//     expect.assertions(1);
//     const exec = jest.fn().mockResolvedValue("");
//     const target = clone(exec);

//     const result = await target("remote", "local");
//     expect(result).toBe("Successful clone");
//   });

//   test("失敗した場合はエラーメッセージが reject されること", async () => {
//     expect.assertions(1);
//     const exec = jest.fn().mockRejectedValue("失敗");
//     const target = clone(exec);

//     const result = await target("remote", "local");
//     expect(result).toBe("失敗");
//   });
// });
