import { promisify } from "util";
import child_process from "child_process";

/**
 * promise の child_process.exec
 */
export const exec = promisify(child_process.exec);
