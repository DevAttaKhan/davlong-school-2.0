import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { DatePicker, TimeInput } from "@/components/common";
import type { LeadSchemaType } from "./schema";
import "react-day-picker/dist/style.css";

type DatesTimesStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const DatesTimesStep = ({ nextStep, prevStep }: DatesTimesStepProps) => {
  const { control, watch, trigger } = useFormContext<LeadSchemaType>();

  const pickupLocation = watch("outbound_trip.pickup_location") ?? "";
  const dropoffLocation = watch("outbound_trip.dropoff_location") ?? "";
  const pickupDate = watch("outbound_trip.pickup_date");
  const pickupTime = watch("outbound_trip.pickup_time");

  const handleNext = async () => {
    const isValid = await trigger([
      "outbound_trip.pickup_date",
      "outbound_trip.pickup_time",
    ]);
    if (isValid) {
      nextStep("group-details");
    }
  };

  const isNextDisabled = !pickupDate || !pickupTime;

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        <StepHeader
          progressValue={STEP_PROGRESS.DATES_TIMES}
          onBack={prevStep}
        />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          {/* Header Section */}
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center">
              <div className="bg-[#0a67e7] p-4 rounded-full">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              When do you want to travel?
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4 mt-2">
              Pick the times for your trip so we can calculate your journey.
            </p>
          </div>

          {/* Date & Time Selection Section */}
          <div className="max-w-[670px] mx-auto space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Departure date & time
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                When should we pick you up from {pickupLocation}? Choose the
                date and time you want to start your trip.
              </p>

              {/* Date and Time Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-4 mb-4">
                {/* Date Picker */}
                <Controller
                  name="outbound_trip.pickup_date"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select date"
                      error={fieldState.error?.message}
                    />
                  )}
                />

                {/* Time Input */}
                <Controller
                  name="outbound_trip.pickup_time"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TimeInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="--:--"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              {/* Info Box - Select date & time to calculate */}
              {pickupDate && pickupTime && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center gap-3 mb-4">
                  <ArrowRight className="w-5 h-5 text-gray-600 shrink-0" />
                  <p className="text-sm text-gray-700">
                    → Select date & time to calculate arrival time at{" "}
                    {dropoffLocation}
                  </p>
                </div>
              )}

              {/* Full Trip Duration Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-purple-900 mb-1">
                    Full Trip Duration:
                  </p>
                  <p className="text-sm text-purple-800">
                    We&apos;ll confirm the exact times once your booking is
                    final.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 text-center">
                All times are estimates and will be confirmed when your booking
                is finalized.
              </p>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className={`flex justify-end mt-8 ${CONTENT_PADDING}`}>
          <button
            type="button"
            onClick={handleNext}
            disabled={isNextDisabled}
            className={NEXT_BUTTON_CLASS}
          >
            <span>Next: Add Group Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
