import { serve } from "@/application/serve";
import { serve as api } from "@/infrastructure/api";
import init from "./init";

const arg = process.argv[2];

/**
 * サブコマンド
 */
const commands: { [command: string]: () => Promise<boolean> } = {
  init,
};

if (arg === undefined) {
  serve(api);
} else {
  if (!commands[arg]) {
    console.log("🙅‍♂️ 存在しないコマンドです");
    process.exit(1);
  }
  commands[arg]();
}
