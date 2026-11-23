"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, Phone, MapPin } from "lucide-react";
import { company, services } from "@/data/site";
const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Industries", "/industries"],
  ["Contact", "/contact"],
];
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="BIT-WOLF Technologies home">
      <span className="brand-symbol">
        <Image
          src="/images/wolf-symbol-transparent.png"
          alt=""
          fill
          sizes="64px"
        />
      </span>
      <span className="brand-wordmark">
        <Image
          src="/images/wordmark-transparent.png"
          width={145}
          height={29}
          alt="BIT-WOLF Technologies"
        />
      </span>
    </Link>
  );
}
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (e.key === "Tab") {
        const items =
          menuRef.current?.querySelectorAll<HTMLElement>("a,button");
        if (!items?.length) return;
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          buttonRef.current?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          buttonRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [open]);
  return (
    <header className="header">
      <div className="container nav">
        <Brand />
        <nav aria-label="Main navigation" className="desktop-nav">
          {links.map(([label, href]) => (
            <Link
              aria-current={
                (href === "/" ? path === "/" : path.startsWith(href))
                  ? "page"
                  : undefined
              }
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="button nav-cta" href="/contact">
          Get a Free Consultation
        </Link>
        <button
          ref={buttonRef}
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div ref={menuRef} id="mobile-navigation" className="mobile-nav">
          <nav aria-label="Mobile navigation">
            {links.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/process" onClick={() => setOpen(false)}>
              Our Process
            </Link>
            <Link
              className="button"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Get a Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <>
      <section className="closing">
        <div className="container closing-inner">
          <div>
            <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
            <h2>
              Have an idea? <span>Let’s build it.</span>
            </h2>
            <p>
              Turn your business challenge into your next digital opportunity.
            </p>
          </div>
          <Link href="/contact" className="button">
            Start a Project
          </Link>
        </div>
      </section>
      <footer>
        <div className="container footer-grid">
          <div>
            <Brand />
            <p>Engineering the Digital Future.</p>
            <p>
              Thoughtful technology.
              <br />
              Meaningful business impact.
            </p>
          </div>
          <div>
            <h3>What we do</h3>
            {services.map((s) => (
              <Link key={s.slug} href={"/services/" + s.slug}>
                {s.short}
              </Link>
            ))}
          </div>
          <div>
            <h3>Explore</h3>
            {[
              ["About Us", "/about"],
              ["Our Work", "/portfolio"],
              ["Industries", "/industries"],
              ["Our Process", "/process"],
              ["Contact Us", "/contact"],
            ].map(([l, h]) => (
              <Link key={h} href={h}>
                {l}
              </Link>
            ))}
          </div>
          <div>
            <h3>Let’s connect</h3>
            <a href={"tel:" + company.tel}>
              <Phone size={15} /> {company.phone}
            </a>
            <p className="inline">
              <MapPin size={15} /> Pakistan · Working globally
            </p>
            <a
              href={company.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} BIT-WOLF Technologies. All rights
            reserved.
          </span>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </footer>
      <a
        href={company.whatsapp}
        className="whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuss your project on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </>
  );
}
