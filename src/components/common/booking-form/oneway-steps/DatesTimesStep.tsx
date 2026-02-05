import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { DatePicker, TimeInput } from "@/components/common";
import { useLazyGetDateTimeQuery } from "@/store/apis/map.api";
import { format, parse } from "date-fns";
import { useMemo, useEffect } from "react";
import type { LeadSchemaType } from "./schema";
import "react-day-picker/dist/style.css";

type DatesTimesStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const DatesTimesStep = ({ nextStep, prevStep }: DatesTimesStepProps) => {
  const { control, watch, trigger, setValue } = useFormContext<LeadSchemaType>();

  const pickupLocation = watch("outbound_trip.pickup_location") ?? "";
  const dropoffLocation = watch("outbound_trip.dropoff_location") ?? "";
  const pickupDate = watch("outbound_trip.pickup_date");
  const pickupTime = watch("outbound_trip.pickup_time");
  const tripStops = watch("outbound_trip.trip_stops") || [];

  // Build waypoints from trip stops
  const waypoints = useMemo(
    () =>
      tripStops
        .filter((stop) => stop.location && stop.location.trim() !== "")
        .map((stop) => stop.location),
    [tripStops]
  );

  // Create departure time ISO string
  const departureTimeISO = useMemo(() => {
    if (!pickupDate || !pickupTime) return undefined;
    return new Date(`${pickupDate}T${pickupTime}:00`).toISOString();
  }, [pickupDate, pickupTime]);

  // Call API when all required fields are present
  const [getDateTime, { data: dateTimeData, isLoading: isCalculating }] =
    useLazyGetDateTimeQuery();

  // Calculate route data using useMemo
  const { distance, time } = useMemo(() => {
    if (!dateTimeData) {
      return { distance: undefined, time: undefined };
    }

    return {
      distance: dateTimeData.distance,
      time: {
        arrivalTime: dateTimeData.arrivalTime,
        arrivalDate: dateTimeData.arrivalDate,
        duration: dateTimeData.duration,
      },
    };
  }, [dateTimeData]);

  // Fetch data when date/time changes
  useEffect(() => {
    if (pickupLocation && dropoffLocation && pickupDate && pickupTime) {
      const timer = setTimeout(() => {
        getDateTime({
          origin: pickupLocation,
          destination: dropoffLocation,
          waypoints: waypoints.length > 0 ? waypoints : undefined,
          departureTime: departureTimeISO,
          tripStops: tripStops.filter(
            (stop) => stop.location && stop.location.trim() !== ""
          ),
        });
      }, 500); // Debounce

      return () => clearTimeout(timer);
    }
  }, [
    pickupLocation,
    dropoffLocation,
    pickupDate,
    pickupTime,
    waypoints,
    departureTimeISO,
    tripStops,
    getDateTime,
  ]);

  // Set form values when time data is calculated
  useEffect(() => {
    if (time) {
      setValue("outbound_trip.arrival_time", time.arrivalTime, {
        shouldValidate: false,
      });
      setValue("outbound_trip.arrival_date", time.arrivalDate, {
        shouldValidate: false,
      });
      setValue("outbound_trip.duration", time.duration, {
        shouldValidate: false,
      });
    }
    if (distance !== undefined) {
      setValue("outbound_trip.distance", distance, { shouldValidate: false });
    }
  }, [time, distance, setValue]);

  // Format date and time for display
  const formatArrivalDateTime = useMemo(() => {
    if (!time?.arrivalDate || !time?.arrivalTime) return null;
    try {
      const date = parse(time.arrivalDate, "yyyy-MM-dd", new Date());
      const [hours, minutes] = time.arrivalTime.split(":");
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours, 10));
      dateTime.setMinutes(parseInt(minutes, 10));

      const formattedDate = format(dateTime, "d MMM yyyy");
      const formattedTime = format(dateTime, "h:mm a");
      return `${formattedDate} at ${formattedTime}`;
    } catch {
      return null;
    }
  }, [time]);


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
    <div className="min-h-screen bg-[#f9fafb] px-2 py-6 sm:px-4 sm:py-8">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 pb-8 sm:pb-10">
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

              {/* Info Box - Estimated Arrival Time */}
              {pickupDate && pickupTime && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                  <ArrowRight className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    {isCalculating ? (
                      <p className="text-sm text-gray-700">
                        Calculating arrival time...
                      </p>
                    ) : formatArrivalDateTime ? (
                      <p className="text-sm text-gray-700">
                        Your estimated time of arrival at{" "}
                        <span className="text-blue-600 font-medium">
                          {dropoffLocation}
                        </span>{" "}
                        is{" "}
                        <span className="font-semibold">
                          {formatArrivalDateTime}
                        </span>{" "}
                        including{" "}
                        <span className="font-semibold">
                          {waypoints.length} stops
                        </span>
                        .
                      </p>
                    ) : (
                      <p className="text-sm text-gray-700">
                        Select date & time to calculate arrival time at{" "}
                        {dropoffLocation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Full Trip Duration Info */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-3 mb-4">
                <Clock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-purple-900 mb-1">
                    Full Trip Duration:{" "}
                    {time?.duration && (
                      <span className="text-purple-800">
                        {time.duration} (estimated)
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-purple-800">
                    {time?.duration
                      ? "We'll confirm the exact times once your booking is final."
                      : "We'll confirm the exact times once your booking is final."}
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
