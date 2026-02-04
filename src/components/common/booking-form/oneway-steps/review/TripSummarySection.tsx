import { Link2, Pencil, Triangle, Flag } from "lucide-react";
import { format, parse } from "date-fns";

type TripSummarySectionProps = {
  tripData?: {
    pickup_location?: string;
    dropoff_location?: string;
    pickup_date?: string;
    pickup_time?: string;
    arrival_time?: string;
    arrival_date?: string;
    duration?: string;
    trip_stops?: Array<{ location: string; estimated_time: number }>;
  };
  onEdit?: () => void;
};

const formatDateTime = (dateStr?: string, timeStr?: string) => {
  if (!dateStr || !timeStr) return "";
  try {
    const date = parse(dateStr, "yyyy-MM-dd", new Date());
    const [hours, minutes] = timeStr.split(":");
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hours, 10));
    dateTime.setMinutes(parseInt(minutes, 10));

    const formattedDate = format(dateTime, "d MMM yyyy");
    const formattedTime = format(dateTime, "h:mm a");
    return `${formattedDate} ${formattedTime}`;
  } catch {
    return "";
  }
};

export const TripSummarySection = ({
  tripData,
  onEdit,
}: TripSummarySectionProps) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-600">
            Your Trip Summary
          </h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">TRIP TYPE</p>
          <p className="text-base font-medium text-gray-900">One Way Trip</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-[0.65rem] top-6 bottom-6 w-1 bg-[#D3D9DF]" />

          {/* Origin - Depart From */}
          <div className="flex items-start gap-3 mb-4 relative">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]">
              <Triangle className="w-3 h-3 text-white fill-white rotate-180" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
              <p className="text-xs text-gray-500 uppercase mb-1">
                DEPART FROM
              </p>
              <p className="text-sm font-medium text-gray-900">
                {tripData?.pickup_location || "Pick-up location"}
              </p>
              {tripData?.pickup_date && tripData?.pickup_time && (
                <p className="text-xs text-gray-600 mt-1">
                  {formatDateTime(tripData.pickup_date, tripData.pickup_time)}
                </p>
              )}
            </div>
          </div>

          {/* Stops */}
          {tripData?.trip_stops &&
            tripData.trip_stops.map((stop, index) => (
              <div
                key={index}
                className="flex items-start gap-3 mb-4 relative"
              >
                <div className="w-3 h-3 rounded-full shrink-0 relative z-10 ml-2 mr-2 bg-[#7A8D9E]" />
                <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                  <p className="text-xs text-gray-500 uppercase mb-1">
                    STOPS ON THE WAY
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {stop.location}
                  </p>
                  {stop.estimated_time > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {stop.estimated_time} MIN
                    </p>
                  )}
                </div>
              </div>
            ))}

          {/* Destination - Arrive At */}
          <div className="flex items-start gap-3 mb-4 relative">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]">
              <Flag className="w-3 h-3 text-white fill-white" />
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
              <p className="text-xs text-gray-500 uppercase mb-1">ARRIVE AT</p>
              <p className="text-sm font-medium text-gray-900">
                {tripData?.dropoff_location || "Destination"}
              </p>
              {tripData?.arrival_date && tripData?.arrival_time ? (
                <p className="text-xs text-gray-600 mt-1">
                  {formatDateTime(tripData.arrival_date, tripData.arrival_time)}
                  {tripData.duration && ` (${tripData.duration})`}
                </p>
              ) : tripData?.pickup_date && tripData?.pickup_time ? (
                <p className="text-xs text-gray-600 mt-1">
                  {formatDateTime(tripData.pickup_date, tripData.pickup_time)}{" "}
                  (estimated)
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
