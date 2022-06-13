import child_process from "child_process";
import { Clone } from "@/domain/git";

export const clone: Clone = (remote, local) =>
  new Promise((resolve, reject) => {
    child_process.exec(`git clone ${remote} ${local}`, (error) => {
      if (error) {
        reject(error.toString());
        return;
      }
      resolve("Successful clone");
    });
  });
