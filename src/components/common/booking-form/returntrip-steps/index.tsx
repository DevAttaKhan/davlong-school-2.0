import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { LeadSchema, type LeadSchemaType } from "../oneway-steps/schema";
import { SelectReturnPickupLocation } from "./SelectReturnPickupLocation";
import { PlanReturnJourney } from "./PlanReturnJourney";
import { AddReturnStopsStep } from "./AddReturnStopsStep";
import { ReturnDatesTimesStep } from "./ReturnDatesTimesStep";
import { GroupDetailsStep } from "../oneway-steps/GroupDetailsStep";
import { ContactDetailsStep } from "../oneway-steps/ContactDetailsStep";
import { ReturnTripReviewStep } from "./review/ReturnTripReviewStep";

type Props = {
  setTripType: (tripType: "roundtrip" | "oneway" | "initial") => void;
};

export const ReturnTripSteps: React.FC<Props> = ({ setTripType }) => {
  const [step, setStep] = useState("pickup-location");

  const form = useForm<LeadSchemaType>({
    resolver: zodResolver(LeadSchema),
    defaultValues: {
      teachers_count: 1,
      students_count: 1,
      // Minimal outbound_trip to satisfy schema (not used in return trip flow)
      outbound_trip: {
        type: "OUTBOUND",
        pickup_location: "",
        dropoff_location: "",
        trip_stops: [],
      },
      return_trip: {
        type: "RETURN",
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
      <SelectReturnPickupLocation
        nextStep={handleNextStep}
        prevStep={() => setTripType("initial")}
      />
    ),
    "plan-return-journey": (
      <PlanReturnJourney
        nextStep={handleNextStep}
        prevStep={() => setStep("pickup-location")}
      />
    ),
    "add-stops": (
      <AddReturnStopsStep
        nextStep={handleNextStep}
        prevStep={() => setStep("plan-return-journey")}
      />
    ),
    "dates-times": (
      <ReturnDatesTimesStep
        nextStep={handleNextStep}
        prevStep={() => setStep("plan-return-journey")}
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
      <ReturnTripReviewStep 
        prevStep={() => setStep("contact-details")} 
        navigateToStep={setStep}
      />
    ),
  };

  return (
    <FormProvider {...form}>{STEPS[step as keyof typeof STEPS]}</FormProvider>
  );
};
