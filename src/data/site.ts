export const company = {
  name: "BIT-WOLF Technologies",
  phone: "+92 317 0561010",
  tel: "+923170561010",
  whatsapp:
    "https://wa.me/923170561010?text=Hello%20BIT-WOLF%20Technologies%2C%20I%20would%20like%20to%20discuss%20a%20software%20development%20project.",
};
export const services = [
  {
    slug: "web-software-development",
    short: "Web & Software",
    title: "Web & Custom Software Development",
    description:
      "Purpose-built websites and software that turn your business ideas into exceptional digital experiences.",
    icon: "code",
    offerings: [
      "Professional business & corporate websites",
      "Custom web applications",
      "E-commerce platforms",
      "SaaS applications & admin dashboards",
      "Booking & appointment systems",
      "Inventory management & custom CRM",
      "API development & integration",
      "Website maintenance & optimization",
    ],
    tech: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
    ],
    cta: "Build Your Software",
  },
  {
    slug: "data-analytics",
    short: "Data Analytics & BI",
    title: "Data Analytics & Business Intelligence",
    description:
      "Turn your data into a clearer picture. Make confident decisions with dashboards and actionable insights.",
    icon: "chart",
    offerings: [
      "Custom analytics dashboards",
      "Business performance reporting",
      "Sales analytics & KPI monitoring",
      "Data visualization",
      "SQL-based reporting",
      "Data integration",
      "Operational reports",
      "Business intelligence dashboards",
    ],
    tech: ["SQL", "Data visualization", "REST APIs"],
    cta: "Explore Analytics Solutions",
  },
  {
    slug: "mobile-applications",
    short: "Mobile Applications",
    title: "Mobile Application Development",
    description:
      "Intuitive, high-performance mobile experiences that connect your business with people, wherever they are.",
    icon: "phone",
    offerings: [
      "Android & iOS applications",
      "Cross-platform applications",
      "Business mobile apps",
      "Booking & e-commerce apps",
      "Educational applications",
      "Delivery & tracking applications",
      "Mobile API & Firebase integration",
      "Mobile app maintenance",
    ],
    tech: ["Flutter", "Dart", "React Native", "Expo", "Firebase", "REST APIs"],
    cta: "Develop Your App",
  },
  {
    slug: "business-automation",
    short: "Business Automation",
    title: "Business Automation",
    description:
      "Less repetitive work. More possibilities. Connect your systems and make everyday operations flow.",
    icon: "workflow",
    offerings: [
      "Business workflow automation",
      "CRM & lead management automation",
      "Booking confirmations",
      "Email notifications",
      "API integrations",
      "Automated reporting",
      "Customer support & AI chatbot integrations",
      "Document & data processing workflows",
    ],
    tech: ["API integrations", "Node.js", "REST APIs"],
    cta: "Automate Your Business",
  },
  {
    slug: "cloud-database",
    short: "Cloud & Database",
    title: "Cloud & Database Solutions",
    description:
      "A reliable foundation for your next chapter. Thoughtful infrastructure that grows with your business.",
    icon: "cloud",
    offerings: [
      "Cloud deployment & hosting setup",
      "Database architecture",
      "MongoDB & PostgreSQL solutions",
      "Database integration & migration",
      "Backup configuration",
      "Application monitoring",
      "Cloud-based application deployment",
      "Performance optimization",
    ],
    tech: ["MongoDB", "PostgreSQL", "Cloud deployment"],
    cta: "Explore Cloud Solutions",
  },
] as const;
export const industries = [
  [
    "Healthcare",
    "Appointment systems, clinic websites, and management solutions.",
    "health",
  ],
  [
    "Education",
    "Learning platforms, school systems, and educational applications.",
    "education",
  ],
  [
    "Retail & E-Commerce",
    "Online stores, inventory tools, and connected shopping experiences.",
    "retail",
  ],
  [
    "Real Estate",
    "Property platforms, agency websites, and lead management.",
    "building",
  ],
  [
    "Professional Services",
    "Business websites, booking systems, and workflow automation.",
    "business",
  ],
  [
    "Startups & Entrepreneurs",
    "MVPs, SaaS products, and foundations built to evolve.",
    "rocket",
  ],
] as const;
export const process = [
  [
    "Discovery & Consultation",
    "We listen first. Together, we explore your objectives, users, and what success looks like.",
  ],
  [
    "Planning & Strategy",
    "A clear technical approach, defined scope, and practical milestones keep everyone aligned.",
  ],
  [
    "UI/UX Design",
    "Thoughtful wireframes and responsive interfaces put your users at the center.",
  ],
  [
    "Development",
    "We bring the solution to life with maintainable code and appropriate technology.",
  ],
  [
    "Testing & Quality Assurance",
    "Functionality, responsiveness, accessibility, and security checks prepare your product for launch.",
  ],
  [
    "Deployment & Support",
    "We launch, document, and support your solution through agreed maintenance services.",
  ],
];
