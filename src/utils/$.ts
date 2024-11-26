import { exec, ExecOptions } from "node:child_process";
import { promisify } from "node:util";

const $ = async (cmd: string[] | string, options?: ExecOptions) => {
  const execAsync = promisify(exec);
  if (Array.isArray(cmd)) cmd = cmd.join(" ");
  const x = await execAsync(cmd, { ...options, shell: "sh" });
  if (x.stderr) console.error(x.stderr);
  return x;
};

export default $;
