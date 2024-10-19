import { $ProxyStack } from "#/actions/GetStacks";
import { Liquid } from "liquidjs";

const ProxyWriter = (stacks: $ProxyStack[], targetDir: string) =>
  new Promise<boolean>(async (resolve) => {
    const engine = new Liquid();
    const confDir = `${targetDir}/nginx.d`;
    await Bun.$`rm -rf ${confDir}`;
    await Bun.$`mkdir -p ${confDir}`;

    stacks.map((stack, index) =>
      stack.hosts.map((host) =>
        engine
          .parseAndRender(template, { host })
          .then((content) => {
            const conf = `${confDir}/stack-${stack.id}-host-${host.id}.conf`;
            Bun.write(conf, content)
              .then(() => index === stacks.length - 1 && resolve(true))
              .catch(() => resolve(false));
          })
          .catch(() => resolve(false))
      )
    );
    resolve(true);
  });

export default ProxyWriter;

const template = `server {
  # Created at {{ host.created }}
  # Updated at {{ host.updated }}
  listen 80;
  {% if host.isHttps %}
  # Enable HTTPS
  listen 443 ssl;
  ssl_certificate {{ host.cert }};
  ssl_certificate_key {{ host.key }};
  if ($scheme = "http") {
    return 301 https://$host$request_uri;
  }
  {% endif %}
  # Server name(s)
  server_name{% for domain in host.domains %} {{ domain }}{% endfor %};
  
  # Logging
  access_log /app/data/logs/nginx/stack-{{ host.stackId }}-host-{{ host.id }}-access.log;
  error_log /app/data/logs/nginx/stack-{{ host.stackId }}-host-{{ host.id }}-error.log warn;
  {% if host.conf %}
  # Custom configurations
  {{ host.conf }}
  {% endif %}
  location / {
      proxy_pass {{ host.targetProtocol }}://{{ host.targetHost }}:{{ host.targetPort }};
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      {% if host.ws %}
      # Allow websockets
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;
      {% endif %}
  }
  {% for location in host.rewrites %}
  # Location {{ location.path }}
  location {{ location.path }} {
      proxy_pass {{ host.protocol }}://{{ host.host }}:{{ host.port }};
      {% if location.conf %}
      # Location custom configurations
      {{ location.conf }}
      {% endif %}
  }
  {% endfor %}
}`;
