import Head from "next/head";
import { cookies } from "next/headers";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import InstallScreen from "@c/InstallScreen";
import isInstalled from "@/actions/install/isInstalled";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@a/styles/globals.scss";

export const metadata = {
  title: "Dnsrpm",
  description: "DNS and reverse proxy manager.",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    fontFamily: "Open Sans, sans-serif",
    primaryColor: "yellow",
    defaultRadius: 5,
  });

  const Co = cookies();

  const installed = await isInstalled();

  return (
    <html lang="en">
      <Head>
        <ColorSchemeScript />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </Head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme={(Co.get("color-scheme")?.value as any) ?? "auto"}>
          {installed ? children : <InstallScreen />}
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
