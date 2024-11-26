"use server";
import { cookies } from "next/headers";
import { db } from "@db/index";

const session = async () => {
  const Co = cookies();
  const token = Co.get("token");
  const where = (users: Record<string, any>, { eq }) => eq(users.token, token.value);
  var user = await db.query.users.findFirst({ where });
  delete user?.password;
  delete user?.token;
  return user;
};

export default session;
