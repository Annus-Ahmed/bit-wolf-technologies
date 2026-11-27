import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { company } from "@/data/site";
export const metadata: Metadata = { title: "Terms & Conditions" };
export default function Terms() {
  return (
    <>
      <PageIntro
        eyebrow="USING OUR WEBSITE"
        title="Terms & Conditions"
        description="General terms for visiting the BIT-WOLF Technologies website."
      />
      <article className="container content-section legal">
        <p className="legal-notice">
          <strong>Draft for company and legal review.</strong> These terms
          require approval before public launch and do not replace a project
          agreement.
        </p>
        <h2>Website information</h2>
        <p>
          This website describes services offered by BIT-WOLF Technologies.
          Content is general information. Service availability, technical
          choices, estimates, and delivery commitments are confirmed
          individually.
        </p>
        <h2>Enquiries and project agreements</h2>
        <p>
          Submitting an enquiry does not create a service contract. Scope, fees,
          payment schedules, intellectual property ownership, confidentiality,
          support, acceptance criteria, and delivery milestones must be agreed
          in a separate written project agreement.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Use the website lawfully. Do not attempt unauthorized access, disrupt
          the site, impersonate others, or submit malicious, misleading, or
          unsolicited material through the enquiry form.
        </p>
        <h2>Content and ownership</h2>
        <p>
          BIT-WOLF branding and website material may not be represented as
          belonging to another organization. Ownership and licensing of
          deliverables are governed by the relevant project agreement.
        </p>
        <h2>Availability and external services</h2>
        <p>
          The website may be updated or temporarily unavailable. External links,
          including WhatsApp, are operated by separate providers with their own
          terms.
        </p>
        <h2>Questions and legal review</h2>
        <p>
          For questions, call {company.phone}. The company and its legal adviser
          must confirm applicable law, dispute arrangements, liability
          provisions, and the approved business details before publication.
        </p>
      </article>
    </>
  );
}
