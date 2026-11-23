/** Resolve canonical URLs without publishing localhost in a Vercel build. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return new URL(
    configured || (host ? `https://${host}` : "http://localhost:3000"),
  ).origin;
}
