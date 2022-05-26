import { Clone } from "@/domain/git";
import { exec } from "@/infrastructure/nodejs";

// export const clone =
//   (exec: any): Clone =>
//   async (remote, local) => {
//     return await exec(`git clone ${remote} ${local}`)
//       .then(() => "Successful clone")
//       .catch((error: any) => error.toString());
//   };

export const clone: Clone = async (remote, local) => {
  return await exec(`git clone ${remote} ${local}`)
    .then(() => "Successful clone")
    .catch((error) => error.toString());
};

// export default clone(util.promisify(exec));
