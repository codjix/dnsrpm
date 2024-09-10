"use client";
import Link from "next/link";
import { UnstyledButton, Text, Flex, Button, HoverCard, Stack, Avatar } from "@mantine/core";
import { Icon } from "@iconify/react";

type User = {
  id?: number;
  role?: string;
  name?: string;
  created?: string;
  updated?: string;
  email?: string;
  avatar?: string;
  token?: string;
};

const AccountMenu = ({ user }: { user: User }) => {
  return (
    <>
      <HoverCard shadow="sm" position="bottom-end" withArrow arrowPosition="center">
        <HoverCard.Target>
          <UnstyledButton>
            <Avatar w={30} src={user.avatar} />
          </UnstyledButton>
        </HoverCard.Target>
        <HoverCard.Dropdown miw={200}>
          <Stack>
            <Flex gap={10} align="center">
              <Avatar w={30} src={user.avatar} />
              <Text>{user.name}</Text>
            </Flex>
            <Button component={Link} variant="default" fullWidth href="/settings" leftSection={<Icon icon="tabler:settings" />}>
              Settings
            </Button>
            <Button component={Link} color="red" fullWidth href="/auth/logout" leftSection={<Icon icon="tabler:logout" />}>
              Logout
            </Button>
          </Stack>
        </HoverCard.Dropdown>
      </HoverCard>
    </>
  );
};

export default AccountMenu;
