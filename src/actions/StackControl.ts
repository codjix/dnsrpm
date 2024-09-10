import { eq } from "drizzle-orm";
import { dnsStacks, proxyStacks } from "#db/schema";
import { db } from "#db/index";

export const CreateStack = (target: "dns" | "proxy", name: string) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      const stack = target == "dns" ? dnsStacks : proxyStacks;
      db.insert(stack)
        .values({ name })
        .then(() => resolve({ ok: true, result: "Stack created successfully !" }))
        .catch((err) => {
          const result = String(err.message).startsWith("UNIQUE") ? "Stack already exist !" : err.mesage;
          resolve({ ok: false, result });
        });
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });

export const UpdateStack = (target: "dns" | "proxy", id: number, name: string) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      const stack = target == "dns" ? dnsStacks : proxyStacks;
      db.update(stack)
        .set({ name })
        .where(eq(stack.id, id))
        .then((res: any) => {
          if (res.changes > 0) {
            resolve({ ok: true, result: "Stack updated successfully !" });
          } else {
            resolve({ ok: false, result: "No changes !" });
          }
        })
        .catch((err) => resolve({ ok: false, result: err.mesage }));
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });

export const DelStack = (target: "dns" | "proxy", id: number) =>
  new Promise<{ ok: boolean; result: any | string }>(async (resolve) => {
    try {
      const stack = target == "dns" ? dnsStacks : proxyStacks;
      db.delete(stack)
        .where(eq(stack.id, id))
        .then((res: any) => {
          if (res.changes > 0) {
            resolve({ ok: true, result: "Stack deleted successfully !" });
          } else {
            resolve({ ok: false, result: "No changes !" });
          }
        })
        .catch((err) => resolve({ ok: false, result: err.mesage }));
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });
