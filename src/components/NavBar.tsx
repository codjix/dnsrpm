"use client";
import Link from "next/link";
import { AppShell, Divider, Flex, ScrollArea, Text, Stack, NavLink, ActionIcon } from "@mantine/core";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

import ThemeSwitcher from "./ui/ThemeSwitcher";
import pages from "#a/res/pages.json";

type NavBarProps = {
  menu: React.ReactNode;
  close: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const NavBar = ({ menu, close }: NavBarProps) => {
  const pathname = usePathname();

  return (
    <>
      <AppShell.Section hiddenFrom="sm">
        <Flex h={60} align="center" gap={10}>
          {menu}
          <Text size="20px">Dnsrpm</Text>
        </Flex>
        <Divider />
      </AppShell.Section>
      <AppShell.Section grow my="md" component={ScrollArea}>
        <Stack gap={10}>
          {pages.map(({ href, label, icon }, index) => (
            <NavLink
              key={index}
              component={Link}
              active={pathname == href}
              {...{ href, label, onClick: close }}
              style={{ borderRadius: 10 }}
              leftSection={
                <ActionIcon variant="transparent" color={pathname == href ? null : "gray"} size="lg">
                  <Icon height={25} icon={icon} />
                </ActionIcon>
              }
            />
          ))}
        </Stack>
      </AppShell.Section>
      <AppShell.Section>
        <ThemeSwitcher wide fullWidth />
      </AppShell.Section>
    </>
  );
};

export default NavBar;
