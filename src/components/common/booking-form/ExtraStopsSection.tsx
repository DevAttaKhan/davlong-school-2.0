import { JourneyTimeline, JourneyStopDot } from "./oneway-steps/JourneyTimeline";
import { StopComposer } from "./trip-stops/AddStopElements";
import { AddStopButton } from "./trip-stops/AddStopButton";

type ExtraStopsSectionProps = {
  pickupLocation: string;
  dropoffLocation: string;
  /** Fields from useFieldArray for trip_stops */
  fields: Array<{ id?: string } & Record<string, unknown>>;
  /** Form path for the trip stops, e.g. "outbound_trip.trip_stops" or "return_trip.trip_stops" */
  tripPath: "outbound_trip.trip_stops" | "return_trip.trip_stops";
  onAddStop: () => void;
  onRemoveStop: (index: number) => void;
};

export const ExtraStopsSection = ({
  pickupLocation,
  dropoffLocation,
  fields,
  tripPath,
  onAddStop,
  onRemoveStop,
}: ExtraStopsSectionProps) => {
  const hasLocations = Boolean(pickupLocation && dropoffLocation);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Extra stops along the way
        </h2>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            Do you want to make any stops on the way?
          </p>
          <p className="text-sm text-gray-600">
            Add any places you&apos;d like to stop before reaching your
            destination.
          </p>
          <p className="text-sm text-gray-600">
            Set the time you&apos;ll stop there, or leave it at 0 if it&apos;s
            just a quick pick-up.
          </p>
        </div>
      </div>

      {hasLocations ? (
        <div className="mt-6">
          <JourneyTimeline
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            addStopButton={<AddStopButton onClick={onAddStop} />}
          >
            {fields.map((_, index) => (
              <div
                key={fields[index]?.id ?? index}
                className="relative mb-4 flex items-center space-x-3"
              >
                <JourneyStopDot />
                <StopComposer
                  index={index}
                  onRemove={() => onRemoveStop(index)}
                  tripPath={tripPath}
                />
              </div>
            ))}
          </JourneyTimeline>
        </div>
      ) : (
        <div className="mt-4">
          <div className="mt-4">
            <button
              type="button"
              onClick={onAddStop}
              disabled
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-[13px] text-gray-400 disabled:cursor-not-allowed disabled:opacity-100 disabled:hover:bg-white"
            >
              <span className="text-lg">+</span>
              <span>Add a Stop</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
