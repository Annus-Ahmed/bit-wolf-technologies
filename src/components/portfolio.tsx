"use client";
import { useState } from "react";
import Link from "next/link";
import { FolderCode } from "lucide-react";
const categories = [
  "All Work",
  "Web Applications",
  "Business Websites",
  "Mobile Applications",
  "E-Commerce",
  "SaaS Platforms",
  "Automation Solutions",
  "Dashboards",
];
export function Portfolio() {
  const [category, setCategory] = useState("All Work");
  return (
    <>
      <div className="filter-list" role="group" aria-label="Project category">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={c === category}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="portfolio-empty" aria-live="polite">
        <FolderCode />
        <span className="eyebrow">
          {category === "All Work" ? "OUR PORTFOLIO" : category.toUpperCase()}
        </span>
        <h2>Our next chapter is taking shape.</h2>
        <p>
          We’re preparing our project showcase. Verified work and detailed case
          studies will appear here as they become available to share.
        </p>
        <p>
          In the meantime, explore our approach or tell us about the challenge
          you’re working on.
        </p>
        <Link className="button" href="/contact">
          Discuss Your Project
        </Link>{" "}
        <Link className="button button-outline" href="/process">
          Explore Our Process
        </Link>
      </div>
    </>
  );
}
