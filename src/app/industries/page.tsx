import type { Metadata } from "next";
import { PageIntro, IndustryCards } from "@/components/sections";
export const metadata: Metadata = { title: "Industries We Serve" };
export default function Industries() {
  return (
    <>
      <PageIntro
        background="commercials"
        eyebrow="BUILT AROUND YOUR BUSINESS"
        title="Digital solutions for every stage of business."
        description="From essential services to new ventures, we aim to help businesses put technology to work. These are the commercials our solutions are designed to support."
      />
      <section className="container content-section">
        <IndustryCards />
      </section>
    </>
  );
}
