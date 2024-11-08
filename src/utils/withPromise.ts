import session from "@/actions/auth/session";

export type $resolve = (result: { ok: boolean; result: any }) => void;
export const withPromise = (callback: (r: $resolve) => void) =>
  new Promise<{ ok: boolean; result: any }>(async (resolve) => {
    try {
      const user = await session();
      if (!user) throw new Error("Not authentcated");
      callback(resolve);
    } catch (error) {
      resolve({ ok: false, result: error.mesage });
    }
  });
