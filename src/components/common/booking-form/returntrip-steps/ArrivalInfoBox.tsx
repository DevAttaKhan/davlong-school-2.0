import type { ReactNode } from "react";

type ArrivalInfoBoxProps = {
  icon: ReactNode;
  isLoading: boolean;
  error: boolean;
  formattedArrival: string | null;
  destinationLabel: string;
  stopsCount: number;
  /** Use "back at" for return leg, "at" for outbound */
  isReturn?: boolean;
};

const ERROR_MESSAGE =
  "Error calculating route. Please check your locations and try again.";
const LOADING_MESSAGE = "Calculating arrival time...";

export const ArrivalInfoBox = ({
  icon,
  isLoading,
  error,
  formattedArrival,
  destinationLabel,
  stopsCount,
  isReturn = false,
}: ArrivalInfoBoxProps) => {
  const arrivalPreposition = isReturn ? "back at" : "at";

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
      <span className="mt-0.5 shrink-0 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-gray-600">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        {isLoading ? (
          <p className="text-sm text-gray-700">{LOADING_MESSAGE}</p>
        ) : error ? (
          <p className="text-sm text-red-600">{ERROR_MESSAGE}</p>
        ) : formattedArrival ? (
          <p className="text-sm text-gray-700">
            Your estimated time of arrival {arrivalPreposition}{" "}
            <span className="font-semibold text-gray-900">
              {destinationLabel}
            </span>{" "}
            is{" "}
            <span className="font-semibold text-gray-900">
              {formattedArrival}
            </span>{" "}
            including{" "}
            <span className="font-semibold text-gray-900">
              {stopsCount} stops
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-700">
            Select date & time to calculate arrival time at {destinationLabel}
          </p>
        )}
      </div>
    </div>
  );
};
