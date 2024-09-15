"use client";
import { notifications } from "@mantine/notifications";
import { DefaultMantineColor, ThemeIcon } from "@mantine/core";
import { Icon, IconifyIcon } from "@iconify/react";

interface NotifyProps {
  title: React.ReactNode;
  message: React.ReactNode;
  color?: DefaultMantineColor;
  icon?: string | IconifyIcon;
}

const Notify = ({ title, message, color = null, icon }: NotifyProps) => {
  notifications.show({
    title,
    color,
    message,
    withBorder: true,
    autoClose: true,
    icon: icon ? (
      <ThemeIcon color={color} size="35px">
        <Icon style={{ width: "70%", height: "70%" }} icon={icon ?? "tabler:info-circle"} />
      </ThemeIcon>
    ) : null,
  });
};

export default Notify;
