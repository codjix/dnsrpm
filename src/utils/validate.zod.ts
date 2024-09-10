import { dnsHosts, proxyHosts } from "#db/schema";
import { createInsertSchema } from "drizzle-zod";
import zod from "zod";

export const _AppInstall = zod.object({
  name: zod.string().min(3, "Name must be at least 3 characters"),
  email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: zod.string().min(10, "Password must be at least 10 characters"),
  role: zod.enum(["admin"]),
});

export const _AppLogin = zod.object({
  email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: zod.string().min(10, "Password must be at least 10 characters"),
});

export const _FormInfo = {
  proxy_stack: {
    init: { name: "" },
    zod: zod.object({ name: zod.string().min(3, "Name must be at least 3 characters") }),
  },
  dns_stack: {
    init: { name: "" },
    zod: zod.object({ name: zod.string().min(3, "Name must be at least 3 characters") }),
  },
  proxy_host: {
    init: {},
    zod: createInsertSchema(proxyHosts, {
      domains: zod.array(zod.string().min(3, "Domain must be at least 3 characters")).min(1, "One Domain is required"),
      key: zod.string().min(100, "invalid key"),
    }),
  },
  dns_host: {
    init: {},
    zod: createInsertSchema(dnsHosts, {
      domain: zod.string().min(3, "Domain must be at least 3 characters"),
    }),
  },
};
