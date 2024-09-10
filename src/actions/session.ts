"use server";
import { cookies } from "next/headers";
import { db } from "#db/index";

const session = async () => {
  const Co = cookies();
  const token = Co.get("token");

  var user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.token, token.value),
  });
  delete user?.password;
  delete user?.token;
  return user;
};

export default session;
