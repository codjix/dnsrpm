"use client";
import { useEffect } from "react";
import { ActionIcon, AppShell, Container, Flex, Group, rem, Text } from "@mantine/core";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";

import AccountMenu from "./AccountMenu";
import NavBar from "./NavBar";
import Affix from "./ui/Affix";
import Link from "next/link";
import ApplyBackEnd from "#/actions/ApplyBackend";

const LayoutX = ({ children, wideOpen, user }: { children: React.ReactNode; wideOpen?: string; user: any }) => {
  const Co = new Cookies(null, { path: "/" });
  const pinned = useHeadroom({ fixedAt: 120 });
  const [mOpened, mHandlers] = useDisclosure();
  const [wOpened, wHandlers] = useDisclosure(wideOpen !== "false");
  const wideView = useMediaQuery("(min-width: 767px)");

  useEffect(() => Co.set("wide-open", wOpened), [wOpened]);

  const shellProps = {
    header: { height: 70, collapsed: !pinned, offset: true },
    navbar: { width: 300, breakpoint: "sm", collapsed: { desktop: !wOpened, mobile: !mOpened } },
    aside: {
      width: 300,
      breakpoint: "md",
      collapsed: { desktop: true, mobile: true },
    },
  };

  const mMenu = (
    <ActionIcon onClick={mHandlers.toggle} variant="subtle" color="gray" size="lg" hiddenFrom="sm">
      <Icon height={25} icon={"mdi:menu-" + (mOpened ? "open" : "close")} />
    </ActionIcon>
  );

  const wMenu = (
    <ActionIcon onClick={wHandlers.toggle} variant="subtle" color="gray" size="lg" visibleFrom="sm">
      <Icon height={25} icon={"mdi:menu-" + (wOpened ? "open" : "close")} />
    </ActionIcon>
  );

  const blur = {
    background: "color-mix(in srgb, var(--mantine-color-default), transparent 50%)",
    backdropFilter: "blur(10px)",
  };

  return (
    <AppShell layout="alt" {...shellProps}>
      <AppShell.Header>
        <Container h="100%" style={{ width: "100%", maxWidth: "1200px" }} px={20}>
          <Group h="100%" justify="space-between" gap={10}>
            <Flex h="100%" align="center" gap={10}>
              {wMenu}
              {mMenu}
              <Text size="20px" component={Link} href="/">
                Dnsrpm
              </Text>
            </Flex>
            <Flex h="100%" align="center" gap={10}>
              <ActionIcon variant="default" size="lg" onClick={() => ApplyBackEnd().then(console.log)}>
                <Icon icon="tabler:square-rounded-arrow-down" />
              </ActionIcon>
              <AccountMenu user={user} />
            </Flex>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Navbar style={blur} px="md" zIndex={wideView ? null : 9999}>
        <NavBar menu={mMenu} close={mHandlers.close} />
      </AppShell.Navbar>
      <AppShell.Main pt={rem(60)}>
        <Container style={{ width: "100%", maxWidth: "1200px" }} p={20}>
          {children}
        </Container>
      </AppShell.Main>
      <Affix />
    </AppShell>
  );
};

export default LayoutX;
