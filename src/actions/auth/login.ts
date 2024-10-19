"use server";
import { eq, sql } from "drizzle-orm";
import RandomStr from "#/utils/RandomStr";
import isInstalled from "../install/isInstalled";
import { _AppLogin } from "#/utils/validate.zod";
import { users } from "#db/schema";
import { db } from "#db/index";

type $AppLogin = {
  email: string;
  password: string;
};

const AppLogin = (data: $AppLogin) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      const credentials = _AppLogin.parse(data);
      const installed = await isInstalled();
      if (!installed) throw new Error("App not installed, but how ?.");

      var user = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, credentials.email),
      });
      if (!user) throw new Error("Email not found.");

      const validPass = Bun.password.verifySync(
        credentials.password,
        user.password,
        "bcrypt"
      );
      if (!validPass) throw new Error("Invalid password.");

      const token = RandomStr(36, "token_");
      db.update(users)
        .set({ token, updated: sql`CURRENT_TIMESTAMP` } as any)
        .where(eq(users.email, credentials.email))
        .then(() => resolve({ ok: true, result: token }))
        .catch((err) => resolve({ ok: false, result: err.message }));
    } catch (error) {
      resolve({ ok: false, result: error.message });
    }
  });

export default AppLogin;
