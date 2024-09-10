"use client";
import {
  Alert,
  Button,
  Divider,
  LoadingOverlay,
  NumberInput,
  Select,
  Stack,
  Switch,
  Tabs,
  TagsInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import zod from "zod";
import useTrans from "#h/useTrans";
import { useState } from "react";

const HostControlForm = () => {
  const [useSSl, setUseSSL] = useState(false);
  const { start, loading, error } = useTrans(async ({ args, setLoading }) => {
    console.log(args);
    setLoading(false);
    Form.reset();
  });

  const Form = useForm({
    initialValues: { domains: [] },
    validate: zodResolver(
      zod.object({
        domains: zod.array(zod.string()),
      })
    ),
  });

  return (
    <>
        <form onSubmit={Form.onSubmit(start)}>
          <Stack gap={10} pos="relative">
            <LoadingOverlay visible={loading} />
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
              {error && <Alert variant="light" color="red" title={error} icon={<Icon icon="tabler:info-circle" />} />}
              <Tabs.Panel component={Stack} value="details" maw={600}>
                <TagsInput label="Domains" placeholder="Enter domains" {...Form.getInputProps("domains")} required />
                <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10 }}>
                  <Select
                    w={80}
                    required
                    label="Protocol"
                    defaultValue="http"
                    data={["http", "https"]}
                    allowDeselect={false}
                  />
                  <TextInput label="Hostname" placeholder="ex: 172.0.0.2" required />
                  <NumberInput w={100} label="Port" placeholder="ex: 80" min={0} clampBehavior="strict" required />
                </div>
                <Switch label="Allow Websocket" />
              </Tabs.Panel>
              <Tabs.Panel value="rewrites" maw={600}>
                rewrites tab content
              </Tabs.Panel>
              <Tabs.Panel component={Stack} value="ssl" maw={600}>
                <Switch label="Use SSL" checked={useSSl} onChange={(event) => setUseSSL(event.currentTarget.checked)} />
                {useSSl && (
                  <>
                    <Textarea label="Certificate" required rows={4} placeholder="-----BEGIN CERTIFICATE-----" />
                    <Textarea label="Certificate key" required rows={4} placeholder="-----BEGIN PRIVATE KEY-----" />
                  </>
                )}
              </Tabs.Panel>
              <Tabs.Panel value="config">
                <Textarea
                  label="Custom Nginx Configuration"
                  rows={4}
                  placeholder="# Enter your custom Nginx configuration here at your own risk!"
                />
              </Tabs.Panel>
            </Tabs>
            <Button loading={loading} w="120px" mt={10} type="submit" rightSection={<Icon icon="tabler:send-2" />}>
              Create
            </Button>
          </Stack>
        </form>
    </>
  );
};

export default HostControlForm;
