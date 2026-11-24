"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <MotionContext.Provider
      value={{ paused, toggle: () => setPaused((value) => !value) }}
    >
      <MotionConfig reducedMotion={paused ? "always" : "user"}>
        <div data-motion={paused ? "paused" : "running"}>{children}</div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  const { paused } = useContext(MotionContext);
  const reduced = useReducedMotion();
  return paused || Boolean(reduced);
}

export function MotionToggle() {
  const { paused, toggle } = useContext(MotionContext);
  return (
    <button className="motion-toggle" onClick={toggle} aria-pressed={paused}>
      {paused ? (
        <Play size={13} aria-hidden="true" />
      ) : (
        <Pause size={13} aria-hidden="true" />
      )}
      {paused ? "Resume motion" : "Pause motion"}
    </button>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useMotionPreference();
  return (
    <motion.div
      className={["motion-reveal", className].filter(Boolean).join(" ")}
      initial={{ y: 22 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.75,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
