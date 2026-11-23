# Vercel setup

Repository: https://github.com/Annus-Ahmed/bit-wolf-technologies

Project: https://vercel.com/anaxs-projects/bit-wolf-technologies

Production URL: https://bit-wolf-technologies-anaxs-projects.vercel.app

Automatic deployments are connected to the main branch. NEXT_PUBLIC_SITE_URL is configured for Production. Add the five contact/provider variables below in the project settings to activate enquiry delivery.

Use the Next.js preset, this folder as the project root, `npm run build`, and the default output directory. Use the team's commercial Vercel plan. GitHub can be connected later for automatic deployments; a first deployment can be uploaded directly.

## Production environment variables

| Name                       | Value                                                                                                                   | Type   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| `NEXT_PUBLIC_SITE_URL`     | Final HTTPS site origin, without a path. May initially be omitted; metadata and sitemap detect Vercel's production URL. | Config |
| `CONTACT_EMAIL`            | Real inbox receiving enquiries.                                                                                         | Config |
| `RESEND_API_KEY`           | Resend API key for the verified sending domain.                                                                         | Secret |
| `EMAIL_FROM`               | Sender at your verified domain, e.g. `BIT-WOLF Technologies <enquiries@YOUR-DOMAIN>`. Replace this example.             | Config |
| `UPSTASH_REDIS_REST_URL`   | HTTPS REST endpoint from Upstash Redis > Connect > REST.                                                                | Config |
| `UPSTASH_REDIS_REST_TOKEN` | Read/write REST token for that database.                                                                                | Secret |

Enter keys directly in Vercel, not in chat or source files. All five contact/provider variables are required for production email enquiries. The site can render before these are configured, while the form directs visitors to phone or WhatsApp.

## Resend

Add a sending domain you own at https://resend.com. Add its supplied DNS records without changing existing email records and wait for verification. Create a sending API key, set the sender at that domain, and set the recipient to your actual inbox. A sending identity does not create a mailbox. A `vercel.app` website address is fine for hosting, but email needs a sending domain you control.

## Upstash

Create a Redis database in Upstash or through Vercel Marketplace. Copy its REST endpoint and read/write REST token into the exact variable names above. A read-only token cannot perform rate limiting.

## Preview and custom domains

Set `NEXT_PUBLIC_SITE_URL` only for Production. Leave it unset in Preview so the contact endpoint checks the preview's own host. Preview provider credentials may remain unset or use separate test credentials. Keep Vercel system environment variables enabled. Once a custom domain is connected, set its HTTPS origin and redeploy. Environment changes require a new deployment.

## Verification

Check the homepage, all company/service pages, `/sitemap.xml`, and `/robots.txt`. After credentials are configured, submit one clearly marked test enquiry and verify the form success state, Resend delivery event, and actual inbox receipt. Provider acceptance alone does not establish delivery.

Privacy and terms remain marked drafts and need company approval before public launch.

References: https://vercel.com/docs/environment-variables, https://resend.com/docs/send-with-nextjs, https://upstash.com/docs/redis/features/restapi.
