import { clone } from "..";
import child_process from "child_process";

jest.mock("child_process");

describe("clone", () => {
  test("正しい引数で実行されること", (done) => {
    child_process.exec = ((command: string) => {
      expect(command).toBe("git clone remote local");
      done();
    }) as typeof child_process.exec;
    expect.assertions(1);
    (async () => await clone("remote", "local"))();
  });
});
