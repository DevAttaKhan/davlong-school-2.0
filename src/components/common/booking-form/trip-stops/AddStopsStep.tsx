import { ArrowSharpRight } from "@/assets/icons";
import { StepHeader } from "../StepHeader";
import { JourneyTimeline, JourneyStopDot } from "../oneway-steps/JourneyTimeline";
import { StopComposer } from "./AddStopElements";
import { AddStopButton } from "./AddStopButton";
import { ExtraStopsInfo } from "./ExtraStopsInfo";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type LeadSchemaType } from "../oneway-steps/schema";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";

type AddStopsStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 transition-colors";

export const AddStopsStep = ({ nextStep, prevStep }: AddStopsStepProps) => {
  const { control, watch, getValues } = useFormContext<LeadSchemaType>();

  const { fields, append, remove } = useFieldArray<
    LeadSchemaType,
    "outbound_trip.trip_stops"
  >({
    control,
    name: "outbound_trip.trip_stops",
  });

  const pickupLocation = watch("outbound_trip.pickup_location") ?? "";
  const dropoffLocation = watch("outbound_trip.dropoff_location") ?? "";

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

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        <StepHeader progressValue={STEP_PROGRESS.ADD_STOPS} onBack={prevStep} />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center">
              <div className="bg-[#0a67e7] p-4 rounded-full">
                <ArrowSharpRight
                  width={28}
                  height={28}
                  className="text-white"
                />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Outbound Journey
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4">
              Let&apos;s plan your outbound journey in more details.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 max-w-[670px] mx-auto px-2 sm:px-0">
            <ExtraStopsInfo />

            <div className="space-y-4">
              <JourneyTimeline
                pickupLocation={pickupLocation}
                dropoffLocation={dropoffLocation}
                addStopButton={<AddStopButton onClick={handleAddStop} />}
              >
                {fields.map((_, index) => (
                  <div
                    key={fields[index]?.id ?? index}
                    className="flex items-center space-x-3 mb-4 relative"
                  >
                    <JourneyStopDot />
                    <StopComposer
                      index={index}
                      onRemove={() => handleRemoveStop(index)}
                    />
                  </div>
                ))}
              </JourneyTimeline>
            </div>
          </div>
        </div>

        <div className={`flex justify-end mt-8 ${CONTENT_PADDING}`}>
          <button
            type="button"
            onClick={() => {
              nextStep("dates-times");
              console.log(getValues());
            }}
            className={NEXT_BUTTON_CLASS}
          >
            <span>Next: Choose Dates & Times</span>
          </button>
        </div>
      </div>
    </div>
  );
};
