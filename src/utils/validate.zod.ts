import { z } from "zod";

export const _AppInstall = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
  role: z.enum(["admin"]),
});

export const _AppLogin = z.object({
  email: z.string().email("Invalid email").min(6, "Email must be at least 6 characters"),
  password: z.string().min(10, "Password must be at least 10 characters"),
});

export const _FormInfo = {
  proxy_stack: {
    init: { name: "" },
    zod: z.object({ name: z.string().min(3, "Name must be at least 3 characters") }),
  },
  dns_stack: {
    init: { name: "" },
    zod: z.object({ name: z.string().min(3, "Name must be at least 3 characters") }),
  },
  proxy_host: {
    init: {
      domains: [],
      rewrites: [],
      targetProtocol: "http",
      targetHost: "",
      targetPort: 80,
      ws: false,
      isHttps: false,
      cert: "",
      key: "",
      conf: "",
    },
    zod: z.object({
      domains: z.array(z.string()).min(1, "One Domain is required"),
      targetProtocol: z.enum(["http", "https"]),
      targetHost: z.string().min(7, "Hostname must be at least 7 characters"),
      targetPort: z.number().min(1),
      ws: z.optional(z.boolean()),
      isHttps: z.optional(z.boolean()),
      cert: z.optional(z.string()),
      key: z.optional(z.string()),
      conf: z.optional(z.string()),
      rewrites: z.optional(
        z.array(
          z.object({
            path: z.string(),
            protocol: z.enum(["http", "https"]),
            host: z.string(),
            port: z.number().min(1),
            conf: z.optional(z.string()),
          })
        )
      ),
    }),
  },
  dns_host: {
    init: { domain: "", ip: "" },
    zod: z.object({
      domain: z.string().min(3, "Domain must be at least 3 characters"),
      ip: z.string().min(7, "Target IP must be at least 7 characters"),
    }),
  },
};
