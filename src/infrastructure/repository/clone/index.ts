import child_process from "child_process";
import { Clone } from "@/domain/repository";

/**
 * リポジトリを clone する
 * @param remote remote path
 * @param local local path
 */
export const clone =
  (exec: typeof child_process.exec): Clone =>
  async (remote, local) => {
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
