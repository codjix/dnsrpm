"use client";
import ApplyBackEnd from "#/actions/ApplyBackend";
import Notify from "#h/Notify";
import { Icon } from "@iconify/react";
import { Group, Stack, Text } from "@mantine/core";

const SaveTrigger = ({ children }) => {
  const handle = async () => {
    type $result = { ok: boolean; message: string };
    const { ok, result } = (await ApplyBackEnd()) as {
      ok: boolean;
      result: Record<"dns" | "proxy", $result>;
    };

    const status = ({ ok, message }: { ok: boolean; message: string }) => {
      const color = ok ? "green" : "red";
      const icon = "tabler:" + (ok ? "check" : "x");
      return (
        <Group>
          <Icon {...{ color, icon }} />
          <Text>{message}</Text>
        </Group>
      );
    };

    Notify({
      title: "Save Configurations",
      icon: "tabler:" + (ok ? "check" : "x"),
      color: ok ? "green" : "red",
      message: (
        <Stack gap={0}>
          {status(result.proxy)}
          {status(result.dns)}
        </Stack>
      ),
    });
  };
  return <div onClick={handle}>{children}</div>;
};

export default SaveTrigger;
