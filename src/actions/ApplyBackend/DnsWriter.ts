import { $DnsStack } from "#/actions/GetStacks";
import { Liquid } from "liquidjs";

const DnsWriter = async (stacks: $DnsStack[], targetDir: string) =>
  new Promise<boolean>(async (resolve) => {
    const engine = new Liquid();
    const confDir = `${targetDir}/dnsmasq.d`;
    await Bun.$`rm -rf ${confDir}`;
    await Bun.$`mkdir -p ${confDir}`;

    stacks.map((stack, index) =>
      engine
        .parseAndRender(template, { stack })
        .then((content) => {
          const conf = `${confDir}/stack-${stack.id}.conf`;
          Bun.write(conf, content)
            .then(() => index === stacks.length - 1 && resolve(true))
            .catch(() => resolve(false));
        })
        .catch(() => resolve(false))
    );
    resolve(true);
  });

export default DnsWriter;

const template = `# {{ stack.name }} Hosts
# Created at {{ stack.created }}
# Updated at {{ stack.updated }}

# ========== Hosts ==========
{% for host in stack.hosts %}
# Host created at {{ host.created }}
# Host updated at {{ host.updated }}
address=/{{ host.domain }}/{{ host.ip }}
{% endfor %}`;
