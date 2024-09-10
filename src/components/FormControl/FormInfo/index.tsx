"use client";
import { useForm } from "@mantine/form";
import { Box, Button, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zodResolver } from "mantine-form-zod-resolver";

import useTrans from "#h/useTrans";
import { _FormInfo } from "#/utils/validate.zod";
import { useRouter } from "next/navigation";

type $FormInfo = {
  table: "proxy" | "dns";
  target: "stack" | "host";
  action?: "new" | "edit" | any;
  data?: any;
};

const FormInfo = ({ table, target, action, data }: $FormInfo) => {
  const router = useRouter();
  const formOpts = _FormInfo[table + "_" + target];
  const Form = useForm({
    initialValues: data ?? formOpts.init,
    validate: zodResolver(formOpts.zod),
  });

  const { start, loading } = useTrans(({ values }) => {
    console.log({ values });
    if (action == "edit") router.push("/" + table);
    Form.reset();
  });

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} />
      <form onSubmit={Form.onSubmit(start)}>
        <Stack gap={10} mt={10}>
          {target == "stack" && (
            <TextInput label={[target, "name"].join(" ")} placeholder="ex: website" {...Form.getInputProps("name")} />
          )}
          {target == "host" && (
            <>
              {table == "dns" && <>dns host form</>}
              {table == "proxy" && <>proxy host form</>}
            </>
          )}
          <Button type="submit">{action == "new" ? "Create" : "Update"}</Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormInfo;
