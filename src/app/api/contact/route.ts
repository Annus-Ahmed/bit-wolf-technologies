import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { allowContact } from "@/lib/rate-limit";
import { company, services } from "@/data/site";
export const runtime = "nodejs";
const error = (message: string, status: number) =>
  NextResponse.json({ error: message }, { status });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const expected = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).origin
    : new URL(
        new URL(request.url).protocol +
          "//" +
          (request.headers.get("host") || new URL(request.url).host),
      ).origin;
  if (origin && origin !== expected)
    return error("This request origin is not permitted.", 403);
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return error("Expected a JSON enquiry.", 415);
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return error("Please complete the enquiry form.", 400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) {
        await reader.cancel();
        return error("Your enquiry is too large.", 413);
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return error("Please provide a valid enquiry.", 400);
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return error(parsed.error.issues[0].message, 400);
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.EMAIL_FROM;
  if (!key || !to || !from)
    return error(
      `Email enquiries are being set up. Please call ${company.phone} or contact us on WhatsApp.`,
      503,
    );
  try {
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "local";
    if (!(await allowContact(ip)))
      return NextResponse.json(
        {
          error:
            "Too many enquiries. Please try again in 10 minutes or use WhatsApp.",
        },
        { status: 429, headers: { "Retry-After": "600" } },
      );
  } catch {
    return error(
      "The enquiry service is temporarily unavailable. Please use WhatsApp or call us.",
      503,
    );
  }
  const d = parsed.data;
  const title =
    services.find((s) => s.slug === d.service)?.title || "Other / Not Sure";
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + key,
        "Content-Type": "application/json",
        "Idempotency-Key": "enquiry/" + d.requestId,
      },
      signal: AbortSignal.timeout(12000),
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: d.email,
        subject: "New BIT-WOLF enquiry: " + title,
        text: [
          "Name: " + d.name,
          "Company: " + (d.company || "Not provided"),
          "Email: " + d.email,
          "Phone: " + (d.phone || "Not provided"),
          "Service: " + title,
          "Budget (USD): " + (d.budget || "Not specified"),
          "Preferred contact: " + d.preferred,
          "Consent to contact: Yes",
          "",
          "Project description:",
          d.message,
        ].join("\n"),
      }),
    });
    if (!response.ok)
      return error(
        "We couldn’t send your enquiry. Please try again or contact us on WhatsApp.",
        502,
      );
    const result = await response.json();
    if (!result.id)
      return error(
        "Email confirmation was unavailable. Please contact us on WhatsApp.",
        502,
      );
    return NextResponse.json({ success: true });
  } catch {
    return error(
      "The email service could not be reached. Please try again or use WhatsApp.",
      502,
    );
  }
}
