import type { Metadata } from "next";
import { PageIntro, ProcessSteps } from "@/components/sections";
export const metadata: Metadata = { title: "Our Development Process" };
export default function Process() {
  return (
    <>
      <PageIntro
        eyebrow="HOW WE WORK"
        title="From idea to digital reality."
        description="A collaborative process that replaces uncertainty with a clear plan. You stay informed, involved, and aligned at every stage."
      />
      <section className="container content-section">
        <ProcessSteps />
        <article className="content-block" style={{ marginTop: 40 }}>
          <h2>Clarity from the start.</h2>
          <p>
            Deliverables, milestones, ownership, support, and commercial terms
            are agreed for each project. You’ll know what we’re building
            together and how we’ll measure progress.
          </p>
        </article>
      </section>
    </>
  );
}
