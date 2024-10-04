import { Icon } from "@iconify/react";
import { Badge, Box, Button, Card, Divider, Flex, Group, Stack, Text, Title } from "@mantine/core";

import classes from "./styles.module.scss";
import { GetProxyStacks } from "#/actions/GetStacks";
import FormControl, { FormTrigger } from "#c/FormControl";
import { NoStacks, StackDisabled, NoHosts, HoverMenu } from "#c/ui/PageUI";
import CopyBtn from "#c/ui/CopyBtn";

export const revalidate = 0;
export const metadata = {
  title: "Proxy | Dnsrpm",
};

var page = async ({ searchParams }) => {
  const stacks = await GetProxyStacks("expand");
  return (
    <>
      <FormControl state={searchParams} table="proxy">
        <Flex align="center" justify="space-between" py={20}>
          <Title order={1}>Proxy Stacks</Title>
          <FormTrigger to="/proxy?action=new-stack">
            <Button variant="default">New stack</Button>
          </FormTrigger>
        </Flex>
        <Divider mb={20} />
        {stacks.length < 1 && <NoStacks target="proxy" />}
        <Stack gap={20}>
          {stacks.map((stack) => (
            <Box id={"stack-" + stack.id} key={stack.updated} pos="relative" p={stack.enabled ? 0 : 20}>
              <Flex align="center" justify="space-between">
                <Title order={3}>{stack.name}</Title>
                <Group gap={20}>
                  <FormTrigger to="/proxy?action=new-host" data={{ stackId: stack.id }}>
                    <Button variant="default">New host</Button>
                  </FormTrigger>
                  <HoverMenu data={stack} table="Proxy" target="Stack" />
                </Group>
              </Flex>
              <Divider my={20} />
              {stack.hosts.length < 1 && <NoHosts target="proxy" data={{ stackId: stack.id }} />}
              {!stack.enabled && <StackDisabled target="proxy" data={stack} />}
              <Box className={classes.container}>
                <Box className={classes.grid} hidden={stack.hosts.length < 1}>
                  {stack.hosts.map((host) => (
                    <Card id={"host-" + host.id} withBorder shadow="sm" key={host.updated} px={20}>
                      <Flex align="center" justify="space-between">
                        <Text>Proxy host #{host.id}</Text>
                        <HoverMenu data={host} table="Proxy" target="Host" />
                      </Flex>
                      <Divider mt={10} />
                      <Box display="grid" p={10} fz={14} style={{ gridTemplateColumns: "auto 1fr", gap: "10px 30px" }}>
                        <span>Target</span>
                        <Group gap={5}>
                          {host.targetProtocol}://{host.targetHost}:{host.targetPort}
                          <CopyBtn value={`${host.targetProtocol}://${host.targetHost}:${host.targetPort}`} />
                        </Group>
                        <span>Stats</span>
                        <Group gap={10}>
                          <Badge h={30} radius={10} variant="dot" color={host.enabled ? "green" : "red"}>
                            {host.enabled ? "active" : "disabled"}
                          </Badge>
                          <Badge h={30} radius={10} variant="dot" color={host.ws ? "green" : "red"}>
                            ws
                          </Badge>
                          <Badge h={30} radius={10} variant="dot" color={host.isHttps ? "green" : "red"}>
                            SSL
                          </Badge>
                        </Group>
                        <span>Domains</span>
                        <Group gap={10}>
                          {host.domains.map((domain) => (
                            <Button
                              key={domain}
                              component="a"
                              target="_blank"
                              href={`${host.isHttps ? "https" : "http"}://${domain}`}
                              leftSection={<Icon icon="heroicons:arrow-top-right-on-square-16-solid" />}
                              children={domain}
                              variant="light"
                            />
                          ))}
                        </Group>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </FormControl>
    </>
  );
};

export default page;
