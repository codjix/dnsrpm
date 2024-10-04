import { Icon } from "@iconify/react";
import { Box, Divider, Title } from "@mantine/core";
import EmptyBox from "#c/ui/EmptyBox";

export const metadata = {
  title: "Settings | Dnsrpm",
};

var page = () => {
  return (
    <Box mt={10}>
      <Title order={1}>Settings Page</Title>
      <Divider my={20} />
      <EmptyBox
        title="Not Ready"
        description="This page is not implemented yet !"
        icon={<Icon width={100} icon="tabler:timeline-event-exclamation" />}
        props={{ withBorder: true, shadow: "sm" }}
      />
    </Box>
  );
};

export default page;
