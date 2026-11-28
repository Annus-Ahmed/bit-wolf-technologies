import type { Metadata } from "next";
import { PageIntro, SectionHeading } from "@/components/sections";
import { AboutShowcase, TeamShowcase } from "@/components/about-showcase";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = { title: "About Us" };

export default function About() {
  return (
    <>
      <PageIntro
        background="about"
        eyebrow="MEET BIT-WOLF"
        title="People. Purpose. Possibility."
        description="A shared ambition to build technology with meaning. Get to know the thinking and the people behind BIT-WOLF Technologies."
      />
      <div className="container content-section about-page-content">
        <Reveal>
          <AboutShowcase />
        </Reveal>
        <section className="about-principles">
          <SectionHeading
            eyebrow="WHAT GUIDES US"
            title="Good technology starts with good principles."
          />
          <div className="about-value-list">
            {[
              "Innovation",
              "Integrity",
              "Quality",
              "Collaboration",
              "Transparency",
              "Continuous Learning",
              "Client Success",
            ].map((value, index) => (
              <span key={value}>
                <span>0{index + 1}</span>
                {value}
              </span>
            ))}
          </div>
        </section>
        <SectionHeading
          eyebrow="THE PEOPLE BEHIND THE PURPOSE"
          title="Different strengths. One shared direction."
          description="Meet the team bringing leadership, creativity, and coordination to BIT-WOLF. Select a name to explore their role."
        />
        <TeamShowcase />
      </div>
    </>
  );
}
