import { exec, ExecOptions } from "node:child_process";

const $ = (cmd: string[] | string, opts?: ExecOptions) => {
  return new Promise<string>((resolve, reject) => {
    if (Array.isArray(cmd)) cmd = cmd.join(" ");
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

export default $;
