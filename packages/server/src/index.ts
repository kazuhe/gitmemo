import api from "@/infrastructure/api";
import command from "@/infrastructure/command";

/**
 * コマンド引数
 */
const arg = process.argv[2];

if (arg === undefined) {
  api.serve();
} else {
  if (!command.subCommands[arg]) {
    console.log("🙅‍♂️ 存在しないコマンドです");
    process.exit(1);
  }
  command.subCommands[arg]();
}
