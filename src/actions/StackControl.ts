"use server";
import { eq, sql } from "drizzle-orm";

import { withPromise } from "@u/withPromise";
import { dnsHosts, dnsStacks, proxyHosts, proxyStacks } from "@db/schema";
import { db } from "@db/index";

export const StackCreate = (table: "dns" | "proxy", data: { id?: number; name: string }) =>
  withPromise((resolve) => {
    const stack = table == "dns" ? dnsStacks : proxyStacks;
    db.insert(stack)
      .values({ name: data.name })
      .then(() => resolve({ ok: true, result: "Stack created successfully !" }))
      .catch((err) => {
        resolve({ ok: false, result: err.mesage });
      });
  });

export const StackUpdate = (table: "dns" | "proxy", data: { id: number; name: string }) =>
  withPromise((resolve) => {
    const stack = table == "dns" ? dnsStacks : proxyStacks;
    db.update(stack)
      .set({ name: data.name, updated: sql`CURRENT_TIMESTAMP` } as any)
      .where(eq(stack.id, data.id))
      .then((res: any) => {
        if (res.changes > 0) {
          resolve({ ok: true, result: "Stack updated successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      })
      .catch((err) => resolve({ ok: false, result: err.mesage }));
  });

export const StackToggle = (table: "dns" | "proxy", id: number, enabled: boolean) =>
  withPromise((resolve) => {
    const stack = table == "dns" ? dnsStacks : proxyStacks;
    db.update(stack)
      .set({ enabled, updated: sql`CURRENT_TIMESTAMP` } as any)
      .where(eq(stack.id, id))
      .then((res: any) => {
        if (res.changes > 0) {
          resolve({ ok: true, result: "Stack updated successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      });
  });

export const StackDel = (table: "dns" | "proxy", id: number) =>
  withPromise((resolve) => {
    const stack = table == "dns" ? dnsStacks : proxyStacks;
    const hosts = table == "dns" ? dnsHosts : proxyHosts;
    db.delete(stack)
      .where(eq(stack.id, id))
      .then(async (res: any) => {
        db.delete(hosts).where(eq(hosts.stackId, id));
        if (res.changes > 0) {
          resolve({ ok: true, result: "Stack deleted successfully !" });
        } else {
          resolve({ ok: false, result: "No changes !" });
        }
      })
      .catch((err) => resolve({ ok: false, result: err.mesage }));
  });
