"use client";
import { Icon } from "@iconify/react";
import { CopyButton, ActionIcon, Tooltip } from "@mantine/core";

const CopyBtn = ({ value }) => {
  return (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow position="right">
          <ActionIcon color={copied ? "teal" : "gray"} variant="subtle" onClick={copy}>
            <Icon icon={copied ? "tabler:check" : "tabler:copy"} />
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyBtn;
