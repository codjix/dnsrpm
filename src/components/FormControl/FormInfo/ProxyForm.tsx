"use client";
import { Icon } from "@iconify/react";
import { Checkbox, Divider, NumberInput, Select, Stack, Tabs, TagsInput, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type $ProxyForm = {
  Form: UseFormReturnType<Record<string, unknown>, (values: Record<string, unknown>) => Record<string, unknown>>;
};

const ProxyForm = ({ Form }: $ProxyForm) => {
  return (
    <>
      <Tabs variant="pills" defaultValue="details">
        <Tabs.List>
          <Tabs.Tab value="details" leftSection={<Icon width={20} icon="hugeicons:web-design-01" />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab value="rewrites" leftSection={<Icon width={20} icon="mdi:routes" />}>
            Rewrites
          </Tabs.Tab>
          <Tabs.Tab value="ssl" leftSection={<Icon width={20} icon="ph:certificate" />}>
            HTTPS
          </Tabs.Tab>
          <Tabs.Tab value="config" leftSection={<Icon width={20} icon="eva:options-2-outline" />}>
            Config
          </Tabs.Tab>
        </Tabs.List>
        <Divider my={10} />
        <Tabs.Panel component={Stack} value="details" maw={600}>
          <TagsInput
            label="Domains"
            placeholder="Ex: example.com, example.io"
            {...Form.getInputProps("domains")}
            withAsterisk
          />
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10 }}>
            <Select
              w={80}
              withAsterisk
              label="Protocol"
              placeholder="http"
              {...Form.getInputProps("targetProtocol")}
              data={["http", "https"]}
              allowDeselect={false}
            />
            <TextInput
              label="Hostname"
              placeholder="ex: 172.0.0.2"
              {...Form.getInputProps("targetHost")}
              withAsterisk
            />
            <NumberInput
              w={100}
              min={0}
              label="Port"
              placeholder="ex: 80"
              clampBehavior="strict"
              {...Form.getInputProps("targetPort")}
              withAsterisk
            />
          </div>
          <Checkbox label="Allow Websocket" {...Form.getInputProps("ws", { type: "checkbox" })} />
        </Tabs.Panel>
        <Tabs.Panel value="rewrites" maw={600}>
          rewrites tab content
        </Tabs.Panel>
        <Tabs.Panel component={Stack} value="ssl" maw={600}>
          <Checkbox
            label="Use SSL"
            description="Enable this to add ssl certificate and key"
            {...Form.getInputProps("isHttps", { type: "checkbox" })}
          />
          {Form.getInputProps("isHttps", { type: "checkbox" }).checked && (
            <>
              <Textarea
                rows={4}
                label="Certificate"
                {...Form.getInputProps("cert")}
                placeholder="-----BEGIN CERTIFICATE-----"
              />
              <Textarea
                rows={4}
                label="Certificate key"
                {...Form.getInputProps("key")}
                placeholder="-----BEGIN PRIVATE KEY-----"
              />
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="config">
          <Textarea
            rows={6}
            label="Custom Nginx Configuration"
            {...Form.getInputProps("conf")}
            placeholder="# Enter your custom Nginx configuration here at your own risk!"
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default ProxyForm;
