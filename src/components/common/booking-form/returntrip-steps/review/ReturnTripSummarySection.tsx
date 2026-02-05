import { Link2, Pencil, Triangle, Flag, ArrowDown } from "lucide-react";
import { format, parse } from "date-fns";
import { TimeAtDestinationSection } from "./TimeAtDestinationSection.tsx";
import { TotalTripTimeSection } from "./TotalTripTimeSection.tsx";

type TripData = {
  pickup_location?: string;
  dropoff_location?: string;
  pickup_date?: string;
  pickup_time?: string;
  arrival_time?: string;
  arrival_date?: string;
  duration?: string;
  trip_stops?: Array<{ location: string; estimated_time: number }>;
};

type ReturnTripSummarySectionProps = {
  outboundTrip?: TripData;
  returnTrip?: TripData;
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

// Calculate time spent at destination
const calculateTimeAtDestination = (
  outboundArrivalDate?: string,
  outboundArrivalTime?: string,
  returnPickupDate?: string,
  returnPickupTime?: string
) => {
  if (
    !outboundArrivalDate ||
    !outboundArrivalTime ||
    !returnPickupDate ||
    !returnPickupTime
  ) {
    return null;
  }

  try {
    const arrivalDate = parse(outboundArrivalDate, "yyyy-MM-dd", new Date());
    const [arrivalHours, arrivalMinutes] = outboundArrivalTime.split(":");
    const arrivalDateTime = new Date(arrivalDate);
    arrivalDateTime.setHours(parseInt(arrivalHours, 10));
    arrivalDateTime.setMinutes(parseInt(arrivalMinutes, 10));

    const returnDate = parse(returnPickupDate, "yyyy-MM-dd", new Date());
    const [returnHours, returnMinutes] = returnPickupTime.split(":");
    const returnDateTime = new Date(returnDate);
    returnDateTime.setHours(parseInt(returnHours, 10));
    returnDateTime.setMinutes(parseInt(returnMinutes, 10));

    const diffMs = returnDateTime.getTime() - arrivalDateTime.getTime();
    if (diffMs < 0) return null;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  } catch {
    return null;
  }
};

// Full trip duration = total hours from outbound departure to return arrival (wall-clock time)
const calculateTotalTripTime = (
  outboundTrip?: TripData,
  returnTrip?: TripData
): string | null => {
  if (
    !outboundTrip?.pickup_date ||
    !outboundTrip?.pickup_time ||
    !returnTrip?.arrival_date ||
    !returnTrip?.arrival_time
  ) {
    return null;
  }

  try {
    const outboundStart = new Date(
      `${outboundTrip.pickup_date}T${outboundTrip.pickup_time}:00`
    ).getTime();
    const returnArrival = new Date(
      `${returnTrip.arrival_date}T${returnTrip.arrival_time}:00`
    ).getTime();

    const totalMs = returnArrival - outboundStart;
    if (totalMs < 0) return null;

    const totalSeconds = Math.round(totalMs / 1000);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    return `${totalHours}:${totalMinutes.toString().padStart(2, "0")} hrs`;
  } catch {
    return null;
  }
};

export const ReturnTripSummarySection = ({
  outboundTrip,
  returnTrip,
  onEdit,
}: ReturnTripSummarySectionProps) => {
  const timeAtDestination = calculateTimeAtDestination(
    outboundTrip?.arrival_date,
    outboundTrip?.arrival_time,
    returnTrip?.pickup_date,
    returnTrip?.pickup_time
  );

  const totalTripTime = calculateTotalTripTime(outboundTrip, returnTrip);

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

      <div className="space-y-6">
        {/* Trip Type */}
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">TRIP TYPE</p>
          <p className="text-base font-medium text-gray-900">Return Trip</p>
        </div>

        {/* Trip to Destination Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Trip to Destination
          </h3>

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
                  DEPART FROM:
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {outboundTrip?.pickup_location || "Pick-up location"}
                </p>
                {outboundTrip?.pickup_date && outboundTrip?.pickup_time && (
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDateTime(
                      outboundTrip.pickup_date,
                      outboundTrip.pickup_time
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Stops */}
            {outboundTrip?.trip_stops &&
              outboundTrip.trip_stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 mb-4 relative"
                >
                  <div className="w-3 h-3 rounded-full shrink-0 relative z-10 ml-2 mr-2 bg-[#7A8D9E]" />
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      STOPS ON THE WAY:
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {stop.location}
                      </p>
                      {stop.estimated_time > 0 && (
                        <p className="text-xs text-gray-500 ml-2">
                          {stop.estimated_time} MIN
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {/* Destination - Arrive At */}
            <div className="flex items-start gap-3 mb-4 relative">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]">
                <ArrowDown className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  ARRIVE AT:
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {outboundTrip?.dropoff_location || "Destination"}
                </p>
                {outboundTrip?.arrival_date && outboundTrip?.arrival_time ? (
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDateTime(
                      outboundTrip.arrival_date,
                      outboundTrip.arrival_time
                    )}{" "}
                    (estimated)
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Time Spent at Destination */}
        {timeAtDestination && (
          <TimeAtDestinationSection timeAtDestination={timeAtDestination} />
        )}

        {/* Your trip back home Section */}
        <div>
          <h3 className="text-lg font-semibold text-blue-600 mb-4">
            Your trip back home
          </h3>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[0.65rem] top-6 bottom-6 w-1 bg-[#D3D9DF]" />

            {/* Origin - Depart From (Return) */}
            <div className="flex items-start gap-3 mb-4 relative">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]">
                <Flag className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  DEPART FROM:
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {returnTrip?.pickup_location || "Pick-up location"}
                </p>
                {returnTrip?.pickup_date && returnTrip?.pickup_time && (
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDateTime(
                      returnTrip.pickup_date,
                      returnTrip.pickup_time
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Return Stops */}
            {returnTrip?.trip_stops &&
              returnTrip.trip_stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 mb-4 relative"
                >
                  <div className="w-3 h-3 rounded-full shrink-0 relative z-10 ml-2 mr-2 bg-[#7A8D9E]" />
                  <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                    <p className="text-xs text-gray-500 uppercase mb-1">
                      RETURN STOPS:
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {stop.location}
                      </p>
                      {stop.estimated_time > 0 && (
                        <p className="text-xs text-gray-500 ml-2">
                          {stop.estimated_time} MIN
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            {/* Destination - Return To */}
            <div className="flex items-start gap-3 mb-4 relative">
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]">
                <ArrowDown className="w-3 h-3 text-white fill-white" />
              </div>
              <div className="flex-1 bg-gray-100 rounded-lg px-3 py-2.5 min-w-0">
                <p className="text-xs text-gray-500 uppercase mb-1">
                  RETURN TO:
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {returnTrip?.dropoff_location || "Destination"}
                </p>
                {returnTrip?.arrival_date && returnTrip?.arrival_time ? (
                  <p className="text-xs text-gray-600 mt-1">
                    {formatDateTime(
                      returnTrip.arrival_date,
                      returnTrip.arrival_time
                    )}{" "}
                    (estimated)
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Total Trip Time */}
        {totalTripTime && (
          <TotalTripTimeSection totalTripTime={totalTripTime} />
        )}
      </div>
    </div>
  );
};
