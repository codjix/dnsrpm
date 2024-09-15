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
import { useRouter } from "next/navigation";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { Icon } from "@iconify/react";
import Cookies from "universal-cookie";
import zod from "zod";

import AppLogin from "#/actions/auth/login";
import classes from "./styles.module.scss";
import logo from "#a/images/logo.svg";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const Co = new Cookies(null, { path: "/", maxAge: 60 * 60 * 24 });
  const router = useRouter();

  const Form = useForm({
    initialValues: { email: "", password: "" },
    validate: zodResolver(
      zod.object({
        email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
        password: zod.string().min(10, "Password must be at least 10 characters"),
      })
    ),
  });

  const handleSubmit = async (e: any) => {
    setError(null);
    setLoading(true);
    try {
      AppLogin(e)
        .then((res) => {
          if (res.ok) {
            Co.set("token", res.result);
            router.push("/");
            router.refresh();
          } else {
            setError(res.result);
            setLoading(false);
          }
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error.message);
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
              <Text c="dimmed" size="sm">
                v1.0.0
              </Text>
            </Flex>
            <Stack>
              <Box>
                <Title order={4}>Admin Login</Title>
                <Text c="dimmed">Please login to access the dashboard</Text>
              </Box>
              {error && <Alert variant="light" color="red" title={error} icon={<Icon icon="tabler:info-circle" />} />}
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
                Login
              </Button>
            </Stack>
          </Box>
        </Card>
        <br />
      </Box>
    </>
  );
};

export default page;
