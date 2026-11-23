import {
  Code2,
  ChartNoAxesCombined,
  Smartphone,
  Workflow,
  Cloud,
  ShieldCheck,
  Layers,
  Sparkles,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Building2,
  BriefcaseBusiness,
  Rocket,
  Lightbulb,
  Check,
  Globe2,
} from "lucide-react";
const icons = {
  code: Code2,
  chart: ChartNoAxesCombined,
  phone: Smartphone,
  workflow: Workflow,
  cloud: Cloud,
  shield: ShieldCheck,
  layers: Layers,
  sparkles: Sparkles,
  health: HeartPulse,
  education: GraduationCap,
  retail: ShoppingBag,
  building: Building2,
  business: BriefcaseBusiness,
  rocket: Rocket,
  idea: Lightbulb,
  check: Check,
  globe: Globe2,
};
export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Component = icons[name as keyof typeof icons] || Code2;
  return (
    <Component
      className={className}
      size={24}
      strokeWidth={1.5}
      aria-hidden="true"
    />
  );
}
