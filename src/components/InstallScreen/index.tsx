"use client";
import { useState } from "react";
import {
  Button,
  Card,
  LoadingOverlay,
  Title,
  Flex,
  Stack,
  TextInput,
  PasswordInput,
  Box,
  Image,
  Text,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { Icon } from "@iconify/react";
import zod from "zod";

import logo from "@a/images/logo.svg";
import classes from "./styles.module.scss";
import AppInstall from "@/actions/install";

const InstallScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Form = useForm({
    initialValues: { name: "", email: "", password: "", role: "admin" },
    validate: zodResolver(
      zod.object({
        name: zod.string().min(3, "Name must be at least 3 characters"),
        email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
        password: zod.string().min(10, "Password must be at least 10 characters"),
        role: zod.enum(["admin"]),
      })
    ),
  });

  const handleSubmit = async (e: any) => {
    setError(null);
    setLoading(true);
    try {
      AppInstall(e).then((res) => {
        if (res.ok) {
          location.reload();
        } else {
          setError(res.result);
        }
      });
    } catch (error) {
      setError(error.mesage);
      setLoading(false);
    }
  };

  return (
    <>
      <Box className={classes.container} p={20}>
        <Card component="form" onSubmit={Form.onSubmit(handleSubmit)} withBorder shadow="sm" pos="relative" w="100%">
          <LoadingOverlay visible={loading} />
          <Box className={classes.box}>
            <Flex align="center" justify="center" direction="column">
              <Image w={200} src={logo.src} />
              <Title order={2}>DNSRPM</Title>
              <Text c="dimmed">DNS & Reverse Proxy</Text>
            </Flex>
            <Stack>
              <Title order={4}>Create Admin Acount</Title>
              {error && (
                <Alert variant="light" color="red" title={error} icon={<Icon icon="tabler:info-circle" />} />
              )}
              <TextInput
                label="Name"
                variant="filled"
                placeholder="ex: Mohamed"
                {...Form.getInputProps("name")}
                withAsterisk
              />
              <TextInput
                label="Email"
                variant="filled"
                placeholder="Ex: user@domain.tld"
                {...Form.getInputProps("email")}
                withAsterisk
              />
              <PasswordInput
                label="Password"
                variant="filled"
                placeholder="Enter password"
                {...Form.getInputProps("password")}
                withAsterisk
              />
              <Button loading={loading} h="40px" w="120px" type="submit" rightSection={<Icon icon="tabler:send-2" />}>
                Create
              </Button>
            </Stack>
          </Box>
        </Card>
        <br />
      </Box>
    </>
  );
};

export default InstallScreen;
