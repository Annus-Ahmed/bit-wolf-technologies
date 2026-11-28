import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { Portfolio } from "@/components/portfolio";
export const metadata: Metadata = { title: "Our Work" };
export default function Work() {
  return (
    <>
      <PageIntro
        background="portfolio"
        eyebrow="OUR WORK"
        title="Ideas become possibilities."
        description="A growing space for our software projects, digital experiences, and the thinking behind them."
      />
      <section className="container content-section">
        <Portfolio />
      </section>
    </>
  );
}
