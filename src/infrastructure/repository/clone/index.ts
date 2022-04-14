import child_process from "child_process";
import { Clone } from "@/domain/repository";

export const clone =
  (exec: typeof child_process.exec): Clone =>
  (remote, local) => {
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
