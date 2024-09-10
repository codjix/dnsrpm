import { Card, CardProps, Flex, Group, Text, Title } from "@mantine/core";

type EmptyBoxProps = {
  icon: React.ReactNode;
  props?: CardProps;
  title: string;
  description: string;
  children?: React.ReactNode;
};

const EmptyBox = ({ icon, props, title, description, children }: EmptyBoxProps) => {
  return (
    <Card {...props}>
      <Flex align="center" direction="column" gap={10} justify="center" h={props.mih}>
        {icon}
        <Title order={3}>{title}</Title>
        <Text c="dimmed">{description}</Text>
        <Group justify="center">{children}</Group>
      </Flex>
    </Card>
  );
};

export default EmptyBox;
