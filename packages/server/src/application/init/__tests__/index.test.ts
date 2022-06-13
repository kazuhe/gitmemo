import { init } from "..";
import os from "os";

describe("init", () => {
  const cloneMock = jest.fn();
  const questionMock = jest.fn();

  beforeEach(() => {
    cloneMock.mockClear();
    questionMock.mockClear();
  });

  describe("question が空文字で解決された場合", () => {
    test("clone が実行されず false を返すこと", async () => {
      questionMock.mockResolvedValue("");
      cloneMock.mockResolvedValue("");
      const target = init(cloneMock, questionMock);

      expect(await target()).toBe(false);
      expect(cloneMock).not.toHaveBeenCalled();
    });
  });

  describe("question が空文字以外で解決された場合", () => {
    test("clone が適切な引数で実行されること", async () => {
      questionMock.mockResolvedValue("path/foo");
      cloneMock.mockResolvedValue("");
      const target = init(cloneMock, questionMock);

      await target();
      expect(cloneMock).toHaveBeenCalledWith(
        "path/foo",
        os.homedir() + "/gitmemo"
      );
    });

    test("clone が解決された場合は true を返すこと", async () => {
      questionMock.mockResolvedValue("path/foo");
      cloneMock.mockResolvedValue("");
      const target = init(cloneMock, questionMock);

      expect(await target()).toBe(true);
    });

    test("clone が拒否された場合は false を返すこと", async () => {
      questionMock.mockResolvedValue("path/foo");
      cloneMock.mockRejectedValue("Error Message");
      const target = init(cloneMock, questionMock);

      expect(await target()).toBe(false);
    });
  });

  describe("question が拒否された場合", () => {
    test("clone が実行されず false を返すこと", async () => {
      questionMock.mockRejectedValue("");
      cloneMock.mockResolvedValue("");
      const target = init(cloneMock, questionMock);

      expect(await target()).toBe(false);
      expect(cloneMock).not.toHaveBeenCalled();
    });
  });
});
