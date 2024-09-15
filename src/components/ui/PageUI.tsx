"use client";
import { Icon } from "@iconify/react";
import { Overlay, Flex, Button, Image, ActionIcon, HoverCard, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import EmptyBox from "./EmptyBox";
import { FormTrigger } from "#c/FormControl";
import empty from "#a/images/empty.png";

export const NoStacks = ({ target }) => (
  <EmptyBox
    title="No stacks yet"
    icon={<Image w={100} src={empty.src} />}
    description="Get started by adding your first hosts stack."
    props={{ withBorder: true, shadow: "sm", mih: 400 }}
  >
    <FormTrigger to={`/${target}?action=new-stack`}>
      <Button variant="default">New stack</Button>
    </FormTrigger>
  </EmptyBox>
);

export const StackDisabled = ({ target, data }) => (
  <Overlay radius={10}>
    <Flex align="center" justify="center" h="100%">
      <EmptyBox
        title="Stack is disabled"
        icon={<Icon width={100} icon="f7:rectangle-stack-badge-minus" />}
        description="Please enable it to apply & manage included hosts."
        props={{ withBorder: true, shadow: "sm", mih: 250, my: 20 }}
      >
        <FormTrigger to={`/${target}?action=enable-stack`} data={data}>
          <Button variant="outline" children="Enable stack" />
        </FormTrigger>
        <FormTrigger to={`/${target}?action=delete-stack`} data={data}>
          <Button variant="outline" color="red" children="Delete stack" />
        </FormTrigger>
      </EmptyBox>
    </Flex>
  </Overlay>
);

export const NoHosts = ({ target, data }) => {
  const wideView = useMediaQuery("(min-width: 767px)");
  return (
    <EmptyBox
      title="No hosts yet"
      icon={<Image w={100} src={empty.src} />}
      description="Get started by adding your first host."
      props={{ withBorder: true, shadow: "sm", mih: wideView ? 400 : 250, mt: 20 }}
    >
      <FormTrigger to={`/${target}?action=new-host`} data={data}>
        <Button variant="default" children="New host" />
      </FormTrigger>
    </EmptyBox>
  );
};

export const HoverMenu = ({ table, target, data }) => {
  const _table = table.toLowerCase();
  const _target = target.toLowerCase();
  return (
    <HoverCard shadow="sm" withArrow arrowPosition="center" position="bottom-end" zIndex={290}>
      <HoverCard.Target>
        <ActionIcon size="lg" variant="default" color="gray">
          <Icon width={25} icon="tabler:menu-2" />
        </ActionIcon>
      </HoverCard.Target>
      <HoverCard.Dropdown miw={200}>
        <Stack gap={10}>
          <Text>
            {table} {target} #{data.id + 1}
          </Text>
          <FormTrigger to={`/${_table}?action=edit-${_target}`} data={data}>
            <Button fullWidth variant="default" leftSection={<Icon icon="tabler:edit" />}>
              Edit {_target}
            </Button>
          </FormTrigger>
          <FormTrigger to={`/${_table}?action=${data.enabled ? "disable" : "enable"}-${_target}`} data={data}>
            <Button
              fullWidth
              variant="default"
              leftSection={<Icon icon={data.enabled ? "tabler:pause" : "tabler:play"} />}
            >
              {data.enabled ? "Disable" : "Enable"} {_target}
            </Button>
          </FormTrigger>
          <FormTrigger to={`/${_table}?action=delete-${_target}`} data={data}>
            <Button fullWidth color="red" leftSection={<Icon icon="tabler:trash" />}>
              Delete {_target}
            </Button>
          </FormTrigger>
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
