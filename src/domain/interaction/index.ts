/**
 * ユーザーに質問する
 * @param question 質問
 * @returns 回答
 */
export type Question = (question: string) => Promise<string>;
