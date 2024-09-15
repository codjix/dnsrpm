"use client";

import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type $DnsForm = {
  Form: UseFormReturnType<Record<string, unknown>, (values: Record<string, unknown>) => Record<string, unknown>>;
};
const DnsForm = ({ Form }: $DnsForm) => {
  return (
    <>
      <TextInput label="Domain" placeholder="ex: example.com" withAsterisk {...Form.getInputProps("domain")} />
      <TextInput label="Target IP" placeholder="ex: 172.0.0.2" withAsterisk {...Form.getInputProps("ip")} />
    </>
  );
};

export default DnsForm;
