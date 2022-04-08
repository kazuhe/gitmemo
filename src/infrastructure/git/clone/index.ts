import child_process from "child_process";

/**
 * リポジトリを clone する
 * @param remote remote path
 * @param local local path
 */
export const clone =
  (exec: typeof child_process.exec) =>
  async (remote: string, local: string): Promise<string> => {
    // const repository = /.*\.git$/.test(remote) ? remote : `${remote}.git`;

    return new Promise((resolve, reject) => {
      exec(`git clone ${remote} ${local}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(error.toString());
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        // git clone は stdout ではなくて stderr に標準出力されるっぽい
        resolve(stderr);
      });
    });
  };

// (async () =>
//   await clone(child_process.exec)(
//     "https://github.com/kazuhe/kazuhe",
//     "~/Desktop/gitmemo/"
//   )
//     .then((result) => console.log("成功", result))
//     .catch((err) => console.log("失敗", err)))();
