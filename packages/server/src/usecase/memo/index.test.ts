import { initMemo } from "./";
import os from "os";

describe("initMemo", () => {
  const questionMock = jest.fn();
  const cloneMock = jest.fn();

  beforeEach(() => {
    questionMock.mockClear();
    cloneMock.mockClear();
  });

  describe("question が空文字で解決された場合", () => {
    test("clone が実行されず false を返すこと", async () => {
      cloneMock.mockResolvedValue("");
      questionMock.mockResolvedValue("");

      expect(await initMemo(questionMock, cloneMock)).toBe(false);
      expect(cloneMock).not.toHaveBeenCalled();
    });
  });

  describe("question が空文字以外で解決された場合", () => {
    test("clone が適切な引数で実行されること", async () => {
      cloneMock.mockResolvedValue("");
      questionMock.mockResolvedValue("path/foo");
      await initMemo(questionMock, cloneMock);

      expect(cloneMock).toHaveBeenCalledWith(
        "path/foo",
        os.homedir() + "/gitmemo"
      );
    });

    test("clone が解決された場合は true を返すこと", async () => {
      cloneMock.mockResolvedValue("");
      questionMock.mockResolvedValue("path/foo");

      expect(await initMemo(questionMock, cloneMock)).toBe(true);
    });

    test("clone が拒否された場合は false を返すこと", async () => {
      cloneMock.mockRejectedValue("Error Message");
      questionMock.mockResolvedValue("path/foo");

      expect(await initMemo(questionMock, cloneMock)).toBe(false);
    });
  });

  describe("question が拒否された場合", () => {
    test("clone が実行されず false を返すこと", async () => {
      cloneMock.mockResolvedValue("");
      questionMock.mockRejectedValue("");

      expect(await initMemo(questionMock, cloneMock)).toBe(false);
      expect(cloneMock).not.toHaveBeenCalled();
    });
  });
});
