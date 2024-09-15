"use client";
import Link from "next/link";
import { Box, Button, Flex, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

import { HostDel } from "#/actions/HostControl";
import { StackDel } from "#/actions/StackControl";
import Notify from "#h/Notify";

type FormDelProps = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: any;
  data?: any;
};

const FormDel = ({ table, target, data }: FormDelProps) => {
  const router = useRouter();
  const handleToggle = async () => {
    try {
      const srvAction = target == "stack" ? StackDel : HostDel;
      const res = await srvAction(table, data.id);
      if (res.ok) {
        router.push("/" + table);
        router.refresh();
        Notify({ title: "Success !", color: "green", message: res.result, icon: "tabler:check" });
      } else Notify({ title: "Error !", color: "red", message: res.result, icon: "tabler:x" });
    } catch (error) {
      Notify({ title: "Error !", color: "red", message: error.message, icon: "tabler:x" });
    }
  };
  return (
    <Box component="form">
      <Text my={10}>
        Are you sure, you will delete this {table} {target}
        {target == "stack" ? " and all its hosts" : ""} ?
      </Text>
      <Flex>
        <Group gap={10}>
          <Button component={Link} href={"/" + table} w={100} variant="default" children="No" />
          <Button w={100} onClick={handleToggle} color="red" children="Yes" />
        </Group>
      </Flex>
    </Box>
  );
};

export default FormDel;
