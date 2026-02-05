import { Flag, Triangle, Pencil, MapPin } from "lucide-react";
import { clsx } from "clsx";

type JourneyTimelineProps = {
  pickupLocation: string;
  dropoffLocation: string;
  children?: React.ReactNode;
  addStopButton: React.ReactNode;
  onEditPickup?: () => void;
  onEditDestination?: () => void;
};

const TIMELINE_LINE_CLASS =
  "absolute left-[0.65rem] top-6 bottom-6 w-1 bg-[#D3D9DF]";
const ORIGIN_DOT_CLASS =
  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]";
const STOP_DOT_CLASS =
  "w-3 h-3 rounded-full shrink-0 relative z-10 ml-2 mr-2 bg-[#7A8D9E]";
const DESTINATION_DOT_CLASS =
  "w-6 h-6 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#D3D9DF]";
const LOCATION_BOX_CLASS = "flex-1 bg-gray-100 rounded-lg px-3 py-2.5";

export const JourneyTimeline = ({
  pickupLocation,
  dropoffLocation,
  children,
  addStopButton,
  onEditPickup,
  onEditDestination,
}: JourneyTimelineProps) => {
  return (
    <div className="relative">
      <div className={TIMELINE_LINE_CLASS} />

      {/* Origin */}
      <div className="flex items-center gap-3 mb-4 relative">
        <div className={ORIGIN_DOT_CLASS}>
          <Triangle className="w-3 h-3 text-white fill-white rotate-180" />
        </div>
        <div className={clsx(LOCATION_BOX_CLASS, "min-w-0 relative group")}>
          {pickupLocation ? (
            <>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-gray-900 truncate block">
                  {pickupLocation}
                </span>
              </div>
              {onEditPickup && (
                <button
                  type="button"
                  onClick={onEditPickup}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Pencil className="w-3 h-3 text-blue-600" />
                </button>
              )}
            </>
          ) : (
            <span className="text-sm font-medium text-gray-500">
              Pick-up location
            </span>
          )}
        </div>
      </div>

      {/* Stops */}
      {children}

      {/* Add Stop button */}
      <div className="flex items-center gap-3 py-4 ml-8">{addStopButton}</div>

      {/* Destination */}
      <div className="flex items-center gap-3 mb-4 relative">
        <div className={DESTINATION_DOT_CLASS}>
          <Flag className="w-3 h-3 text-white fill-white" />
        </div>
        <div className={clsx(LOCATION_BOX_CLASS, "min-w-0 relative group")}>
          {dropoffLocation ? (
            <>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-gray-900 truncate block">
                  {dropoffLocation}
                </span>
              </div>
              {onEditDestination && (
                <button
                  type="button"
                  onClick={onEditDestination}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Pencil className="w-3 h-3 text-blue-600" />
                </button>
              )}
            </>
          ) : (
            <span className="text-sm font-medium text-gray-500">
              Destination
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const JourneyStopDot = () => <div className={STOP_DOT_CLASS} />;
