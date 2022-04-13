import child_process from "child_process";

/**
 * リポジトリを clone する
 * @param remote remote path
 * @param local local path
 */
export const clone =
  (exec: typeof child_process.exec) =>
  async (remote: string, local: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      exec(`git clone ${remote} ${local}`, (error, _, stderr) => {
        if (error) {
          reject(error.toString());
          return;
        }
        resolve(stderr);
      });
    });
  };

export default clone(child_process.exec);
