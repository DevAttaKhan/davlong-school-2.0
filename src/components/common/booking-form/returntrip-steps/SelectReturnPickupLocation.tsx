import { clsx } from "clsx";
import { MapPin, X } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { LocationField } from "../LocationField";
import { StepProgressBar } from "../StepProgressBar";
import { DoubleCheckAddressesBox } from "../DoubleCheckAddressesBox";
import { ExtraStopsSection } from "../ExtraStopsSection";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import type { LeadSchemaType } from "../oneway-steps/schema";

type SelectReturnPickupLocationProps = {
  nextStep: (nextStep?: string) => void;
  prevStep: () => void;
};

const BACK_BUTTON_CLASS =
  "text-blue-600 text-xs sm:text-sm hover:text-blue-700 transition-colors duration-200 px-1.5 sm:px-3 py-1.5 rounded-full border border-blue-600 bg-white";

const CANCEL_BUTTON_CLASS =
  "flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors";

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const SelectReturnPickupLocation = ({
  nextStep,
  prevStep,
}: SelectReturnPickupLocationProps) => {
  "use no memo";
  const {
    setValue,
    watch,
    trigger,
    control,
    formState: { errors },
  } = useFormContext<LeadSchemaType>();

  const pickupLocation = watch("outbound_trip.pickup_location");
  const dropoffLocation = watch("outbound_trip.dropoff_location");

  const { fields, append, remove } = useFieldArray<
    LeadSchemaType,
    "outbound_trip.trip_stops"
  >({
    control,
    name: "outbound_trip.trip_stops",
  });

  const handleAddStop = () => {
    append({
      isEditing: true,
      estimated_time: 0,
      location: "",
      stop_order: fields.length + 1,
    });
  };

  const handleRemoveStop = (index: number) => {
    remove(index);
  };

  const validateLocations = async () => {
    const isValid = await trigger([
      "outbound_trip.pickup_location",
      "outbound_trip.dropoff_location",
    ]);
    return isValid;
  };

  const handleNextStep = () => {
    validateLocations().then((isValid) => {
      if (isValid) {
        // Save all stops by setting isEditing to false for any stops still in edit mode
        fields.forEach((_, index) => {
          const stop = watch(`outbound_trip.trip_stops.${index}`);
          if (stop?.isEditing && stop?.location) {
            setValue(`outbound_trip.trip_stops.${index}.isEditing`, false);
          }
        });
        // "Let's plan your trip" is stored in outbound_trip and never overwritten by return trip.
        // When moving to "plan return journey", initialize return_trip from reversed outbound
        // only if return trip locations are not yet set (so user's return edits persist when switching forms).
        const outboundPickup = watch("outbound_trip.pickup_location") ?? "";
        const outboundDropoff = watch("outbound_trip.dropoff_location") ?? "";
        const returnPickup = watch("return_trip.pickup_location") ?? "";
        const returnDropoff = watch("return_trip.dropoff_location") ?? "";
        if (!returnPickup && !returnDropoff) {
          setValue("return_trip.pickup_location", outboundDropoff);
          setValue("return_trip.dropoff_location", outboundPickup);
        }
        nextStep("plan-return-journey");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-6 sm:px-4 sm:py-8">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 pb-8 sm:pb-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={prevStep}
            className={BACK_BUTTON_CLASS}
          >
            <span className="hidden sm:inline">← Back</span>
            <span className="sm:hidden">←</span>
          </button>

          <StepProgressBar value={STEP_PROGRESS.PICKUP_LOCATION} />

          <button
            type="button"
            onClick={() => (window.location.href = "/")}
            className={CANCEL_BUTTON_CLASS}
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        </div>

        {/* Main Content */}
        <div
          className={clsx(CONTENT_PADDING, "mt-6 sm:mt-8 md:mt-10 space-y-8")}
        >
          {/* Icon and Title */}
          <div className="text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-b from-blue-700 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h1 className="text-3xl font-semibold leading-[110%] tracking-tight text-blue-900 text-center">
              Let's plan your trip
            </h1>
            <p className="text-sm font-normal leading-[145%] tracking-tight text-center text-gray-600 mt-1">
              Tell us where your trip begins, where you're going, and whether you need any stops along the way.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <LocationField
              label="Pick-up location"
              description={
                <>
                  Where should we pick you up? <br />
                  Please enter the exact address or Eircode where your trip will begin.
                  <br />
                  (Example: West Cork Hotel Skibbereen or P81 FH63)
                </>
              }
              value={pickupLocation}
              onChange={(value) => {
                setValue("outbound_trip.pickup_location", value);
              }}
              error={errors.outbound_trip?.pickup_location?.message}
              placeholder="Enter pickup address or Eircode..."
            />

            <LocationField
              label="Destination"
              description="Where are you going? Type the exact address or Eircode of your destination."
              value={dropoffLocation}
              onChange={(value) => {
                setValue("outbound_trip.dropoff_location", value);
              }}
              error={errors.outbound_trip?.dropoff_location?.message}
              placeholder="Enter destination address or Eircode..."
            />

            <DoubleCheckAddressesBox />

            <ExtraStopsSection
              pickupLocation={pickupLocation ?? ""}
              dropoffLocation={dropoffLocation ?? ""}
              fields={fields}
              tripPath="outbound_trip.trip_stops"
              onAddStop={handleAddStop}
              onRemoveStop={handleRemoveStop}
            />
          </div>
        </div>

        {/* Footer */}
        <div className={clsx("flex justify-end mt-8", CONTENT_PADDING)}>
          <button
            type="button"
            onClick={handleNextStep}
            disabled={!pickupLocation || !dropoffLocation}
            className={NEXT_BUTTON_CLASS}
          >
            Next: Plan Return Journey
          </button>
        </div>
      </div>
    </div>
  );
};
