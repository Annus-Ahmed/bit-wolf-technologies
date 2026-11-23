import type { Metadata } from "next";
import {
  PageIntro,
  ServiceCards,
  ProcessSteps,
  SectionHeading,
} from "@/components/sections";
export const metadata: Metadata = { title: "Our Services" };
export default function Services() {
  return (
    <>
      <PageIntro
        eyebrow="OUR EXPERTISE"
        title="The right technology. Real possibilities."
        description="Five connected areas of expertise. One focused team helping you build, understand, connect, simplify, and scale."
      />
      <section className="container content-section">
        <ServiceCards />
        <div style={{ marginTop: 85 }}>
          <SectionHeading
            eyebrow="A COLLABORATIVE APPROACH"
            title="Your goals guide every decision."
            description="We start with your business, then choose the technology to match."
          />
          <ProcessSteps compact />
        </div>
      </section>
    </>
  );
}
