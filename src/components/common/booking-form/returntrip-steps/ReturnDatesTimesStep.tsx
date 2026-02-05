import { ArrowRight, ArrowLeft, Calendar, Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { FullTripDurationSection } from "./FullTripDurationSection";
import { LegDateTimeSection } from "./LegDateTimeSection";
import { useLazyGetDateTimeQuery } from "@/store/apis/map.api";
import { format, parse } from "date-fns";
import { useMemo, useEffect } from "react";
import type { LeadSchemaType } from "../oneway-steps/schema";
import "react-day-picker/dist/style.css";

type ReturnDatesTimesStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const ReturnDatesTimesStep = ({ nextStep, prevStep }: ReturnDatesTimesStepProps) => {
  const { control, watch, trigger, setValue } = useFormContext<LeadSchemaType>();

  // First form ("Let's plan your trip") data is stored in outbound_trip and never overwritten
  // by edits on "Let's plan your return trip". So departure always uses first form data.
  const outboundPickupLocation = watch("outbound_trip.pickup_location") ?? "";
  const outboundDropoffLocation = watch("outbound_trip.dropoff_location") ?? "";
  const outboundPickupDate = watch("outbound_trip.pickup_date");
  const outboundPickupTime = watch("outbound_trip.pickup_time");
  const outboundTripStopsRaw = watch("outbound_trip.trip_stops") || [];

  // Return journey uses return_trip (user can change pickup/destination on "Let's plan your return trip")
  const returnPickupLocation = watch("return_trip.pickup_location") ?? "";
  const returnDropoffLocation = watch("return_trip.dropoff_location") ?? "";
  const returnPickupDate = watch("return_trip.pickup_date");
  const returnPickupTime = watch("return_trip.pickup_time");
  const returnTripStops = watch("return_trip.trip_stops") || [];

  // Outbound waypoints 
  const outboundWaypoints = useMemo(
    () =>
      outboundTripStopsRaw
        .filter((stop) => stop.location && stop.location.trim() !== "")
        .map((stop) => stop.location),
    [outboundTripStopsRaw]
  );

  // Outbound trip stops with estimated_time for API (includes stop durations for total time)
  const outboundTripStopsForApi = useMemo(
    () =>
      outboundTripStopsRaw.filter(
        (stop) => stop.location && stop.location.trim() !== ""
      ),
    [outboundTripStopsRaw]
  );

  const returnWaypoints = useMemo(
    () =>
      returnTripStops
        .filter((stop) => stop.location && stop.location.trim() !== "")
        .map((stop) => stop.location),
    [returnTripStops]
  );

  // Create departure time ISO strings
  const outboundDepartureTimeISO = useMemo(() => {
    if (!outboundPickupDate || !outboundPickupTime) return undefined;
    return new Date(`${outboundPickupDate}T${outboundPickupTime}:00`).toISOString();
  }, [outboundPickupDate, outboundPickupTime]);

  const returnDepartureTimeISO = useMemo(() => {
    if (!returnPickupDate || !returnPickupTime) return undefined;
    return new Date(`${returnPickupDate}T${returnPickupTime}:00`).toISOString();
  }, [returnPickupDate, returnPickupTime]);

  // API hooks for both trips
  const [getOutboundDateTime, { data: outboundDateTimeData, isLoading: isCalculatingOutbound, error: outboundError }] =
    useLazyGetDateTimeQuery();

  const [getReturnDateTime, { data: returnDateTimeData, isLoading: isCalculatingReturn, error: returnError }] =
    useLazyGetDateTimeQuery();

  // Calculate route data for outbound trip
  const outboundData = useMemo(() => {
    if (!outboundDateTimeData) {
      return { distance: undefined, time: undefined };
    }
    
    return {
      distance: outboundDateTimeData.distance,
      time: {
        arrivalTime: outboundDateTimeData.arrivalTime,
        arrivalDate: outboundDateTimeData.arrivalDate,
        duration: outboundDateTimeData.duration,
        totalDurationSeconds: outboundDateTimeData.totalDurationSeconds,
      },
    };
  }, [outboundDateTimeData]);

  // Calculate route data for return trip
  const returnData = useMemo(() => {
    if (!returnDateTimeData) {
      return { distance: undefined, time: undefined };
    }
    
    return {
      distance: returnDateTimeData.distance,
      time: {
        arrivalTime: returnDateTimeData.arrivalTime,
        arrivalDate: returnDateTimeData.arrivalDate,
        duration: returnDateTimeData.duration,
        totalDurationSeconds: returnDateTimeData.totalDurationSeconds,
      },
    };
  }, [returnDateTimeData]);

  // Fetch outbound trip data 
  useEffect(() => {
    if (outboundPickupLocation && outboundDropoffLocation && outboundPickupDate && outboundPickupTime) {
      const timer = setTimeout(() => {
        const requestParams = {
          origin: outboundPickupLocation,
          destination: outboundDropoffLocation,
          waypoints: outboundWaypoints.length > 0 ? outboundWaypoints : undefined,
          departureTime: outboundDepartureTimeISO,
          tripStops: outboundTripStopsForApi.map((stop) => ({
            estimated_time: stop.estimated_time ?? 0,
          })),
        };
        getOutboundDateTime(requestParams);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    outboundPickupLocation,
    outboundDropoffLocation,
    outboundPickupDate,
    outboundPickupTime,
    outboundWaypoints,
    outboundDepartureTimeISO,
    outboundTripStopsForApi,
    getOutboundDateTime,
  ]);

  // Fetch return trip data (same getDateTime API as one-way; applies BUS_FACTOR for bus travel time)
  useEffect(() => {
    if (returnPickupLocation && returnDropoffLocation && returnPickupDate && returnPickupTime) {
      const timer = setTimeout(() => {
        const returnStopsFiltered = returnTripStops.filter(
          (stop) => stop.location && stop.location.trim() !== ""
        );
        const requestParams = {
          origin: returnPickupLocation,
          destination: returnDropoffLocation,
          waypoints: returnWaypoints.length > 0 ? returnWaypoints : undefined,
          departureTime: returnDepartureTimeISO,
          tripStops: returnStopsFiltered.map((stop) => ({
            estimated_time: stop.estimated_time ?? 0,
          })),
        };
        getReturnDateTime(requestParams);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    returnPickupLocation,
    returnDropoffLocation,
    returnPickupDate,
    returnPickupTime,
    returnWaypoints,
    returnDepartureTimeISO,
    returnTripStops,
    getReturnDateTime,
  ]);

  // Set form values when outbound time data is calculated
  useEffect(() => {
    if (outboundData.time) {
      setValue("outbound_trip.arrival_time", outboundData.time.arrivalTime, {
        shouldValidate: false,
      });
      setValue("outbound_trip.arrival_date", outboundData.time.arrivalDate, {
        shouldValidate: false,
      });
      setValue("outbound_trip.duration", outboundData.time.duration, {
        shouldValidate: false,
      });
    }
    if (outboundData.distance !== undefined) {
      setValue("outbound_trip.distance", outboundData.distance, { shouldValidate: false });
    }
  }, [outboundData, setValue]);

  // Set form values when return time data is calculated
  useEffect(() => {
    if (returnData.time) {
      setValue("return_trip.arrival_time", returnData.time.arrivalTime, {
        shouldValidate: false,
      });
      setValue("return_trip.arrival_date", returnData.time.arrivalDate, {
        shouldValidate: false,
      });
      setValue("return_trip.duration", returnData.time.duration, {
        shouldValidate: false,
      });
    }
    if (returnData.distance !== undefined) {
      setValue("return_trip.distance", returnData.distance, { shouldValidate: false });
    }
  }, [returnData, setValue]);

  // Format date and time for display (outbound)
  const formatOutboundArrivalDateTime = useMemo(() => {
    if (!outboundData.time?.arrivalDate || !outboundData.time?.arrivalTime) return null;
    try {
      const date = parse(outboundData.time.arrivalDate, "yyyy-MM-dd", new Date());
      const [hours, minutes] = outboundData.time.arrivalTime.split(":");
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours, 10));
      dateTime.setMinutes(parseInt(minutes, 10));

      const formattedDate = format(dateTime, "d MMM yyyy");
      const formattedTime = format(dateTime, "h:mm a");
      return `${formattedDate} at ${formattedTime}`;
    } catch {
      return null;
    }
  }, [outboundData.time]);

  // Format date and time for display (return)
  const formatReturnArrivalDateTime = useMemo(() => {
    if (!returnData.time?.arrivalDate || !returnData.time?.arrivalTime) return null;
    try {
      const date = parse(returnData.time.arrivalDate, "yyyy-MM-dd", new Date());
      const [hours, minutes] = returnData.time.arrivalTime.split(":");
      const dateTime = new Date(date);
      dateTime.setHours(parseInt(hours, 10));
      dateTime.setMinutes(parseInt(minutes, 10));

      const formattedDate = format(dateTime, "d MMM yyyy");
      const formattedTime = format(dateTime, "h:mm a");
      return `${formattedDate} at ${formattedTime}`;
    } catch {
      return null;
    }
  }, [returnData.time]);

  // Calculate full trip duration (outbound + return)
  // Full trip duration = total hours from outbound departure to return arrival (wall-clock time)
  const fullTripDuration = useMemo(() => {
    if (!outboundPickupDate || !outboundPickupTime) return null;

    const outboundStart = new Date(`${outboundPickupDate}T${outboundPickupTime}:00`).getTime();

    // Use return arrival when available (calculated from return departure + duration)
    const returnArrivalDate = returnData.time?.arrivalDate;
    const returnArrivalTime = returnData.time?.arrivalTime;
    if (!returnArrivalDate || !returnArrivalTime) return null;

    const returnArrival = new Date(`${returnArrivalDate}T${returnArrivalTime}:00`).getTime();
    const totalMs = returnArrival - outboundStart;
    if (totalMs < 0) return null;

    const totalSeconds = Math.round(totalMs / 1000);
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    return `${totalHours}:${totalMinutes.toString().padStart(2, "0")} hrs`;
  }, [
    outboundPickupDate,
    outboundPickupTime,
    returnData.time?.arrivalDate,
    returnData.time?.arrivalTime,
  ]);

  const handleNext = async () => {
    const isValid = await trigger([
      "outbound_trip.pickup_date",
      "outbound_trip.pickup_time",
      "return_trip.pickup_date",
      "return_trip.pickup_time",
    ]);
    if (isValid) {
      nextStep("group-details");
    }
  };

  const isNextDisabled = !outboundPickupDate || !outboundPickupTime || !returnPickupDate || !returnPickupTime;

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
              Pick the times for your trip so we can calculate your journey
            </p>
          </div>

          {/* Date & Time Selection Section */}
          <div className="max-w-[670px] mx-auto space-y-8">
            <LegDateTimeSection
              title="Departure date & time"
              description={
                <>
                  When should we pick you up from{" "}
                  <span className="font-medium">{outboundPickupLocation}</span>?
                  Choose the date and time you want to start your trip.
                </>
              }
              tripPath="outbound_trip"
              control={control}
              showArrivalBox={Boolean(outboundPickupDate && outboundPickupTime)}
              arrivalBoxProps={{
                icon: <ArrowRight />,
                isLoading: isCalculatingOutbound,
                error: !!outboundError,
                formattedArrival: formatOutboundArrivalDateTime,
                destinationLabel: outboundDropoffLocation,
                stopsCount: outboundWaypoints.length,
                isReturn: false,
              }}
            />

            <LegDateTimeSection
              title="Return date & time"
              description={
                <>
                  When should we bring you back from{" "}
                  <span className="font-medium">{returnPickupLocation}</span>?
                  Choose the date and time for your return journey.
                </>
              }
              tripPath="return_trip"
              control={control}
              showArrivalBox={Boolean(returnPickupDate && returnPickupTime)}
              arrivalBoxProps={{
                icon: <ArrowLeft />,
                isLoading: isCalculatingReturn,
                error: !!returnError,
                formattedArrival: formatReturnArrivalDateTime,
                destinationLabel: returnDropoffLocation,
                stopsCount: returnWaypoints.length,
                isReturn: true,
              }}
            />

            {/* Full Trip Duration Display */}
            {(outboundPickupDate && outboundPickupTime) ||
            (returnPickupDate && returnPickupTime) ? (
              <FullTripDurationSection fullTripDuration={fullTripDuration} />
            ) : null}

            {/* Disclaimer */}
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500">
                All times are estimates and will be confirmed when your booking is finalized.
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
