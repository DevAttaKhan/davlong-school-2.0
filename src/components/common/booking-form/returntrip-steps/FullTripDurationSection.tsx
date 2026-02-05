import { Clock } from "lucide-react";

type FullTripDurationSectionProps = {
  /** Formatted duration e.g. "24:29 hrs", or null while calculating */
  fullTripDuration: string | null;
};

export const FullTripDurationSection = ({
  fullTripDuration,
}: FullTripDurationSectionProps) => {
  return (
    <div className="mb-4 rounded-lg border border-purple-200 bg-purple-50 p-4">
      <div className="mb-2 flex items-center justify-center gap-2">
        <Clock className="h-5 w-5 text-purple-600" />
        <p className="text-sm font-semibold text-purple-900">
          Full Trip Duration:{" "}
          {fullTripDuration ? (
            <span className="text-purple-800">
              {fullTripDuration} (estimated)
            </span>
          ) : (
            <span className="text-purple-800">Calculating...</span>
          )}
        </p>
      </div>
      <p className="text-center text-sm text-purple-800">
        We&apos;ll confirm the exact times once your booking is final.
      </p>
    </div>
  );
};
