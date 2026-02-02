import React, { useState } from "react";
import { SelectPickupLocation } from "./SelectPickupLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadSchema, type LeadSchemaType } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { AddStopsStep } from "./AddStopsStep";

type Props = {
  setTripType: (tripType: "roundtrip" | "oneway" | "initial") => void;
};

export const OneWaySteps: React.FC<Props> = ({ setTripType }) => {
  const [step, setStep] = useState("pickup-location");

  const form = useForm<LeadSchemaType>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      outbound_trip: {
        type: "OUTBOUND",
        pickup_location: "",
        dropoff_location: "",
        trip_stops: [],
      },
    },
  });

  const handleNextStep = async (nextStep?: string) => {
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const STEPS = {
    "pickup-location": (
      <SelectPickupLocation
        nextStep={handleNextStep}
        prevStep={() => setTripType("initial")}
      />
    ),
    "add-stops": (
      <AddStopsStep
        nextStep={handleNextStep}
        prevStep={() => setStep("pickup-location")}
      />
    ),
    "dates-times": (
      <div className="min-h-screen bg-[#f9fafb] p-8 text-center">
        <p className="text-gray-600">Choose Dates & Times (coming soon)</p>
      </div>
    ),
  };

  return (
    <FormProvider {...form}>{STEPS[step as keyof typeof STEPS]}</FormProvider>
  );
};
