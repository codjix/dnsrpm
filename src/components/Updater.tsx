"use client";

import { Button } from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";

const Updater = () => {
  const force = useForceUpdate();
  return <Button onClick={force}>Updater</Button>;
};

export default Updater;
