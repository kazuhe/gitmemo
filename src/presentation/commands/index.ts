import init from "./init";

const arg = process.argv[2];

const commands: { [command: string]: () => Promise<boolean> } = {
  init,
};

if (!commands[arg]) {
  console.log("🙅‍♂️ 存在しないコマンドです");
  process.exit(1);
}

commands[arg]();
