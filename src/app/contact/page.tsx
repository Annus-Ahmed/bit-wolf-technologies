import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { ContactForm } from "@/components/contact-form";
import { company, services } from "@/data/site";
export const metadata: Metadata = { title: "Contact Us" };
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const selected = services.some((s) => s.slug === service) ? service! : "";
  return (
    <>
      <PageIntro
        background="contact"
        eyebrow="LET’S BUILD SOMETHING EXCEPTIONAL"
        title="Great things start with a conversation."
        description="Have a project in mind? Tell us about your idea, business challenge, or software requirements. We’d love to explore what’s possible together."
      />
      <section className="container content-section contact-grid">
        <aside className="contact-info">
          <h2>
            Your next idea.
            <br />
            Our next conversation.
          </h2>
          <p>
            Talk directly with the BIT-WOLF team about your project and the best
            way forward.
          </p>
          <div className="contact-method">
            <small>GIVE US A CALL</small>
            <a href={"tel:" + company.tel}>{company.phone}</a>
          </div>
          <div className="contact-method">
            <small>BASED IN PAKISTAN</small>
            <p>Open to projects in Pakistan and internationally.</p>
          </div>
          <div className="contact-method">
            <small>THE FOUNDERS</small>
            <p>Umer Abbas & Annus Ahmed</p>
          </div>
          <a
            className="button button-outline"
            href={company.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer WhatsApp? Let’s Chat
          </a>
        </aside>
        <ContactForm initialService={selected} />
      </section>
    </>
  );
}
