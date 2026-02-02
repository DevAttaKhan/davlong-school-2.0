import type { ComponentType } from "react";

type FeatureCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  className?: string;
};

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  className = "",
}: FeatureCardProps) => {
  return (
    <div
      className={`bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 ${className}`}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white mx-auto mb-2 sm:mb-3" />
      <span className="text-white font-semibold text-sm sm:text-base">
        {title}
      </span>
      <p className="text-white/80 text-xs sm:text-sm mt-1 sm:mt-2">
        {description}
      </p>
    </div>
  );
};
