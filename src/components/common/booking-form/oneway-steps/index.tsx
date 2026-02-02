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
  });

  const handleNextStep = async (nextStep?: string) => {
    if (nextStep) {
      setStep(nextStep);
    }
  };

  const prevStep = () => setTripType("initial");

  const STEPS = {
    "pickup-location": (
      <SelectPickupLocation nextStep={handleNextStep} prevStep={prevStep} />
    ),
    "add-stops": <AddStopsStep nextStep={handleNextStep} prevStep={prevStep} />,
  };

  return (
    <FormProvider {...form}>{STEPS[step as keyof typeof STEPS]}</FormProvider>
  );
};
