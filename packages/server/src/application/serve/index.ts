import os from "os";

// TODO: domain からimport
import { Server } from "@/infrastructure/api";

const HOME_DIR = os.homedir() + "/gitmemo";

/**
 * Memo を提供する
 */
type Serve = (server: Server) => void;

export const serve: Serve = (server) => {
  server(HOME_DIR);
};
