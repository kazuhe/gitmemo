/**
 * Git Clone
 *
 * @param remote remote path
 * @param local local path
 * @returns clone の結果
 */
export type Clone = (remote: string, local: string) => Promise<string>;
