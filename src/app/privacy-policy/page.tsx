import type { Metadata } from "next";
import { PageIntro } from "@/components/sections";
import { company } from "@/data/site";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function Privacy() {
  return (
    <>
      <PageIntro
        eyebrow="YOUR INFORMATION"
        title="Privacy Policy"
        description="How information shared through this website is intended to be handled."
      />
      <article className="container content-section legal">
        <p className="legal-notice">
          <strong>Draft for company and legal review.</strong> This policy must
          be reviewed and approved before the website begins collecting public
          enquiries.
        </p>
        <h2>Information you provide</h2>
        <p>
          The enquiry form collects your name, email address, project
          description, selected service, preferred contact method, and consent.
          You may also provide a company name, telephone number, and estimated
          project budget. Please avoid sending passwords, payment details, or
          sensitive personal information.
        </p>
        <h2>Why we use your information</h2>
        <p>
          Information is used to respond to your enquiry, discuss project
          requirements, and communicate about services you request. Consent to
          respond to an enquiry is not consent to unrelated marketing.
        </p>
        <h2>Service providers and security</h2>
        <p>
          When configured, enquiries are sent through Resend to the company’s
          designated email inbox. Hosting and email providers process technical
          information to operate the website. Rate limiting uses a hashed
          network identifier in the configured Redis provider with a short
          expiry. Access to enquiry information should be limited to people
          handling your request.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          Enquiry information should be retained only as long as needed for the
          enquiry, an agreed project, or applicable record-keeping obligations.
          The company must confirm its retention schedule before launch. You may
          request access, correction, or deletion by calling {company.phone} or
          contacting the team on WhatsApp.
        </p>
        <h2>Cookies and external links</h2>
        <p>
          This implementation does not set advertising or analytics cookies.
          Links to WhatsApp take you to a separate service governed by its own
          policies. Any future analytics or additional data processing requires
          this policy to be updated.
        </p>
        <h2>Review before launch</h2>
        <p>
          The company must confirm its official privacy contact, provider
          arrangements, applicable obligations, and retention period before
          approving this draft.
        </p>
      </article>
    </>
  );
}
