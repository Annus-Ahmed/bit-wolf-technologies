import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Code2,
  Globe2,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { WorldNetworkBackground } from "@/components/world-network-background";
import { MotionToggle, Reveal } from "@/components/motion";
import { ServiceExplorer } from "@/components/service-explorer";
import { IndustryCards, SectionHeading } from "@/components/sections";
import { process } from "@/data/site";

const principles = [
  [
    "Built around you",
    "Your goals, your users, and the way your business works.",
    Code2,
  ],
  [
    "Made to connect",
    "Thoughtful systems that bring your digital world together.",
    Layers,
  ],
  [
    "Engineered with care",
    "Clear communication and security-conscious development.",
    ShieldCheck,
  ],
  [
    "Ready to evolve",
    "Flexible foundations for your business’s next chapter.",
    Sparkles,
  ],
] as const;

export default function Home() {
  return (
    <>
      <section className="hero editorial-hero">
        <WorldNetworkBackground />
        <div className="container editorial-hero-inner">
          <Reveal className="editorial-hero-copy">
            <span className="eyebrow hero-eyebrow">
              ENGINEERING THE DIGITAL FUTURE
            </span>
            <h1>
              Engineering
              <br />
              what’s <span>next.</span>
            </h1>
            <p>
              Bold ideas deserve exceptional execution. We turn your ambitions
              into software, experiences, and systems that move business
              forward.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="button button-white">
                Let’s Build Something
              </Link>
              <Link href="#services" className="hero-secondary">
                Explore our expertise
                <span className="link-line" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="container editorial-hero-bottom">
          <a href="#intro" className="scroll-cue">
            <span className="scroll-line" aria-hidden="true" />
            SCROLL TO EXPLORE
          </a>
          <span className="hero-location">
            <Globe2 size={14} aria-hidden="true" />
            Based in Pakistan. Built for the world.
          </span>
          <MotionToggle />
        </div>
      </section>
      <section className="intro-section section container" id="intro">
        <Reveal className="intro-label">
          <span className="eyebrow">
            A TECHNOLOGY PARTNER.
            <br />A DIFFERENT PERSPECTIVE.
          </span>
          <span className="section-kicker">BIT-WOLF TECHNOLOGIES</span>
        </Reveal>
        <Reveal className="intro-statement">
          <h2>
            We bring clarity to complexity.
            <br />
            <span>And possibility to your ideas.</span>
          </h2>
          <p>
            From your first website to the systems behind your business, we
            combine thoughtful design and reliable engineering to make
            technology work for you.
          </p>
          <Link className="text-link" href="/about">
            Get to know BIT-WOLF
          </Link>
        </Reveal>
      </section>
      <section className="services-section section" id="services">
        <div className="container">
          <SectionHeading
            eyebrow="WHAT WE BRING TO THE TABLE"
            title="Big-picture thinking. Beautifully built."
            description="Five connected areas of expertise. One partner for your next move."
          />
          <ServiceExplorer />
        </div>
      </section>
      <section className="section container principles-section">
        <Reveal>
          <span className="eyebrow">HOW WE THINK</span>
          <h2>
            Good technology starts
            <br />
            with a better understanding.
          </h2>
        </Reveal>
        <div className="principle-grid">
          {principles.map(([title, description, Icon], index) => (
            <Reveal key={title} delay={index * 0.07}>
              <article className="principle-item">
                <Icon size={26} strokeWidth={1.3} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="perspective-section">
        <div className="container perspective-grid">
          <div className="perspective-art" aria-hidden="true">
            <span className="perspective-grid-line" />
            <div className="perspective-tunnel">
              {Array.from({ length: 8 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    inset: index * 5 + "%",
                    animationDelay: index * 0.12 + "s",
                  }}
                />
              ))}
            </div>
            <Image
              src="/images/wolf-symbol-transparent.png"
              width={620}
              height={374}
              sizes="(max-width: 640px) 65vw, (max-width: 950px) 32vw, 370px"
              alt=""
            />
            <span className="perspective-caption">
              ENGINEERING THE DIGITAL FUTURE.
            </span>
          </div>
          <Reveal className="perspective-copy">
            <span className="eyebrow">MORE THAN A PROJECT</span>
            <h2>
              Your ambition.
              <br />
              Our shared direction.
            </h2>
            <p>
              Launching something new? Improving what’s already there? We start
              by understanding where you want to go, then help you find a
              practical way forward.
            </p>
            <p>
              Custom solutions. Open conversations. A focus on what matters to
              your business.
            </p>
            <Link href="/contact" className="button button-white">
              Tell Us What You Have in Mind
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section container industries-section">
        <SectionHeading
          eyebrow="BUILT AROUND YOUR WORLD"
          title="Different businesses. Shared possibilities."
          description="Digital solutions shaped around your commercials, your people, and your next chapter."
          link={["Explore Commercials", "/industries"]}
        />
        <IndustryCards />
      </section>
      <section className="process-section">
        <div className="container process-editorial">
          <Reveal className="process-intro">
            <span className="eyebrow">FROM POSSIBILITY TO REALITY</span>
            <h2>
              Good work.
              <br />A clear way
              <br />
              <span>forward.</span>
            </h2>
            <p>
              A shared plan from the first conversation to launch, with you
              involved at every step.
            </p>
            <Link href="/process" className="text-link">
              Inside our process
            </Link>
          </Reveal>
          <div className="process-timeline">
            {process.map(([title, description], index) => (
              <Reveal key={title} delay={0.04}>
                <article className="timeline-item">
                  <span className="timeline-number">0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                  <Check size={17} aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="tech-section">
        <div className="container tech-heading">
          <span className="eyebrow">MODERN TOOLS. CONSIDERED CHOICES.</span>
          <p>The right technology for the task.</p>
          <MotionToggle />
        </div>
        <div
          className="tech-marquee"
          role="img"
          aria-label="Technologies: React, Next.js, TypeScript, Node.js, Flutter, PostgreSQL, MongoDB"
        >
          <div className="tech-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div className="tech-track-group" key={copy}>
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Node.js",
                  "Flutter",
                  "PostgreSQL",
                  "MongoDB",
                ].map((tech) => (
                  <span key={tech}>
                    {tech}
                    <i />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section container faq-section">
        <Reveal>
          <span className="eyebrow">BEFORE WE BEGIN</span>
          <h2>
            A few things
            <br />
            you might be wondering.
          </h2>
          <p>Have another question? We’re a conversation away.</p>
          <Link href="/contact" className="text-link">
            Talk to our team
          </Link>
        </Reveal>
        <div className="faq-list">
          {[
            [
              "Where do we start?",
              "Tell us about your idea or business challenge. We’ll discuss your goals, users, requirements, and a practical next step before agreeing on a project scope.",
            ],
            [
              "Can you help with an existing product?",
              "Yes. We can discuss improvements, integrations, maintenance, or a new direction for your existing application. We’ll first review the system and agree on the work required.",
            ],
            [
              "Do you work with clients outside Pakistan?",
              "We’re based in Pakistan and open to international projects. Communication, milestones, and ways of working are agreed together at the start.",
            ],
            [
              "What happens after launch?",
              "We provide project documentation and can agree on ongoing maintenance and support. The exact scope and terms are confirmed in your project agreement.",
            ],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span className="faq-indicator" aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
