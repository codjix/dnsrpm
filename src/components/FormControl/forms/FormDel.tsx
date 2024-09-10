"use client";
import Link from "next/link";
import { Box, Button, Flex, Group, Text } from "@mantine/core";

type FormDelProps = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: any;
  data?: any;
};

const FormDel = ({ table, target, data }: FormDelProps) => {
  console.log(data);
  return (
    <Box component="form">
      <Text my={10}>
        Are you sure, you will delete this {table} {target} ?
      </Text>
      <Flex>
        <Group gap={10}>
          <Button component={Link} href={"/" + table} w={100} variant="default" children="No" />
          <Button w={100} color="red" children="Yes" />
        </Group>
      </Flex>
    </Box>
  );
};

export default FormDel;
