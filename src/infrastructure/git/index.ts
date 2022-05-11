import util from "util";
import { exec } from "child_process";
import { Clone } from "@/domain/git";

export const clone =
  (exec: any): Clone =>
  async (remote, local) => {
    return await exec(`git clone ${remote} ${local}`)
      .then(() => "Successful clone")
      .catch((error: any) => error.toString());
  };

export default clone(util.promisify(exec));
