import { $DnsStack } from "@/actions/GetStacks";
import { render } from "ejs";
import $ from "@u/$";

const DnsWriter = async (stacks: $DnsStack[], targetDir: string) =>
  new Promise<boolean>(async (resolve) => {
    const confDir = `${targetDir}/dnsmasq.d`;
    await $(`rm -rf ${confDir}`);
    await $(`mkdir -p ${confDir}`);

    stacks.map(async (stack) => {
      const conf = `${confDir}/stack-${stack.id}.conf`;
      const content = await render(template, { stack }, { async: true });
      await $(`printf "${content}" > ${conf}`);
      // console.log(conf, content);
    });
    resolve(true);
  });

export default DnsWriter;

const template = `# <%= stack.name %> Hosts
# Created at <%= stack.created %>
# Updated at <%= stack.updated %>

# ========== Hosts ==========
<% stack.hosts.forEach((host) => { %>
# Host created at <%= host.created %>
# Host updated at <%= host.updated %>
address=/<%= host.domain %>/<%= host.ip %>
<% }); %>`;
