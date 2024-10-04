"use client";
import Link from "next/link";
import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

import { StackToggle } from "#/actions/StackControl";
import { HostToggle } from "#/actions/HostControl";
import Notify from "#h/Notify";

type FormInfoProps = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: "enable" | "disable" | any;
  data?: any;
};

const FormToggle = ({ table, target, action, data }: FormInfoProps) => {
  const router = useRouter();
  const handleToggle = async () => {
    try {
      const srvAction = target == "stack" ? StackToggle : HostToggle;
      const res = await srvAction(table, data.id, !data.enabled);
      if (res.ok) {
        router.push("/" + table);
        router.refresh();
        Notify({ title: "Success", color: "green", message: res.result, icon: "tabler:check" });
      } else Notify({ title: "Error !", color: "red", message: res.result, icon: "tabler:x" });
    } catch (error) {
      Notify({ title: "Error !", color: "red", message: error.message, icon: "tabler:x" });
    }
  };

  return (
    <Box component="form">
      <Text my={10}>
        Are you sure, you will {action} this {table} {target}
        {target == "stack" ? " and all its hosts" : ""} ?
      </Text>
      <Flex>
        <Group gap={10}>
          <Button component={Link} href={"/" + table} w={100} variant="default" children="No" />
          <Button w={100} onClick={handleToggle} color={action == "disable" ? "red" : null} children="Yes" />
        </Group>
      </Flex>
    </Box>
  );
};

export default FormToggle;
