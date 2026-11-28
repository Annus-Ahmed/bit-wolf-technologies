"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "./motion";

// Coordinates are registered to the Pakistan outline in the 1672 × 941 artwork.
const HUB = { x: 1253, y: 410 };
const DESTINATIONS = [
  [1040, 300],
  [1055, 330],
  [1095, 300],
  [1100, 240],
  [1150, 350],
  [1135, 430],
  [1192, 442],
  [1030, 408],
  [1100, 640],
  [1150, 510],
  [1400, 510],
  [1410, 370],
  [1490, 357],
  [1462, 626],
  [1330, 240],
  [1283, 488],
];
const ROUTES = DESTINATIONS.map(([x, y], index) => {
  const lift = Math.min(90, Math.hypot(x - HUB.x, y - HUB.y) * 0.25);
  return {
    x,
    y,
    path: `M ${HUB.x} ${HUB.y} Q ${(HUB.x + x) / 2} ${Math.min(HUB.y, y) - lift} ${x} ${y}`,
    duration: `${6 + index * 0.23}s`,
  };
});

export function ContactGlobeHero() {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useMotionPreference();

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    const sync = () => {
      if (reduced || motionQuery.matches || !visible || document.hidden)
        svg.pauseAnimations();
      else svg.unpauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(svg);
    document.addEventListener("visibilitychange", sync);
    motionQuery.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, [reduced]);

  return (
    <svg
      ref={svgRef}
      className="contact-globe-visual"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
    >
      <image
        href="/images/heroes/contact-globe-full.webp"
        width="1672"
        height="941"
      />
      {ROUTES.map((route, index) => (
        <g key={route.path}>
          <path
            className="contact-globe-route"
            d={route.path}
            fill="none"
            stroke="#46bcff"
            strokeWidth="1.5"
            opacity=".78"
          />
          <circle
            cx={route.x}
            cy={route.y}
            r="2.8"
            fill="#e4ae54"
            opacity=".6"
          />
          {[0, 1].map((packet) => {
            const begin = `-${index * 0.47 + (packet * (6 + index * 0.23)) / 2}s`;
            return (
              <circle
                key={packet}
                className="contact-globe-packet"
                r="4"
                fill="#ffd16b"
              >
                <animateMotion
                  path={route.path}
                  dur={route.duration}
                  begin={begin}
                  repeatCount="indefinite"
                  calcMode="paced"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.04;0.94;1"
                  dur={route.duration}
                  begin={begin}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}
        </g>
      ))}
      <circle cx={HUB.x} cy={HUB.y} r="14" fill="#3bdcff" opacity=".13" />
      <circle
        cx={HUB.x}
        cy={HUB.y}
        r="8"
        fill="none"
        stroke="#8ceeff"
        strokeWidth="1.4"
        opacity=".9"
      />
      <circle
        className="contact-globe-origin"
        cx={HUB.x}
        cy={HUB.y}
        r="4.5"
        fill="#ddfbff"
      />
    </svg>
  );
}
