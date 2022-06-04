import { init } from "..";

describe("clone", () => {
  const cloneMock = jest.fn();
  const questionMock = jest.fn();

  beforeEach(() => {
    cloneMock.mockClear();
    questionMock.mockClear();
  });

  test("question が実行され、空文字が返却された場合は false を返すこと", async () => {
    cloneMock.mockResolvedValue("");
    const target = init(cloneMock, questionMock);

    expect(await target()).toBe(false);
  });
});
