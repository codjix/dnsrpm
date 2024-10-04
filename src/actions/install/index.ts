"use server";
import { sql } from "drizzle-orm";
import { settings, users } from "#db/schema";
import { _AppInstall } from "#/utils/validate.zod";
import RandomStr from "#/utils/RandomStr";
import { db } from "#db/index";

type $AppInstall = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const AppInstall = (data: $AppInstall) =>
  new Promise<{ ok: boolean; result: any }>(async (resolve) => {
    try {
      const values = _AppInstall.parse(data);
      const isInstalled = await db.query.settings.findFirst({
        where: (settings, { eq }) => eq(settings.key, "installed"),
      });
      if (!isInstalled) {
        const addAdmin = await db.insert(users).values({
          ...values,
          password: Bun.password.hashSync(values.password, "bcrypt"),
          token: RandomStr(36, "token_"),
          updated: new Date().toUTCString(),
        } as any);
        const installed = await db.insert(settings).values({
          key: "installed",
          value: { data: true },
        });
        resolve({ ok: true, result: { addAdmin, installed } });
      }
    } catch (error) {
      resolve({ ok: false, result: error.message });
    }
  });

export default AppInstall;
