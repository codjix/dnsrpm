"use client";
import { Icon, IconifyIcon } from "@iconify/react";
import { ActionIcon, SegmentedControl, Stack, Text, useMantineColorScheme } from "@mantine/core";
import Cookies from "universal-cookie";

type $ThemeSwitcher = {
  wide?: boolean;
  fullWidth?: boolean;
  noLabels?: boolean;
};

const ThemeSwitcher = ({ wide, fullWidth, noLabels }: $ThemeSwitcher) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const Co = new Cookies(null, { path: "/" });

  const segment = (icon: string | IconifyIcon, title: string) => ({
    icon,
    value: title.toLowerCase(),
    label: (
      <Stack align="center" gap={5} aria-label={title} title={title}>
        <Icon height={20} icon={icon} />
        {!noLabels && <Text h={20}>{title}</Text>}
      </Stack>
    ),
  });

  const schemes = [
    segment("codicon:color-mode", "Auto"),
    segment("iconoir:half-moon", "Dark"),
    segment("iconamoon:mode-light", "Light"),
  ];

  const scheme = schemes.find((item) => item.value == colorScheme);
  const index = schemes.indexOf(scheme);

  return wide ? (
    <SegmentedControl
      my="md"
      size="xl"
      data={schemes}
      value={colorScheme}
      fullWidth={fullWidth}
      onChange={(newScheme: any) => {
        Co.set("color-scheme", newScheme);
        setColorScheme(newScheme);
      }}
    />
  ) : (
    <ActionIcon
      size="lg"
      color="gray"
      variant="subtle"
      title={scheme?.value}
      aria-label={scheme.value}
      onClick={() => {
        const newScheme: any = schemes[(index + 1) % 3];
        Co.set("color-scheme", newScheme.value);
        setColorScheme(newScheme.value);
      }}
    >
      <Icon height={20} icon={scheme.icon} />
    </ActionIcon>
  );
};

// export default dynamic(() => Promise.resolve(ThemeSwitcher), { ssr: false });
export default ThemeSwitcher;
