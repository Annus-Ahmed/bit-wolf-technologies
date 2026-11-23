import Link from "next/link";
import {
  Check,
  Globe2,
  Code2,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DeviceScene } from "@/components/device-scene";
import { Icon } from "@/components/icon";
import {
  SectionHeading,
  ServiceCards,
  IndustryCards,
  ProcessSteps,
} from "@/components/sections";
export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-grid-bg" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <span /> INNOVATE. INTEGRATE. ELEVATE.
            </span>
            <h1>
              Engineering the
              <br />
              future with{" "}
              <span>
                intelligent
                <br className="desktop-break" /> digital solutions.
              </span>
            </h1>
            <p>
              From bold ideas to powerful software. We build websites, apps, and
              intelligent systems that move your business forward.
            </p>
            <div className="hero-actions">
              <Link href="/services" className="button">
                Explore Our Services
              </Link>
              <Link href="/contact" className="button button-outline">
                Start Your Project
              </Link>
            </div>
            <div className="hero-footnote">
              <span>
                <ShieldCheck size={15} /> Built with purpose
              </span>
              <i />
              <span>
                <Globe2 size={15} /> Pakistan to the world
              </span>
            </div>
          </div>
          <DeviceScene />
        </div>
        <div className="container hero-bottom">
          <span>
            YOUR IDEAS. OUR ENGINEERING. <b>ENDLESS POSSIBILITIES.</b>
          </span>
          <a href="#services">
            Discover what we do <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <div className="capability-strip">
        <div className="container">
          <span>
            <Code2 /> Purpose-built software
          </span>
          <span>
            <ShieldCheck /> Security-conscious development
          </span>
          <span>
            <Layers /> Scalable by design
          </span>
          <span>
            <Sparkles /> Ready for what’s next
          </span>
        </div>
      </div>
      <section className="section container" id="services">
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="One technology partner. Endless possibilities."
          description="The right expertise to build, connect, and grow your business."
          link={["All services", "/services"]}
        />
        <ServiceCards />
      </section>
      <section className="about-band">
        <div className="container about-grid">
          <div className="engineering-art">
            <div className="art-frame">
              <span className="art-caption">THE BIT-WOLF APPROACH</span>
              <div className="art-core">
                <Code2 size={52} />
              </div>
              <span className="art-node node-a">
                <Icon name="shield" /> Secure
              </span>
              <span className="art-node node-b">
                <Icon name="layers" /> Scalable
              </span>
              <span className="art-node node-c">
                <Icon name="sparkles" /> Future-ready
              </span>
              <div className="art-line" />
              <p>
                Thoughtful engineering.
                <br />
                <b>Real business value.</b>
              </p>
            </div>
          </div>
          <div>
            <span className="eyebrow">MORE THAN CODE. A COMMITMENT.</span>
            <h2>
              Technology that powers
              <br />
              <span className="gradient-text">business growth.</span>
            </h2>
            <p>
              BIT-WOLF Technologies is a software development company dedicated
              to creating reliable, scalable, and innovative digital solutions.
            </p>
            <p>
              We help businesses simplify complex processes, strengthen their
              digital presence, and turn technology into meaningful business
              value.
            </p>
            <div className="principles">
              {[
                ["idea", "Innovative solutions"],
                ["shield", "Secure technology"],
                ["layers", "Scalable systems"],
                ["sparkles", "Future-ready thinking"],
              ].map(([icon, title]) => (
                <span key={title}>
                  <Icon name={icon} />
                  {title}
                </span>
              ))}
            </div>
            <Link className="text-link" href="/about">
              Get to know BIT-WOLF <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="From your first idea to what’s next."
          description="A clear process. Open communication. A shared focus on getting it right."
          link={["Our process", "/process"]}
        />
        <ProcessSteps compact />
      </section>
      <section className="section section-tinted">
        <div className="container">
          <SectionHeading
            eyebrow="BUILT AROUND YOUR WORLD"
            title="Different industries. Shared ambition."
            description="Digital solutions shaped around the way your business works."
            link={["Explore industries", "/industries"]}
          />
          <IndustryCards />
        </div>
      </section>
      <section className="section container partner-grid">
        <div>
          <span className="eyebrow">WHY BIT-WOLF</span>
          <h2>
            A technology partner
            <br />
            for the road ahead.
          </h2>
          <p>
            We combine thoughtful problem-solving and modern engineering to
            support your business goals, from the first conversation to your
            next milestone.
          </p>
          <Link className="button button-outline" href="/contact">
            Let’s Talk About Your Project
          </Link>
        </div>
        <div className="value-list">
          {[
            "Custom-built digital solutions",
            "Modern technology expertise",
            "Transparent communication",
            "Security-conscious development",
            "Scalable architecture",
            "Long-term technology partnership",
          ].map((t) => (
            <div key={t}>
              <Check size={18} />
              {t}
            </div>
          ))}
        </div>
      </section>
      <section className="tech-section container">
        <span className="eyebrow">MODERN TOOLS. THOUGHTFUL CHOICES.</span>
        <div className="tech-list">
          {[
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "Flutter",
            "PostgreSQL",
            "MongoDB",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>
    </>
  );
}
