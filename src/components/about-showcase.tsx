"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useMotionPreference } from "./motion";

const chapters = [
  {
    label: "Our story",
    title: "Big ideas.\nThoughtful engineering.",
    description:
      "BIT-WOLF Technologies is an emerging software company based in Pakistan, open to working with businesses around the world. We bring curiosity, clear communication, and care to the things we build.",
    detail: "Web & software · Mobile · Data · Automation · Cloud",
    word: "BUILD",
  },
  {
    label: "Our mission",
    title: "Make complex\nfeel simple.",
    description:
      "To empower businesses with reliable, accessible software that solves real-world problems. We start with what matters to your business and find a practical way to move it forward.",
    detail: "Understand the challenge. Create a useful solution.",
    word: "SOLVE",
  },
  {
    label: "Our vision",
    title: "Engineering\nwhat’s next.",
    description:
      "To grow into a trusted technology partner, known for thoughtful engineering, fresh thinking, and lasting client relationships. Our ambition is to build technology with meaning.",
    detail: "Better ideas. Stronger partnerships. Lasting value.",
    word: "EVOLVE",
  },
];

const team = [
  {
    name: "Umer Abbas",
    initials: "UA",
    role: "CEO & Founder",
    focus: "The vision behind the build.",
    description:
      "Company direction, business priorities, and the vision that connects BIT-WOLF’s work to the needs of its clients.",
    priorities: ["Company vision", "Business strategy", "Client partnerships"],
  },
  {
    name: "Annus Ahmed",
    initials: "AA",
    role: "Co-Founder & Managing Director",
    focus: "Turning direction into action.",
    description:
      "Day-to-day leadership, team coordination, and aligning the company’s operations with its goals and client commitments.",
    priorities: [
      "Business operations",
      "Team coordination",
      "Delivery oversight",
    ],
  },
  {
    name: "Ali Nawaz",
    initials: "AN",
    role: "Marketing Manager",
    focus: "Connecting ideas with people.",
    description:
      "Brand communication, marketing planning, and helping the right audiences understand what BIT-WOLF can bring to their business.",
    priorities: [
      "Marketing strategy",
      "Brand communication",
      "Audience engagement",
    ],
  },
  {
    name: "Sadaf Ali",
    initials: "SA",
    role: "Project Manager",
    focus: "Keeping every detail moving.",
    description:
      "Project planning, clear communication, and coordination between clients and the team throughout the delivery process.",
    priorities: [
      "Project planning",
      "Team collaboration",
      "Client communication",
    ],
  },
  {
    name: "Zameer Khan",
    initials: "ZK",
    role: "Graphic Designer",
    focus: "Giving ideas a visual voice.",
    description:
      "Visual identity, graphic design, and creating clear, consistent brand materials that bring a business’s message to life.",
    priorities: ["Visual identity", "Graphic design", "Brand consistency"],
  },
];

export function AboutShowcase() {
  const [chapter, setChapter] = useState(0);
  const reduced = useMotionPreference();
  const current = chapters[chapter];
  return (
    <section className="about-chapters" aria-label="Get to know BIT-WOLF">
      <div className="about-chapter-menu" aria-label="Choose a chapter">
        {chapters.map((item, index) => (
          <button
            type="button"
            key={item.label}
            aria-pressed={chapter === index}
            aria-controls="about-chapter-content"
            onClick={() => setChapter(index)}
          >
            <span>0{index + 1}</span> {item.label}
            <ArrowDownRight size={18} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="about-chapter-layout">
        <div id="about-chapter-content" aria-live="polite" aria-atomic="true">
          <motion.div
            key={chapter}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.45 }}
            className="about-chapter-copy"
          >
            <span className="eyebrow">A LITTLE ABOUT US / 0{chapter + 1}</span>
            <h2>{current.title}</h2>
            <p>{current.description}</p>
            <span className="about-chapter-detail">{current.detail}</span>
          </motion.div>
        </div>
        <div className="about-signal" aria-hidden="true">
          <div className="about-signal-orbit orbit-one" />
          <div className="about-signal-orbit orbit-two" />
          <div className="about-signal-orbit orbit-three" />
          <span className="about-signal-coordinate">BIT-WOLF / PAKISTAN</span>
          <span className="about-signal-word">{current.word}</span>
          <ArrowDownRight className="about-signal-arrow" strokeWidth={1} />
          <span className="about-signal-caption">IDEAS INTO POSSIBILITY.</span>
        </div>
      </div>
    </section>
  );
}

export function TeamShowcase() {
  const [selected, setSelected] = useState(0);
  const reduced = useMotionPreference();
  const person = team[selected];
  return (
    <section className="team-showcase" aria-label="Meet the BIT-WOLF team">
      <div className="team-roster" aria-label="Choose a team member">
        {team.map((member, index) => (
          <button
            key={member.name}
            type="button"
            aria-pressed={selected === index}
            aria-controls="team-profile"
            onClick={() => setSelected(index)}
          >
            <span className="team-roster-index">0{index + 1}</span>
            <span>
              <strong>{member.name}</strong>
              <small>{member.role}</small>
            </span>
            <ArrowDownRight size={20} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="team-feature">
        <div id="team-profile" aria-live="polite" aria-atomic="true">
          <motion.article
            key={person.name}
            className="team-profile"
            initial={reduced ? false : { opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <div className="team-profile-top">
              <span className="eyebrow">THE PEOPLE / 0{selected + 1}</span>
              <span className="team-initials" aria-hidden="true">
                {person.initials}
              </span>
            </div>
            <p className="team-role">{person.role}</p>
            <h3>{person.name}</h3>
            <p className="team-focus">{person.focus}</p>
            <p className="team-description">{person.description}</p>
            <div className="team-priorities">
              <span className="eyebrow">ROLE & FOCUS</span>
              <ul>
                {person.priorities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.article>
        </div>
        <div className="team-slide-controls">
          <span>
            0{selected + 1}
            <span> / 0{team.length}</span>
          </span>
          <div>
            <button
              type="button"
              aria-label="Previous team member"
              onClick={() =>
                setSelected((value) => (value + team.length - 1) % team.length)
              }
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next team member"
              onClick={() => setSelected((value) => (value + 1) % team.length)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
