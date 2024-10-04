"use client";
import { Icon } from "@iconify/react";
import { Tooltip, ActionIcon } from "@mantine/core";
import ApplyBackEnd from "#/actions/ApplyBackend";

const SaveChanges = () => {
  const handleSave = () => {
    ApplyBackEnd().then(console.log);
  };
  return (
    <Tooltip label="Save Changes" position="bottom-end">
      <ActionIcon variant="subtle" color="gray" size="xl" onClick={handleSave}>
        <Icon width={25} icon="fluent:save-arrow-right-24-regular" />
      </ActionIcon>
    </Tooltip>
  );
};

export default SaveChanges;
