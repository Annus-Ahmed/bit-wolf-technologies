"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Plus,
  Minus,
  Check,
  Code2,
  Layers,
  Database,
  Smartphone,
  Workflow,
} from "lucide-react";
import { services } from "@/data/site";
import { Icon } from "./icon";
import { useMotionPreference } from "./motion";

function ServiceVisual({ active }: { active: number }) {
  if (active === 1)
    return (
      <div className="analytics-concept">
        <div className="concept-window-bar">
          <span />
          <span />
          <span />
          <b>Business overview</b>
        </div>
        <div className="chart-caption">
          <small>BRING THE BIG PICTURE INTO FOCUS</small>
          <h4>Clarity. At a glance.</h4>
        </div>
        <div className="bar-chart" aria-hidden="true">
          {[30, 48, 39, 62, 53, 76, 68, 89, 81, 100].map((height, index) => (
            <i key={index} style={{ height: `${height}%` }} />
          ))}
        </div>
        <div className="concept-legend">
          <span>Sales performance</span>
          <span>Operational insights</span>
        </div>
      </div>
    );
  if (active === 2)
    return (
      <div className="mobile-concept">
        <div className="concept-phone">
          <div className="concept-notch" />
          <span className="concept-greeting">MAKE ROOM FOR MORE</span>
          <h4>
            Your business.
            <br />
            Within reach.
          </h4>
          <div className="mobile-project">
            <Smartphone size={25} />
            <span>
              Thoughtful experiences.
              <br />
              <b>Wherever life happens.</b>
            </span>
          </div>
          <div className="mobile-feature">
            <span>Discover</span>
            <Plus size={16} />
          </div>
          <div className="mobile-feature">
            <span>Connect</span>
            <Plus size={16} />
          </div>
          <div className="mobile-feature">
            <span>Make it happen</span>
            <Check size={16} />
          </div>
          <div className="concept-bottom-nav">
            <Layers size={17} />
            <Smartphone size={17} />
            <Check size={17} />
          </div>
        </div>
        <span className="mobile-orbit" />
      </div>
    );
  if (active === 3)
    return (
      <div className="workflow-concept">
        <div className="flow-node">
          <span>
            <Layers size={23} />
          </span>
          <div>
            <small>YOUR BUSINESS</small>
            <b>One connected flow.</b>
          </div>
        </div>
        <div className="flow-connector" />
        <div className="flow-split">
          <div>
            <Workflow size={21} />
            <b>Connect systems</b>
          </div>
          <div>
            <Check size={21} />
            <b>Automate tasks</b>
          </div>
        </div>
        <div className="flow-connector" />
        <div className="flow-result">
          <span /> More time for what matters.
        </div>
      </div>
    );
  if (active === 4)
    return (
      <div className="cloud-concept">
        <div className="cloud-orbit">
          <Database size={52} strokeWidth={1} />
          <span className="cloud-point cp-one">
            <Code2 size={20} />
          </span>
          <span className="cloud-point cp-two">
            <Layers size={20} />
          </span>
          <span className="cloud-point cp-three">
            <Database size={20} />
          </span>
        </div>
        <h4>
          A solid foundation.
          <br />
          Room to grow.
        </h4>
        <div className="cloud-tags">
          <span>Structured data</span>
          <span>Connected applications</span>
        </div>
      </div>
    );
  return (
    <div className="web-concept">
      <div className="concept-window-bar">
        <span />
        <span />
        <span />
        <b>Built for your next chapter</b>
      </div>
      <div className="web-concept-nav">
        <b>YOUR NEXT IDEA.</b>
        <span>Explore &nbsp; About &nbsp; Contact</span>
      </div>
      <div className="web-concept-content">
        <small>THOUGHTFULLY DESIGNED. PURPOSEFULLY BUILT.</small>
        <h4>
          Make the
          <br />
          <em>next move.</em>
        </h4>
        <span className="concept-button">Discover the possibilities</span>
        <div className="concept-graphic">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="web-concept-bottom">
        <span>01 &nbsp; A clearer vision</span>
        <span>02 &nbsp; A better experience</span>
      </div>
    </div>
  );
}

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const reduced = useMotionPreference();
  return (
    <div className="service-explorer">
      <div className="service-accordion">
        {services.map((service, index) => (
          <div
            className={`service-row ${active === index ? "is-active" : ""}`}
            key={service.slug}
          >
            <h3>
              <button
                id={`service-trigger-${index}`}
                aria-expanded={active === index}
                aria-controls={`service-description-${index}`}
                onClick={() => setActive(index)}
              >
                <span className="service-row-icon">
                  <Icon name={service.icon} />
                </span>
                <span>{service.title}</span>
                {active === index ? <Minus size={19} /> : <Plus size={19} />}
              </button>
            </h3>
            <div
              id={`service-description-${index}`}
              role="region"
              aria-labelledby={`service-trigger-${index}`}
              hidden={active !== index}
            >
              <p>{service.description}</p>
              <Link className="text-link" href={`/services/${service.slug}`}>
                Explore {service.short.toLowerCase()}
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={`service-stage stage-${active}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="service-stage-inner"
            initial={{ opacity: 0, y: reduced ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -10 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
          >
            <div className="service-stage-label">
              <span>CAPABILITY IN FOCUS</span>
              <span>INTERFACE CONCEPT</span>
            </div>
            <ServiceVisual active={active} />
            <div className="service-stage-footnote">
              <span>{services[active].short}</span>
              <span>Designed around your business.</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
