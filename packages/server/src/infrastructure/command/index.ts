import { init } from "./init";

/**
 * サブコマンド
 */
const subCommands: { [command: string]: () => Promise<void> } = {
  init,
};

export default { subCommands };
