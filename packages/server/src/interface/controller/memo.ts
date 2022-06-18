import os from "os";
import usecase from "@/usecase";

const HOME_DIR = os.homedir() + "/gitmemo";

export const findMemo = async (name: string) => {
  console.log("import...", `${HOME_DIR}/${name}.md`);
  const memo = await usecase.readMemo(`${HOME_DIR}/${name}.md`);
  return memo;
};
