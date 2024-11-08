"use server";
import { db } from "@db/index";

const isInstalled = async () => {
  return await db.query.settings.findFirst({
    where: (settings, { eq }) => eq(settings.key, "installed"),
  });
};

export default isInstalled;
