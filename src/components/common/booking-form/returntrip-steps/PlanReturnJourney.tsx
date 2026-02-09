import { useState, useEffect } from "react";
import { Undo2 } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { NoStopsConfirmationDialog } from "../trip-stops/NoStopsConfirmationDialog";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { JourneyStopDot } from "../oneway-steps/JourneyTimeline";
import { ReturnJourneyTimeline } from "../oneway-steps/ReturnJourneyTimeline";
import { StopComposer } from "../trip-stops/AddStopElements";
import { AddStopButton } from "../trip-stops/AddStopButton";
import { EditableLocationCard } from "../trip-stops/EditableLocationCard";
import { SameStopsToggle } from "./SameStopsToggle";
import type { LeadSchemaType } from "../oneway-steps/schema";

type PlanReturnJourneyProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition-colors";

export const PlanReturnJourney = ({
  nextStep,
  prevStep,
}: PlanReturnJourneyProps) => {
  const { watch, control, setValue, getValues } =
    useFormContext<LeadSchemaType>();

  // Get toggle state from form context (persists across navigation)
  const getToggleState = () => {
    const stored = getValues("return_trip.use_same_stops" as any);
    return stored === true || stored === "true";
  };

  const [useSameStops, setUseSameStops] = useState(() => getToggleState());
  const [hasToggled, setHasToggled] = useState(false);
  const [savedReturnStops, setSavedReturnStops] = useState<any[]>([]);
  const [editingPickup, setEditingPickup] = useState(false);
  const [editingDestination, setEditingDestination] = useState(false);
  const [tempPickupLocation, setTempPickupLocation] = useState("");
  const [tempDropoffLocation, setTempDropoffLocation] = useState("");
  const [showNoStopsDialog, setShowNoStopsDialog] = useState(false);

  const pickupLocation = watch("return_trip.pickup_location") ?? "";
  const dropoffLocation = watch("return_trip.dropoff_location") ?? "";
  const outboundStops = watch("outbound_trip.trip_stops") || [];
  const currentReturnStops = watch("return_trip.trip_stops") || [];

  const { fields, append, remove, replace } = useFieldArray<
    LeadSchemaType,
    "return_trip.trip_stops"
  >({
    control,
    name: "return_trip.trip_stops",
  });

  // When first landing on "plan return journey", ensure return trip shows reversed outbound:
  // pickup = outbound destination (where we pick them up), destination = outbound pickup (where we drop them off).
  // Only set when return locations are empty so user edits persist when switching forms.
  useEffect(() => {
    const outboundPickup = getValues("outbound_trip.pickup_location") ?? "";
    const outboundDropoff = getValues("outbound_trip.dropoff_location") ?? "";
    const returnPickup = getValues("return_trip.pickup_location") ?? "";
    const returnDropoff = getValues("return_trip.dropoff_location") ?? "";
    if (outboundPickup && outboundDropoff && !returnPickup && !returnDropoff) {
      setValue("return_trip.pickup_location", outboundDropoff);
      setValue("return_trip.dropoff_location", outboundPickup);
    }
  }, []);

  // Initialize toggle state from form context on mount and save original stops
  useEffect(() => {
    const storedToggleState = getToggleState();

    // Save original return stops BEFORE restoring toggle state
    // This ensures we have the original stops if toggle was previously OFF
    if (currentReturnStops.length > 0 && savedReturnStops.length === 0) {
      // Only save if stops don't match outbound stops (meaning they're original, not copied)
      const stopsMatchOutbound =
        outboundStops.length === currentReturnStops.length &&
        currentReturnStops.every(
          (stop, idx) => outboundStops[idx]?.location === stop.location
        );

      if (!stopsMatchOutbound) {
        setSavedReturnStops([...currentReturnStops]);
      }
    }

    // Restore toggle state from form context
    if (storedToggleState) {
      setUseSameStops(true);
      setHasToggled(true);
    }
  }, []); // Only run on mount

  // When toggle is enabled, copy stops from outbound trip
  useEffect(() => {
    if (useSameStops && outboundStops.length > 0) {
      // Copy stops from outbound trip when toggle is ON
      const copiedStops = outboundStops.map((stop, index) => ({
        ...stop,
        stop_order: index + 1,
        isEditing: false,
      }));
      replace(copiedStops);
    } else if (!useSameStops && hasToggled && savedReturnStops.length > 0) {
      // Restore original stops when toggle is turned OFF
      replace([...savedReturnStops]);
    } else if (!useSameStops && hasToggled && savedReturnStops.length === 0) {
      // Clear stops only if there were no original stops
      replace([]);
    }
  }, [useSameStops, outboundStops, replace, hasToggled, savedReturnStops]);

  const handleToggleChange = (newValue: boolean) => {
    setHasToggled(true);
    setUseSameStops(newValue);
    // Persist toggle state in form context
    setValue("return_trip.use_same_stops" as any, newValue, {
      shouldValidate: false,
    });
  };

  // Initialize temp values when editing starts
  useEffect(() => {
    if (editingPickup) {
      setTempPickupLocation(pickupLocation);
    }
  }, [editingPickup, pickupLocation]);

  useEffect(() => {
    if (editingDestination) {
      setTempDropoffLocation(dropoffLocation);
    }
  }, [editingDestination, dropoffLocation]);

  const handleEditPickup = () => {
    setEditingPickup(true);
    setTempPickupLocation(pickupLocation);
  };

  const handleSavePickup = () => {
    setValue("return_trip.pickup_location", tempPickupLocation);
    setEditingPickup(false);
  };

  const handleCancelPickup = () => {
    setEditingPickup(false);
    setTempPickupLocation(pickupLocation);
  };

  const handleEditDestination = () => {
    setEditingDestination(true);
    setTempDropoffLocation(dropoffLocation);
  };

  const handleSaveDestination = () => {
    setValue("return_trip.dropoff_location", tempDropoffLocation);
    setEditingDestination(false);
  };

  const handleCancelDestination = () => {
    setEditingDestination(false);
    setTempDropoffLocation(dropoffLocation);
  };

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

  const handleNext = () => {
    const hasStops = fields.length > 0;
    if (!hasStops) {
      setShowNoStopsDialog(true);
    } else {
      nextStep("dates-times");
    }
  };

  const handleProceedNoStops = () => {
    setShowNoStopsDialog(false);
    nextStep("dates-times");
  };

  const handleCancelNoStops = () => {
    setShowNoStopsDialog(false);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 py-6 sm:px-4 sm:py-8">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 pb-8 sm:pb-10">
        <StepHeader progressValue={STEP_PROGRESS.ADD_STOPS} onBack={prevStep} />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          {/* Header Section */}
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center">
              <div className="flex items-center justify-center rounded-full bg-[#2979FF] p-4">
                <Undo2 className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Let&apos;s plan your return trip
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4 mt-2">
              Tell us how you&apos;d like to come back — and if you want to stop
              anywhere along the way.
            </p>
          </div>

          {/* Extra Stops Section */}
          <div className="space-y-4 sm:space-y-6 max-w-[670px] mx-auto px-2 sm:px-0">
            <div className="space-y-4">
              <SameStopsToggle
                checked={useSameStops}
                onChange={handleToggleChange}
                disabled={outboundStops.length === 0}
              />

              {/* Journey Timeline with Editable Pickup and Destination */}
              <div className="mt-6">
                <ReturnJourneyTimeline
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  addStopButton={<AddStopButton onClick={handleAddStop} />}
                  onEditPickup={handleEditPickup}
                  onEditDestination={handleEditDestination}
                  editingPickup={editingPickup}
                  editingDestination={editingDestination}
                  pickupEditCard={
                    editingPickup ? (
                      <EditableLocationCard
                        title="What do you want final pickup to be?"
                        subtitle="This may be different from the address where we dropped you off."
                        value={tempPickupLocation}
                        onChange={setTempPickupLocation}
                        onCancel={handleCancelPickup}
                        onSave={handleSavePickup}
                        placeholder="Enter pickup address or Eircode..."
                      />
                    ) : undefined
                  }
                  destinationEditCard={
                    editingDestination ? (
                      <EditableLocationCard
                        title="What do you want final destination to be?"
                        subtitle="This may be different from the address where we picked you up."
                        value={tempDropoffLocation}
                        onChange={setTempDropoffLocation}
                        onCancel={handleCancelDestination}
                        onSave={handleSaveDestination}
                        placeholder="Enter destination address or Eircode..."
                      />
                    ) : undefined
                  }
                >
                  {/* Show all return stops: when toggle is ON they're synced from outbound; when OFF they're user-added */}
                  {fields.map((_, index) => (
                    <div
                      key={fields[index]?.id ?? index}
                      className="flex items-center space-x-3 mb-4 relative"
                    >
                      <JourneyStopDot />
                      <StopComposer
                        index={index}
                        onRemove={() => handleRemoveStop(index)}
                        tripPath="return_trip.trip_stops"
                      />
                    </div>
                  ))}
                </ReturnJourneyTimeline>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`flex justify-end mt-8 ${CONTENT_PADDING}`}>
          <button
            type="button"
            onClick={handleNext}
            disabled={!pickupLocation || !dropoffLocation}
            className={NEXT_BUTTON_CLASS}
          >
            <span>Next: Choose Dates & Times</span>
          </button>
        </div>
      </div>

      <NoStopsConfirmationDialog
        isOpen={showNoStopsDialog}
        onClose={handleCancelNoStops}
        onProceed={handleProceedNoStops}
      />
    </div>
  );
};
