import type { MetadataRoute } from "next";
import { services } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/industries",
    "/process",
    "/contact",
    "/privacy-policy",
    "/terms",
    ...services.map((s) => "/services/" + s.slug),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
