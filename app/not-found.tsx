import Link from "next/link";
import { Button, Flex, Group, Stack, Text, Title } from "@mantine/core";

import BackBtn from "@c/ui/BackBtn";

export const metadata = {
  title: "Not Found | Dnsrpm",
  description: "Sorry, couldn't find the page you're looking for.",
};

const NotFound = () => {
  return (
    <Flex h="100%" justify="center" align="center">
      <Stack gap={10} ta="center">
        <Title c="yellow" order={6}>
          404
        </Title>
        <Title order={2} my={0}>
          Not Found
        </Title>
        <Text c="dimmed">Sorry, couldn't find the page you're looking for.</Text>
        <Group justify="center">
          <Button w={100} component={Link} href="/">
            Go Home
          </Button>
          <BackBtn w={100} />
        </Group>
      </Stack>
    </Flex>
  );
};

export default NotFound;
