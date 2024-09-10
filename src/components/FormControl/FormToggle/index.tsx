"use client";
import Link from "next/link";
import { Box, Button, Flex, Group, Text } from "@mantine/core";

type FormInfoProps = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: "enable" | "disable" | any;
  data?: any;
};

const FormToggle = ({ table, target, action, data }: FormInfoProps) => {
  console.log(data);
  return (
    <Box component="form">
      <Text my={10}>
        Are you sure, you will {action} this {table} {target} ?
      </Text>
      <Flex>
        <Group gap={10}>
          <Button component={Link} href={"/" + table} w={100} variant="default" children="No" />
          <Button w={100} color={action == "disable" ? "red" : null} children="Yes" />
        </Group>
      </Flex>
    </Box>
  );
};

export default FormToggle;
