"use server";
import { withPromise } from "#/utils/withPromise";
import GetAllStacks from "../GetStacks";
import ProxyWriter from "./ProxyWriter";
import DnsWriter from "./DnsWriter";

const ApplyBackEnd = () =>
  withPromise(async (resolve) => {
    const targetDir = process.env.DATA_DIR;
    const stacks = await GetAllStacks("expand", true);
    Bun.write(`${targetDir}/all-data.json`, JSON.stringify(stacks));
    const proxy = await ProxyWriter(stacks.proxy, targetDir);
    const dns = await DnsWriter(stacks.dns, targetDir);

    resolve({
      ok: proxy && dns,
      result: {
        proxy: {
          ok: proxy,
          message: proxy
            ? "Proxy configuration applied successfully"
            : "Failed to apply proxy configuration",
        },
        dns: {
          ok: dns,
          message: dns
            ? "DNS configuration applied successfully"
            : "Failed to apply dns configuration",
        },
      },
    });
  });

export default ApplyBackEnd;
