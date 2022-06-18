import infrastructure from "@/infrastructure";

const arg = process.argv[2];

/**
 * サブコマンド
 */
// const commands: { [command: string]: () => Promise<boolean> } = {
//   init,
// };

if (arg === undefined) {
  infrastructure.serve();
}

// if (arg === undefined) {
//   serve(api);
// } else {
//   if (!commands[arg]) {
//     console.log("🙅‍♂️ 存在しないコマンドです");
//     process.exit(1);
//   }
//   commands[arg]();
// }
