import { db } from "#db/index";
import { proxyHosts } from "#db/schema";
import session from "./auth/session";

type DnsProps = typeof proxyHosts.$inferSelect;
type ProxyProps = typeof proxyHosts.$inferSelect;
type CreateProps<T> = T extends "dns" ? DnsProps : T extends "proxy" ? ProxyProps : never;

export const CreateHost = <T extends "dns" | "proxy">(table: T, prop: CreateProps<T>) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      const user = await session();
      if (!user) throw new Error("Not authentcated");
      
      //logic
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });

export const UpdateHost = (table: "dns" | "proxy", id: number) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      //logic
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });

export const DelHost = (table: "dns" | "proxy", id: number) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      //logic
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });

export const ToggleHost = (table: "dns" | "proxy", id: number) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      //logic
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });
