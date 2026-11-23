import { z } from "zod";
import { services } from "@/data/site";
export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name.").max(100),
    company: z.string().trim().max(160).optional().default(""),
    email: z.email("Please enter a valid email address.").max(254),
    phone: z
      .string()
      .trim()
      .max(40)
      .refine(
        (v) => !v || /^[+\d\s().-]{7,40}$/.test(v),
        "Please enter a valid phone number.",
      )
      .optional()
      .default(""),
    service: z
      .string()
      .refine(
        (v) => [...services.map((s) => s.slug), "other"].includes(v),
        "Please choose a service.",
      ),
    budget: z
      .enum([
        "",
        "discuss",
        "under-1000",
        "1000-5000",
        "5000-15000",
        "15000-plus",
      ])
      .optional()
      .default(""),
    message: z
      .string()
      .trim()
      .min(20, "Please tell us a little more (at least 20 characters).")
      .max(5000),
    preferred: z.enum(["Email", "Phone", "WhatsApp"]),
    consent: z.literal(true, { error: "Please consent to being contacted." }),
    website: z.string().max(0, "Unable to submit this enquiry."),
    requestId: z.uuid(),
  })
  .superRefine((v, ctx) => {
    if (v.preferred !== "Email" && !v.phone) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message:
          "Please add your phone number for your preferred contact method.",
      });
    }
  });
export type ContactInput = z.infer<typeof contactSchema>;
