import { Badge, Box, Button, Card, Divider, Flex, Group, Stack, Table, Text, Title } from "@mantine/core";

import classes from "./styles.module.scss";
import { GetDnsStacks } from "#/actions/GetStacks";
import FormControl, { FormTrigger } from "#c/FormControl";
import { NoStacks, StackDisabled, NoHosts, HoverMenu } from "#c/ui/PageUI";
import CopyBtn from "#c/ui/CopyBtn";

export const revalidate = 0;
export const metadata = {
  title: "DNS | Dnsrpm",
};

var page = async ({ searchParams }) => {
  const stacks = await GetDnsStacks("expand");
  return (
    <FormControl state={searchParams} table="dns">
      <Flex align="center" justify="space-between" py={20}>
        <Title order={1}>DNS Stacks</Title>
        <FormTrigger to="/dns?action=new-stack">
          <Button variant="default">New stack</Button>
        </FormTrigger>
      </Flex>
      <Divider mb={20} />
      {stacks.length < 1 && <NoStacks target="dns" />}
      <Stack gap={20}>
        {stacks.map((stack) => (
          <Box id={"stack-" + (stack.id + 1)} key={crypto.randomUUID()} pos="relative" p={stack.enabled ? 0 : 20}>
            <Flex align="center" justify="space-between">
              <Title order={3}>{stack.name}</Title>
              <Group gap={20}>
                <FormTrigger to="/dns?action=new-host" data={{ stackid: stack.id }}>
                  <Button variant="default">New host</Button>
                </FormTrigger>
                <HoverMenu data={stack} table="DNS" target="Stack" />
              </Group>
            </Flex>
            <Divider my={20} />
            {stack.hosts.length < 1 && <NoHosts target="dns" data={{ stackid: stack.id }} />}
            {!stack.enabled && <StackDisabled target="dns" data={stack} />}
            <Box className={classes.container}>
              <Box className={classes.grid} hidden={stack.hosts.length < 1}>
                {stack.hosts.map((host) => (
                  <Card id={"host-" + (host.id + 1)} withBorder shadow="sm" key={crypto.randomUUID()} px={20}>
                    <Flex align="center" justify="space-between">
                      <Text>DNS host #{host.id + 1}</Text>
                      <HoverMenu data={host} table="DNS" target="Host" />
                    </Flex>
                    <Divider mt={10} />
                    <Table
                      data={{
                        body: [
                          [
                            "Domain",
                            <Group gap={5}>
                              {host.domain}
                              <CopyBtn value={host.domain} />
                            </Group>,
                          ],
                          [
                            "IP",
                            <Group gap={5}>
                              {host.ip}
                              <CopyBtn value={host.ip} />
                            </Group>,
                          ],
                          [
                            "Status",
                            <Badge h={30} radius={10} variant="dot" color={host.enabled ? "green" : "red"}>
                              {host.enabled ? "active" : "disabled"}
                            </Badge>,
                          ],
                        ],
                      }}
                    />
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Stack>
    </FormControl>
  );
};

export default page;
