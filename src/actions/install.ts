"use server";
import { sql } from "drizzle-orm";
import { settings, users } from "#db/schema";
import { installSchema } from "#/utils/validate.zod";
import RandomStr from "#/utils/RandomStr";
import { db } from "#db/index";

type InstallProps = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const AppInstall = (data: InstallProps) =>
  new Promise<{ ok: boolean; result: any }>(async (resolve) => {
    try {
      const values = installSchema.parse(data);
      const isInstalled = await db.query.settings.findFirst({
        where: (settings, { eq }) => eq(settings.key, "installed"),
      });
      if (!isInstalled) {
        const addAdmin = await db.insert(users).values({
          ...values,
          password: Bun.password.hashSync(values.password, "bcrypt"),
          token: RandomStr(36, "token_"),
          updated: sql`(CURRENT_TIMESTAMP)`,
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
