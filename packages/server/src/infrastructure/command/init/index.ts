import readline from "readline";
import child_process from "child_process";
import controller from "@/interface/controller";

export const init = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  await controller.initMemo(rl, child_process.exec);
};
