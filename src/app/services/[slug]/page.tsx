import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { services } from "@/data/site";
import { PageIntro } from "@/components/sections";
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return {
    title: s?.title || "Service not found",
    description: s?.description,
  };
}
export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageIntro
        eyebrow="OUR SERVICES"
        title={service.title}
        description={service.description}
      />
      <section className="container content-section detail-layout">
        <div>
          <h2>Built around your business.</h2>
          <p style={{ marginTop: 22 }}>
            Every business has its own challenges. We work with you to define
            the requirements, choose a practical technical approach, and deliver
            a solution shaped around your users and goals.
          </p>
          <h3>How we can help</h3>
          <ul className="offering-list">
            {service.offerings.map((o) => (
              <li key={o}>
                <Check size={19} />
                {o}
              </li>
            ))}
          </ul>
          <h3>Tools & capabilities</h3>
          <div className="detail-tech">
            {service.tech.map((t) => (
              <span className="tech-pill" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p style={{ marginTop: 20, fontSize: 13 }}>
            The final technology stack and delivery scope are agreed during
            discovery.
          </p>
        </div>
        <aside className="detail-sidebar">
          <span className="eyebrow">LET’S MAKE IT HAPPEN</span>
          <h3>A good solution starts with a conversation.</h3>
          <p>
            Tell us what you want to achieve. We’ll help you explore the next
            steps, scope, and a practical path forward.
          </p>
          <Link className="button" href={"/contact?service=" + service.slug}>
            {service.cta}
          </Link>
          <Link
            style={{ display: "block", marginTop: 22 }}
            className="text-link"
            href="/services"
          >
            Explore all services
          </Link>
        </aside>
      </section>
    </>
  );
}
