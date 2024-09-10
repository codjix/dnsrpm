"use client";
import { useForm } from "@mantine/form";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";
import zod from "zod";

import useTrans from "#h/useTrans";
import { CreateStack, UpdateStack } from "#/actions/StackControl";
import { CreateHost, UpdateHost } from "#/actions/HostControl";
import { FormInfoSchema } from "#/utils/validate.zod";

type FormInfoProps = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: "new" | "edit" | any;
  data?: any;
};

const FormInfo = ({ table, target, action, data }: FormInfoProps) => {
  const hostAction = action == "new" ? CreateHost : UpdateHost;
  const stackAction = action == "new" ? CreateStack : UpdateStack;
  const srvAction = target == "host" ? hostAction : stackAction;

  const Form = useForm({
    initialValues: data ?? {},
    validate: zodResolver(FormInfoSchema[table + "_" + target]),
  });

  const { start, loading, error } = useTrans(async ({ args, setLoading }) => {
    console.log(args);
    setLoading(false);
    Form.reset();
  });
  return (
    <Box component="form" onSubmit={Form.onSubmit(start)}>
      <Stack gap={10}>
        <TextInput label={[target, "name"].join(" ")} placeholder="ex: website" {...Form.getInputProps("name")} />
        <Button type="submit">{action == "new" ? "Create" : "Update"}</Button>
      </Stack>
    </Box>
  );
};

export default FormInfo;
