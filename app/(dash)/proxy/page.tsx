import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Image,
  Overlay,
  SimpleGrid,
  Stack,
  Table,
  TableTbody,
  TableTd,
  TableTr,
  Text,
  Title,
} from "@mantine/core";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { GetProxyStacks } from "#/actions/GetStacks";
import FormControl, { FormTrigger } from "#c/FormControl";
import EmptyBox from "#c/ui/EmptyBox";
import empty from "#a/images/empty.png";
import CopyBtn from "#c/ui/CopyBtn";

export const metadata = {
  title: "Proxy | Dnsrpm",
};

var page = async ({ searchParams }) => {
  const stacks = await GetProxyStacks("expand");
  return (
    <>
      <FormControl state={searchParams} table="proxy">
        <Flex align="center" justify="space-between">
          <h1>Proxy Stacks</h1>
          <FormTrigger to="/proxy?action=new-stack">
            <Button variant="default">New stack</Button>
          </FormTrigger>
        </Flex>
        <Divider mb={20} />
        {stacks.length < 1 && (
          <EmptyBox
            title="No stacks yet"
            icon={<Image w={100} src={empty.src} />}
            description="Get started by adding your first proxy hosts stack."
            props={{ withBorder: true, shadow: "sm", mih: 400 }}
          >
            <FormTrigger to="/proxy?action=new-stack">
              <Button variant="default">New stack</Button>
            </FormTrigger>
          </EmptyBox>
        )}
        <Stack gap={20}>
          {stacks.map((stack, index) => (
            <Box id={"stack-" + (stack.id + 1)} key={index} pos="relative" p={stack.enabled ? 0 : 20}>
              <Flex align="center" justify="space-between">
                <Title order={3}>{stack.name}</Title>
                <Group gap={10}>
                  <FormTrigger to="/proxy?action=new-host" data={stack}>
                    <Button variant="default">New host</Button>
                  </FormTrigger>
                  <HoverCard shadow="sm" withArrow arrowPosition="center" position="bottom-end">
                    <HoverCardTarget>
                      <ActionIcon size="lg" variant="default" color="gray">
                        <Icon width={25} icon="tabler:menu-2" />
                      </ActionIcon>
                    </HoverCardTarget>
                    <HoverCardDropdown miw={200}>
                      <Stack gap={10}>
                        <Text>Proxy Stack #{stack.id + 1}</Text>
                        <FormTrigger to="/proxy?action=edit-stack" data={stack}>
                          <Button fullWidth variant="default" leftSection={<Icon icon="tabler:edit" />}>
                            Edit stack
                          </Button>
                        </FormTrigger>
                        <FormTrigger to={`/proxy?action=${stack.enabled ? "disable" : "enable"}-stack`} data={stack}>
                          <Button
                            fullWidth
                            variant="default"
                            leftSection={<Icon icon={stack.enabled ? "tabler:pause" : "tabler:play"} />}
                          >
                            {stack.enabled ? "Disable" : "Enable"} stack
                          </Button>
                        </FormTrigger>
                        <FormTrigger to="/proxy?action=delete-stack" data={stack}>
                          <Button fullWidth color="red" leftSection={<Icon icon="tabler:trash" />}>
                            Delete stack
                          </Button>
                        </FormTrigger>
                      </Stack>
                    </HoverCardDropdown>
                  </HoverCard>
                </Group>
              </Flex>
              <Divider mt={10} />
              {stack.hosts.length < 1 && (
                <EmptyBox
                  title="No hosts yet"
                  icon={<Image w={100} src={empty.src} />}
                  description="Get started by adding your first proxy host."
                  props={{ withBorder: true, shadow: "sm", mih: 400, mt: 20 }}
                >
                  <Button component={Link} href="/proxy?action=new-host" variant="default" children="New host" />
                </EmptyBox>
              )}
              {!stack.enabled && (
                <Overlay radius={10}>
                  <Flex align="center" justify="center" h="100%">
                    <EmptyBox
                      title="Stack is disabled"
                      icon={<Icon width={100} icon="f7:rectangle-stack-badge-minus" />}
                      description="Please enable this stack to apply its hosts."
                      props={{ withBorder: true, shadow: "sm", mih: 250, mt: 20 }}
                    >
                      <FormTrigger to="/proxy?action=enable-stack" data={stack}>
                        <Button variant="outline" children="Enable stack" />
                      </FormTrigger>
                      <FormTrigger to="/proxy?action=delete-stack" data={stack}>
                        <Button variant="outline" color="red" children="Delete stack" />
                      </FormTrigger>
                    </EmptyBox>
                  </Flex>
                </Overlay>
              )}
              <SimpleGrid mt={20} display={stack.hosts.length < 1 ? "none" : "grid"} cols={{ xs: 1, sm: 2, md: 3 }}>
                {stack.hosts.map((host, index) => (
                  <Card id={"host-" + (host.id + 1)} withBorder shadow="sm" key={index} px={20}>
                    <Flex align="center" justify="space-between">
                      <Text>Proxy host #{host.id + 1}</Text>
                      <HoverCard shadow="sm" withArrow arrowPosition="center" position="bottom-end">
                        <HoverCardTarget>
                          <ActionIcon h={30} w={30} variant="subtle" color="gray">
                            <Icon width={20} icon="tabler:menu-2" />
                          </ActionIcon>
                        </HoverCardTarget>
                        <HoverCardDropdown miw={200}>
                          <Stack gap={10}>
                            <Text>Proxy host #{host.id + 1}</Text>
                            <FormTrigger to="/proxy?action=edit-host" data={host}>
                              <Button fullWidth variant="default" leftSection={<Icon icon="tabler:edit" />}>
                                Edit host
                              </Button>
                            </FormTrigger>
                            <Button
                              fullWidth
                              component={Link}
                              variant="default"
                              href={`/proxy?action=${host.enabled ? "disable" : "enable"}-host`}
                              leftSection={<Icon icon={host.enabled ? "tabler:pause" : "tabler:play"} />}
                            >
                              {host.enabled ? "Disable" : "Enable"} host
                            </Button>
                            <Button
                              fullWidth
                              color="red"
                              component={Link}
                              href="/proxy?action=delete-host"
                              leftSection={<Icon icon="tabler:trash" />}
                            >
                              Delete host
                            </Button>
                          </Stack>
                        </HoverCardDropdown>
                      </HoverCard>
                    </Flex>
                    <Divider mt={10} />
                    <Table>
                      <TableTbody>
                        <TableTr>
                          <TableTd>Target</TableTd>
                          <TableTd>
                            <Group gap={5}>
                              {host.targetProtocol}://{host.targetHost}:{host.targetPort}
                              <CopyBtn value={`${host.targetProtocol}://${host.targetHost}:${host.targetPort}`} />
                            </Group>
                          </TableTd>
                        </TableTr>
                        <TableTr>
                          <TableTd>Stats</TableTd>
                          <TableTd>
                            <Group gap={10}>
                              <Badge h={30} radius={10} variant="dot" color={host.isHttps ? "green" : "red"}>
                                https
                              </Badge>
                              <Badge h={30} radius={10} variant="dot" color={host.enabled ? "green" : "red"}>
                                {host.enabled ? "active" : "disabled"}
                              </Badge>
                            </Group>
                          </TableTd>
                        </TableTr>
                        <TableTr>
                          <TableTd>Domains</TableTd>
                          <TableTd>
                            {host.domains.map((domain, index) => (
                              <Button
                                key={index}
                                component="a"
                                target="_blank"
                                href={`${host.isHttps ? "https" : "http"}://${domain}`}
                                leftSection={<Icon icon="heroicons:arrow-top-right-on-square-16-solid" />}
                                children={domain}
                                variant="light"
                              />
                            ))}
                          </TableTd>
                        </TableTr>
                      </TableTbody>
                    </Table>
                  </Card>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Stack>
      </FormControl>
    </>
  );
};

export default page;
