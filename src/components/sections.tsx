import Link from "next/link";
import Image from "next/image";
import { ContactGlobeHero } from "./contact-globe-hero";
import { services, industries, process } from "@/data/site";
import { Icon } from "./icon";
import { Reveal } from "./motion";
export function SectionHeading({
  eyebrow,
  title,
  description,
  link,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  link?: [string, string];
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {link && (
        <Link className="text-link" href={link[1]}>
          {link[0]} <span aria-hidden="true">↗</span>
        </Link>
      )}
    </Reveal>
  );
}
export function ServiceCards() {
  return (
    <div className="services-grid">
      {services.map((s, i) => (
        <Link
          className="service-card"
          href={"/services/" + s.slug}
          key={s.slug}
        >
          <div className="service-card-top">
            <span className="icon-box">
              <Icon name={s.icon} />
            </span>
            <span className="card-mark" aria-hidden="true">
              ↗
            </span>
          </div>
          <span className="service-label">
            {["BUILD", "UNDERSTAND", "CONNECT", "SIMPLIFY", "SCALE"][i]}
          </span>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <div className="service-tags">
            {s.offerings.slice(0, 2).map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <span className="learn-more">Explore service</span>
        </Link>
      ))}
    </div>
  );
}
export function IndustryCards() {
  return (
    <div className="industry-grid">
      {industries.map(([title, description, icon]) => (
        <article className="industry-card" key={title}>
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
export function ProcessSteps({ compact = false }: { compact?: boolean }) {
  return (
    <div className={"process-grid " + (compact ? "compact" : "")}>
      {process.map(([name, description], i) => (
        <article className="process-step" key={name}>
          <span className="step-number">0{i + 1}</span>
          <h3>{name}</h3>
          <p>{description}</p>
        </article>
      ))}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
  background,
}: {
  eyebrow: string;
  title: string;
  description: string;
  background?: "about" | "services" | "portfolio" | "commercials" | "contact";
}) {
  return (
    <section
      className={`page-intro container${background ? " page-intro--illustrated" : ""}`}
    >
      {background && (
        <div
          className={`page-intro-backdrop page-intro-backdrop--${background}`}
          aria-hidden="true"
        >
          {background === "contact" ? (
            <ContactGlobeHero />
          ) : (
            <Image
              src={`/images/heroes/${background}.webp`}
              alt=""
              fill
              sizes="100vw"
              preload
              className="page-intro-image"
            />
          )}
          <div className="page-intro-shade" />
        </div>
      )}
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="intro-rule" />
    </section>
  );
}
