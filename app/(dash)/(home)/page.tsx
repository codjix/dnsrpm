import Link from "next/link";
import { Stack, Card, SimpleGrid, Divider, Text, Button, Group, Badge, Image, Flex, Anchor } from "@mantine/core";
import { Icon } from "@iconify/react";

import empty from "#a/images/empty.png";
import { GetAllStacks } from "#/actions/GetStacks";
import EmptyBox from "#c/ui/EmptyBox";

export const revalidate = 0;
export const metadata = {
  title: "Dashboard | Dnsrpm",
};

var page = async () => {
  const stacks = await GetAllStacks("count");
  return (
    <>
      <h1>Dashboard</h1>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {["Proxy", "DNS"].map((listName, index) => {
          const list = listName.toLowerCase() as "proxy" | "dns";
          return (
            <Card withBorder shadow="sm" h="fit-content" mih={350} radius={20} key={index}>
              <Anchor component={Link} href={"/" + list}>
                <Flex justify="space-between" mb={10}>
                  <Text>{listName} Stacks</Text>
                  <Icon icon="mingcute:right-fill" />
                </Flex>
              </Anchor>
              <Divider mb={20} />
              <Stack>
                {stacks[list].map((stack, index) => (
                  <Button
                    h={50}
                    key={index}
                    href={`/${list}#stack-${stack.id + 1}`}
                    component={Link}
                    variant="default"
                    justify="space-between"
                    leftSection={
                      <Group align="center" gap={10}>
                        <Icon width={22} height={22} icon="f7:rectangle-stack" />
                        <Text ta="left">{stack.name}</Text>
                      </Group>
                    }
                    rightSection={
                      <Group gap={5}>
                        <Badge fz={14} variant="light">
                          {stack.count}
                        </Badge>
                        <Icon icon="mingcute:right-fill" />
                      </Group>
                    }
                  />
                ))}
                {stacks[list].length < 1 && (
                  <EmptyBox
                    title="No stacks yet"
                    icon={<Image w={100} src={empty.src} />}
                    description={`Get started by adding your first ${list} hosts stack.`}
                    props={{ shadow: "none", mih: 200, p: 20 }}
                  >
                    <Button
                      h={50}
                      href={`/${list}?action=new-stack`}
                      component={Link}
                      variant="default"
                      children="Create New Stack"
                    />
                  </EmptyBox>
                )}
              </Stack>
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default page;
