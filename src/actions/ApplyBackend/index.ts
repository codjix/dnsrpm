"use server";
import { withPromise } from "#/utils/withPromise";
import GetAllStacks from "../GetStacks";

const ApplyBackEnd = () =>
  withPromise(async (resolve) => {
    const targetDir = process.env.DATA_DIR;
    const stacks = await GetAllStacks("expand", true);
    resolve({ ok: true, result: stacks });
  });

export default ApplyBackEnd;
