"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";

const page = () => {
  const router = useRouter();
  const Co = new Cookies(null, { path: "/" });
  useEffect(() => {
    Co.remove("token");
    router.push("/auth/login");
  }, []);
  return <></>;
};

export default page;
