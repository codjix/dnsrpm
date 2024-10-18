"use client";
import {
  ActionIcon,
  AppShell,
  Container,
  Flex,
  Group,
  rem,
  Text,
} from "@mantine/core";
import { useEffect } from "react";
import { useDisclosure, useHeadroom, useMediaQuery } from "@mantine/hooks";
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";

import SaveTrigger from "./SaveTrigger";
import AccountMenu from "./AccountMenu";
import NavBar from "./NavBar";
import Affix from "./ui/Affix";
import Link from "next/link";

export const revalidate = 0;

type $LayoutX = {
  children: React.ReactNode;
  wideOpen?: string;
  user: any;
};
const LayoutX = ({ children, wideOpen, user }: $LayoutX) => {
  const Co = new Cookies(null, { path: "/" });
  const pinned = useHeadroom({ fixedAt: 120 });
  const [mOpened, mHandlers] = useDisclosure();
  const [wOpened, wHandlers] = useDisclosure(wideOpen !== "false");
  const wideView = useMediaQuery("(min-width: 767px)");

  useEffect(() => Co.set("wide-open", wOpened), [wOpened]);

  const shellProps = {
    header: { height: 70, collapsed: !pinned, offset: true },
    navbar: {
      width: 300,
      breakpoint: "sm",
      collapsed: { desktop: !wOpened, mobile: !mOpened },
    },
    aside: {
      width: 300,
      breakpoint: "md",
      collapsed: { desktop: true, mobile: true },
    },
  };

  const mMenu = (
    <MenuIcon opened={mOpened} handlers={mHandlers} hiddenFrom="sm" />
  );

  const blur = {
    background:
      "color-mix(in srgb, var(--mantine-color-default), transparent 50%)",
    backdropFilter: "blur(10px)",
  };

  return (
    <AppShell layout="alt" {...shellProps}>
      <AppShell.Header>
        <Container
          h="100%"
          style={{ width: "100%", maxWidth: "1200px" }}
          px={20}
        >
          <Group h="100%" justify="space-between" gap={10}>
            <Flex h="100%" align="center" gap={10}>
              <MenuIcon opened={wOpened} handlers={wHandlers} visbleFrom="sm" />
              {mMenu}
              <Text size="20px" component={Link} href="/">
                Dnsrpm
              </Text>
            </Flex>
            <Flex h="100%" align="center" gap={10}>
              <SaveTrigger>
                <ActionIcon variant="default" size="lg">
                  <Icon icon="tabler:square-rounded-arrow-down" />
                </ActionIcon>
              </SaveTrigger>
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

type $MenuIcon = {
  opened: boolean;
  hiddenFrom?: string;
  visbleFrom?: string;
  handlers: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
};
const MenuIcon = ({ handlers, opened, hiddenFrom, visbleFrom }: $MenuIcon) => (
  <ActionIcon
    onClick={handlers.toggle}
    variant="subtle"
    color="gray"
    size="lg"
    hiddenFrom={hiddenFrom}
    visibleFrom={visbleFrom}
  >
    <Icon height={25} icon={"mdi:menu-" + (opened ? "open" : "close")} />
  </ActionIcon>
);

export default LayoutX;
