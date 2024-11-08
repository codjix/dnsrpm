"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Alert, Box, Button, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import DnsForm from "./DnsForm";
import ProxyForm from "./ProxyForm";
import { _FormInfo } from "@u/validate.zod";
import { StackCreate, StackUpdate } from "@/actions/StackControl";
import Notify from "@h/Notify";
import { HostCreate, HostUpdate } from "@/actions/HostControl";

type $FormInfo = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: "new" | "edit" | any;
  data?: any;
};

const FormInfo = ({ table, target, action, data }: $FormInfo) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formOpts = _FormInfo[table + "_" + target];
  const Form = useForm({
    initialValues: data ?? formOpts.init,
    validate: zodResolver(formOpts.zod),
  });

  const handleSubmit = async (values: any) => {
    setError(null);
    setLoading(true);
    try {
      if (target == "stack") {
        const srvAction = action == "new" ? StackCreate : StackUpdate;
        srvAction(table, { id: values.id, name: values.name }).then(({ ok, result }) => {
          if (ok) {
            router.push("/" + table);
            router.refresh();
            Notify({ title: "Success", color: "green", message: result, icon: "tabler:check" });
          } else Notify({ title: "Error !", color: "red", message: result, icon: "tabler:x" });
        });
      } else {
        const srvAction = action == "new" ? HostCreate : HostUpdate;
        srvAction(table, { ...values, stackId: data.stackId }).then(({ ok, result }) => {
          if (ok) {
            router.push("/" + table);
            router.refresh();
            Notify({ title: "Success", color: "green", message: result, icon: "tabler:check" });
          } else {
            Notify({ title: "Error !", color: "red", message: result, icon: "tabler:x" });
          }
        });
      }
      if (action == "edit") {
        router.push("/" + table);
        router.refresh();
      }
      setLoading(false);
      Form.reset();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />
      <form onSubmit={Form.onSubmit(handleSubmit)}>
        <Stack gap={10} mt={10}>
          {error && <Alert variant="light" color="red" title={error} icon={<Icon icon="tabler:info-circle" />} />}
          {target == "stack" && (
            <TextInput label="Stack name" placeholder="ex: website" {...Form.getInputProps("name")} />
          )}
          {target == "host" && (table == "dns" ? <DnsForm Form={Form} /> : <ProxyForm Form={Form} />)}
          <Button type="submit" onClick={() => (Form.isValid ? setError(null) : setError("Form is not valid !"))}>
            {action == "new" ? "Create" : "Update"}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormInfo;
