"use client";
import { Card, CardProps, Flex, Group, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type EmptyBoxProps = {
  icon: React.ReactNode;
  props?: CardProps;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const EmptyBox = ({ icon, props, title, description, children }: EmptyBoxProps) => {
  return (
    <Card p={20} {...props}>
      <Flex align="center" direction="column" gap={10} justify="center" mih={props?.mih ?? 300}>
        {icon}
        <Title order={3} ta="center">
          {title}
        </Title>
        <Text c="dimmed" ta="center">
          {description}
        </Text>
        <Group justify="center">{children}</Group>
      </Flex>
    </Card>
  );
};

export default EmptyBox;
