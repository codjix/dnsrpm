import Link from "next/link";
import { Stack, Card, Divider, Text, Button, Group, Badge, Flex, Anchor, Box, Title } from "@mantine/core";
import { Icon } from "@iconify/react";

import classes from "./styles.module.scss";
import { GetAllStacks } from "@/actions/GetStacks";
import { NoStacks } from "@c/ui/PageUI";

export const revalidate = 0;
export const metadata = {
  title: "Dashboard | Dnsrpm",
};

var page = async () => {
  const stacks = await GetAllStacks("count");

  return (
    <>
      <Title order={1} py={20}>
        Dashboard
      </Title>
      <Divider mb={20} />
      <Box className={classes.container}>
        <Box className={classes.grid}>
          {["Proxy", "DNS"].map((listName, index) => {
            const list = listName.toLowerCase() as "proxy" | "dns";
            return (
              <Card withBorder shadow="sm" className={classes.card} key={index}>
                <Anchor component={Link} href={"/" + list}>
                  <Flex justify="space-between" mb={10}>
                    <Text>{listName} Stacks</Text>
                    <Icon icon="mingcute:right-fill" />
                  </Flex>
                </Anchor>
                <Divider mb={20} />
                <Stack>
                  {stacks[list].map((stack) => (
                    <Button
                      h={50}
                      key={stack.updated}
                      href={`/${list}#stack-${stack.id}`}
                      component={Link}
                      variant="default"
                      justify="space-between"
                      leftSection={
                        <Group align="center" gap={10}>
                          <Icon width={22} height={22} icon="f7:rectangle-stack" />
                          <Text ta="left" h={22}>
                            {stack.name}
                          </Text>
                        </Group>
                      }
                      rightSection={
                        <Group gap={5}>
                          <Badge fz={14} variant="light">
                            {stack.hosts.length}
                          </Badge>
                          <Icon icon="mingcute:right-fill" />
                        </Group>
                      }
                    />
                  ))}
                  {stacks[list].length < 1 && <NoStacks target={list} props={{ mih: 220, shadow: null }} />}
                </Stack>
              </Card>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default page;
