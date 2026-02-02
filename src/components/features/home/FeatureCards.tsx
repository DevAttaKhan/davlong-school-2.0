import { Calendar, MapPin, Users } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import type { ComponentType } from "react";

const FEATURES: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
}[] = [
  {
    icon: MapPin,
    title: "Pickup and drop-off at your door",
    description: "Convenient pickup & drop-off",
  },
  {
    icon: Calendar,
    title: "Travel on your own schedule",
    description: "Book on your schedule",
  },
  {
    icon: Users,
    title: "Comfortable travel for any group size",
    description: "From 8 to 70 passengers",
    className: "sm:col-span-2 lg:col-span-1",
  },
] as const;

export const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {FEATURES.map((feature) => (
        <FeatureCard
          key={feature.title}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          className={feature?.className || undefined}
        />
      ))}
    </div>
  );
};
