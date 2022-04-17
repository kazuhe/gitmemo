/**
 * ユーザーに質問する
 * @param question 質問
 * @param local local path
 */
export type Question = (question: string) => Promise<string>;
