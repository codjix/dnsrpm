"use server";
import { eq, sql } from "drizzle-orm";

import { withPromise } from "#/utils/withPromise";
import { dnsHosts, proxyHosts } from "#db/schema";
import { db } from "#db/index";

type DnsProps = typeof dnsHosts.$inferSelect;
type ProxyProps = typeof proxyHosts.$inferSelect;
type HostProps<T> = T extends "dns"
  ? DnsProps
  : T extends "proxy"
  ? ProxyProps
  : never;

export const HostCreate = <T extends "dns" | "proxy">(
  table: T,
  prop: HostProps<T>
) =>
  withPromise((resolve) => {
    const hosts = table == "dns" ? dnsHosts : proxyHosts;
    db.insert(hosts)
      .values(prop)
      .then(() => {
        resolve({ ok: true, result: "Host created successfully !" });
      })
      .catch((error) => {
        resolve({ ok: false, result: error.mesage });
      });
  });

export const HostUpdate = <T extends "dns" | "proxy">(
  table: T,
  prop: HostProps<T>
) =>
  withPromise((resolve) => {
    const hosts = table == "dns" ? dnsHosts : proxyHosts;
    db.update(hosts)
      .set({ ...prop, updated: sql`CURRENT_TIMESTAMP` })
      .where(eq(hosts.id, prop.id))
      .then((res: any) => {
        if (res.changes > 0) {
          resolve({ ok: true, result: "Host updated successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      })
      .catch((error) => resolve({ ok: false, result: error.mesage }));
  });

export const HostToggle = (
  table: "dns" | "proxy",
  id: number,
  enabled: boolean
) =>
  withPromise((resolve) => {
    const hosts = table == "dns" ? dnsHosts : proxyHosts;
    db.update(hosts)
      .set({ enabled, updated: sql`CURRENT_TIMESTAMP` })
      .where(eq(hosts.id, id))
      .then((res: any) => {
        if (res.changes > 0) {
          resolve({ ok: true, result: "Host updated successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      })
      .catch((error) => resolve({ ok: false, result: error.mesage }));
  });

export const HostDel = (table: "dns" | "proxy", id: number) =>
  withPromise((resolve) => {
    const hosts = table == "dns" ? dnsHosts : proxyHosts;
    db.delete(hosts)
      .where(eq(hosts.id, id))
      .then((res: any) => {
        if (res.changes > 0) {
          resolve({ ok: true, result: "Host deleted successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      })
      .catch((error) => resolve({ ok: false, result: error.mesage }));
  });
