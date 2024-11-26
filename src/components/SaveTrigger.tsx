"use client";
import ApplyBackEnd from "@/actions/ApplyBackend";
import Notify from "@h/Notify";
import { Icon } from "@iconify/react";
import { Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const SaveTrigger = ({ children }) => {
  const [opened, { close, open }] = useDisclosure();
  const handle = async () => {
    type $result = { ok: boolean; message: string };
    const { ok, result } = (await ApplyBackEnd()) as {
      ok: boolean;
      result: Record<"dns" | "proxy" | "error", $result>;
    };

    if (result?.error) {
      Notify({
        title: "Save Configurations",
        icon: "tabler:x",
        color: "red",
        message: result.error.message,
      });
      close();
      return;
    }

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
    close();
  };
  return (
    <>
      <div onClick={open}>{children}</div>
      <Modal opened={opened} onClose={close} title="Save Changes" centered>
        <Stack gap={20}>
          <Divider />
          <Text>Save the current configurations and apply them to the system.</Text>
          <Group>
            <Button onClick={close} variant="default">
              Cancel
            </Button>
            <Button onClick={handle} color="red">
              Save
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default SaveTrigger;
