/**
 * リポジトリを clone する
 * @param remote remote path
 * @param local local path
 */
export type Clone = (remote: string, local: string) => Promise<string>;
