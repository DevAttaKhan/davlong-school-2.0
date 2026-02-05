import { Clock } from "lucide-react";

type TotalTripTimeSectionProps = {
  totalTripTime: string;
};

export const TotalTripTimeSection = ({
  totalTripTime,
}: TotalTripTimeSectionProps) => {
  return (
    <div className="w-fit rounded-xl border border-purple-200 bg-[#eae5ff] p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <Clock className="h-6 w-6 shrink-0 text-purple-600" strokeWidth={2} />
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-purple-600/80">
            TOTAL TRIP TIME
          </p>
          <p className="text-lg font-bold leading-tight text-gray-900">
            {totalTripTime}
          </p>
        </div>
      </div>
    </div>
  );
};
