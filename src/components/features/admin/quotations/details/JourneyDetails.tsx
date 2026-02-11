import { format } from "date-fns";
import { MapPin, Users, Navigation, Clock, Flag } from "lucide-react";
import type { ITripStop } from "@/types/lead.interface";

interface JourneyDetailsProps {
  title: string;
  from: string;
  to: string;
  date: string;
  passengers: number;
  distance?: string;
  duration?: string;
  stops?: ITripStop[];
  isReturn?: boolean;
}

export const JourneyDetails = ({
  title,
  from,
  to,
  date,
  passengers,
  distance = "N/A",
  duration = "N/A",
  stops = [],
  isReturn = false,
}: JourneyDetailsProps) => {
  const getFormattedDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    return isNaN(dateObj.getTime()) ? "Invalid Date" : format(dateObj, "dd MMM yyyy");
  };

  const getFormattedTime = (dateStr: string) => {
    if (!dateStr) return "N/A";
    const dateObj = new Date(dateStr);
    return isNaN(dateObj.getTime()) ? "N/A" : format(dateObj, "h:mm a");
  };

  const formattedDate = getFormattedDate(date);
  const formattedTime = getFormattedTime(date);

  return (
    <div className="space-y-4">
      <h3 className="text-blue-600 font-bold text-sm uppercase tracking-wider">
        {title}
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Timeline Section */}
        <div className="flex-1 relative">
          <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gray-200" />

          <div className="space-y-8">
            {/* Depart From */}
            <div className="flex items-start gap-4 relative">
              <div className="z-10 bg-white p-0.5">
                <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                  <Navigation className="w-3 h-3 text-white fill-white rotate-180" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                  DEPART FROM:
                </span>
                <p className="font-bold text-gray-900 leading-tight">{from}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formattedDate} {formattedTime}
                </p>
              </div>
            </div>

            {/* Stops */}
            {stops.length > 0 && (
              <div className="space-y-4">
                <div className="ml-9">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block mb-2">
                    {isReturn ? "RETURN STOPS:" : "OUTBOUND STOPS:"}
                  </span>
                </div>
                {stops.map((stop, index) => (
                  <div key={index} className="flex items-center gap-4 relative">
                    <div className="z-10 bg-white ml-[7px]">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <p className="text-sm text-gray-700">{stop.location}</p>
                      <span className="text-[10px] text-gray-400 uppercase font-bold">
                        {stop.estimated_time} MIN
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Arrive At / Return To */}
            <div className="flex items-start gap-4 relative">
              <div className="z-10 bg-white p-0.5">
                <div className="w-5 h-5 rounded-full bg-gray-400 flex items-center justify-center">
                  <Flag className="w-3 h-3 text-white fill-white" />
                </div>
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-gray-400 uppercase font-bold block mb-1">
                  {isReturn ? "RETURN TO:" : "ARRIVE AT:"}
                </span>
                <p className="font-bold text-gray-900 leading-tight">{to}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formattedDate} at {formattedTime} (estimated)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        {!isReturn && (
          <div className="w-full md:w-64 bg-gray-50/50 rounded-xl p-4 space-y-4 h-fit border border-gray-100/50">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                PASSENGERS
              </span>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{passengers}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                TOTAL DISTANCE
              </span>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{distance}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-bold uppercase">
                DURATION
              </span>
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{duration}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
