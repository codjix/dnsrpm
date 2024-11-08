"use server";
import { withPromise } from "@u/withPromise";
import GetAllStacks from "../GetStacks";
import ProxyWriter from "./ProxyWriter";
import DnsWriter from "./DnsWriter";

const ApplyBackEnd = () =>
  withPromise(async (resolve) => {
    const errMsg = { error: { ok: false, message: "Timeout" } };
    setTimeout(() => resolve({ ok: false, result: errMsg }), 10000);
    const targetDir = process.env.DATA_DIR;
    const stacks = await GetAllStacks("expand", true);
    // .write(`${targetDir}/all-data.json`, JSON.stringify(stacks));
    const proxy = await ProxyWriter(stacks.proxy, targetDir);
    const dns = await DnsWriter(stacks.dns, targetDir);
    if (process.env.NODE_ENV == "production") {
      /**
       * ToDo: test configurations
       * - dnsmasq --test
       * - nginx -t
       */
      // $`rc-service dnsmasq restart`;
      // $`rc-service nginx restart`;
    }

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
