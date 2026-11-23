import type { Metadata } from "next";
import { PageIntro, SectionHeading } from "@/components/sections";
export const metadata: Metadata = { title: "About Us" };
export default function About() {
  return (
    <>
      <PageIntro
        eyebrow="MEET BIT-WOLF"
        title="Engineering the Digital Future."
        description="We believe technology should simplify challenges, create opportunities, and deliver meaningful business outcomes."
      />
      <section className="container content-section">
        <div className="two-col">
          <div>
            <h2>
              Big ideas.
              <br />
              Thoughtful engineering.
            </h2>
            <p style={{ marginTop: 24 }}>
              BIT-WOLF Technologies is an emerging software development company
              focused on helping businesses navigate digital transformation
              through modern, scalable, and reliable technology.
            </p>
            <p>
              Our expertise spans web and software development, mobile
              applications, data analytics, business automation, and cloud
              solutions.
            </p>
            <p>
              Based in Pakistan and open to working internationally, we approach
              every project with curiosity, care, and a commitment to clear
              communication.
            </p>
          </div>
          <div style={{ display: "grid", gap: 20 }}>
            <article className="content-block">
              <h2>Our mission</h2>
              <p>
                To empower businesses with innovative, reliable, and accessible
                software solutions that solve real-world problems and support
                sustainable digital growth.
              </p>
            </article>
            <article className="content-block">
              <h2>Our vision</h2>
              <p>
                To build BIT-WOLF Technologies into a trusted technology partner
                recognized for quality engineering, innovation, and long-term
                client relationships.
              </p>
            </article>
          </div>
        </div>
        <div style={{ marginTop: 65 }}>
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="Good technology starts with good principles."
          />
          <div className="values">
            {[
              "Innovation",
              "Integrity",
              "Quality",
              "Collaboration",
              "Transparency",
              "Continuous Learning",
              "Client Success",
            ].map((v) => (
              <span key={v}>{v}</span>
            ))}
          </div>
          <SectionHeading
            eyebrow="THE PEOPLE BEHIND THE PURPOSE"
            title="Meet the people behind BIT-WOLF."
            description="Two co-founders. A shared ambition to build technology with meaning."
          />
          <div className="founder-grid">
            {[
              ["Umer Abbas", "UA"],
              ["Annus Ahmed", "AA"],
            ].map(([name, initials]) => (
              <article className="founder-card" key={name}>
                <span className="founder-monogram" aria-hidden="true">
                  {initials}
                </span>
                <h3>{name}</h3>
                <p>Co-Founder</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
