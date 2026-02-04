import React, { useState } from "react";
import { SelectPickupLocation } from "./SelectPickupLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { LeadSchema, type LeadSchemaType } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { AddStopsStep } from "../trip-stops/AddStopsStep";
import { DatesTimesStep } from "./DatesTimesStep";
import { GroupDetailsStep } from "./GroupDetailsStep";
import { ContactDetailsStep } from "./ContactDetailsStep";
import { ReviewStep } from "./ReviewStep";

type Props = {
  setTripType: (tripType: "roundtrip" | "oneway" | "initial") => void;
};

export const OneWaySteps: React.FC<Props> = ({ setTripType }) => {
  const [step, setStep] = useState("dates-times");

  const form = useForm<LeadSchemaType>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      teachers_count: 1,
      students_count: 1,
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
      <DatesTimesStep
        nextStep={handleNextStep}
        prevStep={() => setStep("add-stops")}
      />
    ),
    "group-details": (
      <GroupDetailsStep
        nextStep={handleNextStep}
        prevStep={() => setStep("dates-times")}
      />
    ),
    "contact-details": (
      <ContactDetailsStep
        nextStep={handleNextStep}
        prevStep={() => setStep("group-details")}
      />
    ),
    review: (
      <ReviewStep 
        prevStep={() => setStep("contact-details")} 
        navigateToStep={setStep}
      />
    ),
  };

  return (
    <FormProvider {...form}>{STEPS[step as keyof typeof STEPS]}</FormProvider>
  );
};
