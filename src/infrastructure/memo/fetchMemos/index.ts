import child_process from "child_process";
import { FetchMemos } from "@/domain/memo";

export const fetchMemos =
  (exec: typeof child_process.exec): FetchMemos =>
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

export default fetchMemos(child_process.exec);
