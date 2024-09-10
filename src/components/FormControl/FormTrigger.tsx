"use client";
import { useContext } from "react";
import Link, { LinkProps } from "next/link";
import { Anchor, AnchorProps } from "@mantine/core";
import type { UrlObject } from "url";

import { FormControlCtx } from "./index";

type FormTriggerProps = {
  to: string | UrlObject;
  children: React.ReactNode;
  data?: any;
};

export const FormTrigger = ({ to, children, data }: FormTriggerProps) => {
  const setData = useContext(FormControlCtx);

  const props: LinkProps & AnchorProps = {
    onClick: () => setData(data ?? null),
    underline: "never",
    href: to,
  };

  return (
    <Anchor component={Link} {...props}>
      {children}
    </Anchor>
  );
};

export default FormTrigger;
