import os from "os";
import readline from "readline";
import child_process from "child_process";
import * as usecase from "@/usecase";
import { memoRepository } from "@/interface/repository/memory/memo";

const HOME_DIR = os.homedir() + "/gitmemo";

const usecaseMemo = usecase.memo(memoRepository);

export const initMemo = async (
  rl: readline.Interface,
  exec: typeof child_process.exec
) => {
  const question = (question: string): Promise<string> =>
    new Promise((resolve) => {
      rl.question(`${question}`, (answer) => {
        resolve(answer);
        rl.close();
      });
    });

  const clone = (remote: string, local: string): Promise<string> =>
    new Promise((resolve, reject) => {
      exec(`git clone ${remote} ${local}`, (error) => {
        if (error) {
          reject(error.toString());
          return;
        }
        resolve("Successful clone");
      });
    });

  await usecase.initMemo(question, clone);
};

export const findMemo = async (name: string) => {
  console.log("import...", `${HOME_DIR}/${name}.md`);
  const memo = await usecase.readMemo(`${HOME_DIR}/${name}.md`);
  return memo;
};

export const getMemo = async (id: string) => {
  const memo = await usecaseMemo.getMemo(id);
  console.log("getMemo...", memo);
  return memo;
};

export const findAllMemo = async (per_page?: number, page?: number) => {
  const memos = await usecaseMemo.getAllMemo(per_page, page);
  return memos;
};
