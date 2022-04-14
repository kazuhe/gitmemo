import { clone } from "..";

describe("clone", () => {
  test("正しい引数で実行されること", (done) => {
    expect.assertions(1);
    const exec = (command: string) => {
      expect(command).toBe("git clone remote local");
      done();
    };
    const target = clone(exec as any);
    (async () => await target("remote", "local"))();
  });
});
