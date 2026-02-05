import { Clock } from "lucide-react";

type TimeAtDestinationSectionProps = {
  timeAtDestination: {
    days: number;
    hours: number;
    minutes: number;
  };
};

export const TimeAtDestinationSection = ({
  timeAtDestination,
}: TimeAtDestinationSectionProps) => {
  const { days, hours, minutes } = timeAtDestination;

  const formatDuration = () => {
    const parts: string[] = [];
    if (days > 0) {
      parts.push(`${days} ${days === 1 ? "day" : "days"}`);
    }
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? "hr" : "hrs"}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} min`);
    }
    return parts.join(" ");
  };

  return (
    <div className="w-fit rounded-xl border border-purple-200 bg-[#eae5ff] p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <Clock className="h-6 w-6 shrink-0 text-purple-600" strokeWidth={2} />
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-purple-600/80">
            TIME SPENT AT YOUR DESTINATION
          </p>
          <p className="text-lg font-bold leading-tight text-gray-900">
            {formatDuration()}
          </p>
        </div>
      </div>
    </div>
  );
};
