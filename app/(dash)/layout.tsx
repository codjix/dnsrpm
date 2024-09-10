import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import session from "#/actions/auth/session";
import LayoutX from "#c/LayoutX";

const DashLayout = async ({ children }) => {
  const Co = cookies();

  const user = await session();
  if (!user) redirect("/auth/logout");

  return (
    <>
      <LayoutX {...{ children, user, wideOpen: Co.get("wide-open")?.value }} />
    </>
  );
};

export default DashLayout;
