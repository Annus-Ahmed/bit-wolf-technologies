"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { services } from "@/data/site";
import { contactSchema } from "@/lib/contact";
import { formatContactPhone, phoneCountries } from "@/lib/phone";
export function ContactForm({ initialService }: { initialService: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const requestId = useRef("");
  const pending = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const country =
      phoneCountries.find((option) => option.country === data.phoneCountry)
        ?.country || "PK";
    const phone = formatContactPhone(String(data.phone || ""), country);
    if (phone === null) {
      setState("error");
      setMessage(
        "Please enter a valid phone number for the selected country code.",
      );
      return;
    }
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const parsed = contactSchema.safeParse({
      ...data,
      phone,
      consent: data.consent === "on",
      requestId: requestId.current,
    });
    if (!parsed.success) {
      setState("error");
      setMessage(parsed.error.issues[0].message);
      return;
    }
    pending.current = true;
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.error || "Your enquiry could not be sent. Please try again.",
        );
      setState("success");
      setMessage(
        "Thank you! Your enquiry has been sent. The BIT-WOLF team will be in touch using your preferred contact method.",
      );
      form.reset();
      requestId.current = "";
    } catch (e) {
      setState("error");
      setMessage(
        e instanceof Error
          ? e.message
          : "A connection error occurred. Please try again or contact us on WhatsApp.",
      );
    } finally {
      pending.current = false;
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label className="form-field">
          Full name *
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Your full name"
          />
        </label>
        <label className="form-field">
          Business / company
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Company name (optional)"
          />
        </label>
        <label className="form-field">
          Email address *
          <input
            name="email"
            autoComplete="email"
            type="email"
            required
            maxLength={254}
            placeholder="you@company.com"
          />
        </label>
        <div className="form-field">
          <label htmlFor="contact-phone">Phone / WhatsApp</label>
          <div className="phone-input-group">
            <select
              name="phoneCountry"
              aria-label="Country calling code"
              autoComplete="tel-country-code"
              defaultValue="PK"
            >
              {phoneCountries.map(({ country, name, callingCode }) => (
                <option key={country} value={country}>
                  {name} (+{callingCode})
                </option>
              ))}
            </select>
            <input
              id="contact-phone"
              name="phone"
              autoComplete="tel-national"
              type="tel"
              inputMode="tel"
              maxLength={40}
              placeholder="Phone number"
            />
          </div>
        </div>
        <label className="form-field">
          Service required *
          <select name="service" required defaultValue={initialService}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value="other">Other / Not Sure</option>
          </select>
        </label>
        <label className="form-field">
          Estimated budget (USD)
          <select name="budget" defaultValue="">
            <option value="">Select a range (optional)</option>
            <option value="discuss">Let’s discuss</option>
            <option value="under-1000">Under $1,000</option>
            <option value="1000-5000">$1,000 – $5,000</option>
            <option value="5000-15000">$5,000 – $15,000</option>
            <option value="15000-plus">$15,000+</option>
          </select>
        </label>
        <label className="form-field full">
          Tell us about your project *
          <textarea
            name="message"
            required
            minLength={20}
            maxLength={5000}
            placeholder="What would you like to build? Tell us about your idea, goals, and any timeline you have in mind."
          />
        </label>
        <label className="form-field full">
          Preferred contact method *
          <select name="preferred" defaultValue="Email" required>
            <option>Email</option>
            <option>Phone</option>
            <option>WhatsApp</option>
          </select>
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to be contacted about my enquiry and have read the{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </span>
      </label>
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending your enquiry…" : "Send Project Enquiry"}
      </button>
      <p className="form-note">
        A conversation is the first step. No commitment required.
      </p>
      {message && (
        <div
          role={state === "error" ? "alert" : "status"}
          className={"form-status " + (state === "success" ? "success" : "")}
        >
          {message}
        </div>
      )}
    </form>
  );
}
