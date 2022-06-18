import os from "os";
import readline from "readline";
import child_process from "child_process";
import usecase from "@/usecase";

const HOME_DIR = os.homedir() + "/gitmemo";

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
