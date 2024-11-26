import { $ProxyStack } from "@/actions/GetStacks";
import { render } from "ejs";
import $ from "@u/$";

const ProxyWriter = (stacks: $ProxyStack[], targetDir: string) =>
  new Promise<boolean>(async (resolve) => {
    const confDir = `${targetDir}/nginx.d`;
    await $(`rm -rf ${confDir}`);
    await $(`mkdir -p ${confDir}`);

    stacks.map((stack) => {
      stack.hosts.map(async (host) => {
        const conf = `${confDir}/stack-${stack.id}-host-${host.id}.conf`;
        const content = await render(template, { host }, { async: true });
        await $(`printf "${content}" > ${conf}`);
        // console.log(conf, content);
      });
    });
    resolve(true);
  });

export default ProxyWriter;

const template = `server {
  # Created at <%= host.created %>
  # Updated at <%= host.updated %>
  listen 80;
  <% if(host.isHttps){ %>
  # Enable HTTPS
  listen 443 ssl;
  ssl_certificate <%= host.cert %>;
  ssl_certificate_key <%= host.key %>;
  if ($scheme = "http") {
    return 301 https://$host$request_uri;
  }
  <% } %>
  # Server name(s)
  server_name<% host.domains.map((domain)=>{  %> <%= domain %><% }) %>;
  
  # Logging
  access_log /app/data/logs/nginx/stack-<%= host.stackId %>-host-<%= host.id %>-access.log;
  error_log /app/data/logs/nginx/stack-<%= host.stackId %>-host-<%= host.id %>-error.log warn;
  <% if (host.conf){ %>
  # Custom configurations
  <%= host.conf %>
  <% } %>
  location / {
      proxy_pass <%= host.targetProtocol %>://<%= host.targetHost %>:<%= host.targetPort %>;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      <% if (host.ws){ %>
      # Allow websockets
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection $http_connection;
      <% } %>
  }
  <% host.rewrites.map((location)=> {  %>
  # Location <%= location.path %>
  location <%= location.path %> {
      proxy_pass <%= host.protocol %>://<%= host.host %>:<%= host.port %>;
      <% if (location.conf){ %>
      # Location custom configurations
      <%= location.conf %>
      <% } %>
  }
  <% }) %>
}`;
