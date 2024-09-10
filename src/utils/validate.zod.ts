import { dnsHosts, proxyHosts } from "#db/schema";
import { createInsertSchema } from "drizzle-zod";
import zod from "zod";

export const installSchema = zod.object({
  name: zod.string().min(3, "Name must be at least 3 characters"),
  email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: zod.string().min(10, "Password must be at least 10 characters"),
  role: zod.enum(["admin"]),
});

export const loginSchema = zod.object({
  email: zod.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: zod.string().min(10, "Password must be at least 10 characters"),
});

export const FormInfoSchema = {
  proxy_stack: zod.object({ name: zod.string() }),
  dns_stack: zod.object({ name: zod.string() }),
  proxy_host: createInsertSchema(proxyHosts),
  dns_host: createInsertSchema(dnsHosts),
};
