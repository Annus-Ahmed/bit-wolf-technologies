"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Code2, Layers, ShieldCheck, Zap } from "lucide-react";
export function DeviceScene() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ y: 0 }}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.4 }}
      className="device-scene"
      aria-label="Illustration of BIT-WOLF website and mobile application interfaces"
    >
      <div className="orbital orbit-one" />
      <div className="orbital orbit-two" />
      <div className="scene-grid" />
      <div className="floating-label label-code">
        <Code2 size={18} />
        <span>
          Ideas into <strong>intelligent systems.</strong>
        </span>
      </div>
      <div className="laptop">
        <div className="laptop-camera" />
        <div className="laptop-screen">
          <div className="mini-nav">
            <span>
              BIT<span className="cyan">-</span>WOLF
            </span>
            <div>About &nbsp; Services &nbsp; Contact</div>
            <i>Let’s talk</i>
          </div>
          <div className="mini-hero">
            <div>
              <span className="mini-eyebrow">
                ENGINEERING THE DIGITAL FUTURE
              </span>
              <h3>
                Built for your business.
                <br />
                <span>Designed for tomorrow.</span>
              </h3>
              <p>Software. Data. Digital possibilities.</p>
              <span className="mini-button">Explore our solutions</span>
            </div>
            <Image
              src="/images/wolf-symbol-transparent.png"
              width={205}
              height={124}
              alt="Original BIT-WOLF wolf artwork"
              loading="eager"
            />
          </div>
          <div className="mini-capabilities">
            <span>
              <Code2 />
              Web & Software
            </span>
            <span>
              <Layers />
              Connected systems
            </span>
            <span>
              <ShieldCheck />
              Secure by design
            </span>
          </div>
          <div className="mini-section">
            <span>THE RIGHT TECHNOLOGY. REAL POSSIBILITIES.</span>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
        <div className="laptop-base">
          <span />
        </div>
      </div>
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-status">
          9:41 <span>••• ▰</span>
        </div>
        <span className="phone-greeting">YOUR WORKSPACE</span>
        <h4>Hello, there.</h4>
        <p>Let’s make things happen.</p>
        <div className="phone-summary">
          <span>Project overview</span>
          <b>Moving forward.</b>
          <div className="progress-bar" />
          <small>Design → Development</small>
        </div>
        <div className="phone-tile">
          <span>
            <Layers size={14} /> Your projects
          </span>
          <b>All in one place</b>
        </div>
        <div className="phone-chart">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="phone-bottom">
          <Layers size={14} />
          <Code2 size={14} />
          <ShieldCheck size={14} />
        </div>
      </div>
      <div className="floating-label label-solution">
        <Zap size={17} />
        <span>
          Built to evolve.
          <br />
          <strong>Engineered to perform.</strong>
        </span>
      </div>
      <div className="scene-caption">
        <span /> CONNECTING IDEAS. CREATING POSSIBILITIES.
      </div>
    </motion.div>
  );
}
