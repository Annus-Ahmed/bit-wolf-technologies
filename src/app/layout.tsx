import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "BIT-WOLF Technologies | Engineering the Digital Future",
    template: "%s | BIT-WOLF Technologies",
  },
  description:
    "Custom software, websites, mobile applications, data analytics, business automation, and cloud solutions for businesses in Pakistan and internationally.",
  openGraph: {
    title: "BIT-WOLF Technologies",
    description: "Engineering the Digital Future",
    images: [
      {
        url: "/images/bit-wolf-original.png",
        width: 1448,
        height: 1086,
        alt: "BIT-WOLF Technologies",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/bit-wolf-original.png"],
  },
  icons: { icon: "/images/wolf-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BIT-WOLF Technologies",
    url: getSiteUrl(),
    logo: "/images/bit-wolf-original.png",
    telephone: "+923170561010",
    founder: [
      { "@type": "Person", name: "Umer Abbas" },
      { "@type": "Person", name: "Annus Ahmed" },
    ],
    areaServed: ["Pakistan", "Worldwide"],
  };
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
