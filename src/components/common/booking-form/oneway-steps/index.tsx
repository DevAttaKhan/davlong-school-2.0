import React, { useState } from "react";
import { SelectPickupLocation } from "./SelectPickupLocation";
import { zodResolver } from "@hookform/resolvers/zod";
import { OneWayStepsSchema, type OneWayStepsSchemaType } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import { AddStopsStep } from "./AddStopsStep";

export const OneWaySteps = () => {
  const [step, setStep] = useState("pickup-location");

  const form = useForm<OneWayStepsSchemaType>({
    resolver: zodResolver(OneWayStepsSchema),
  });

  const handleNextStep = async (
    validationFields: string[],
    nextStep?: string
  ) => {
    const isValid = await form.trigger(validationFields as any);
    if (isValid && nextStep) {
      setStep(nextStep);
    }
  };

  const STEPS = {
    "pickup-location": (
      <SelectPickupLocation
        nextStep={handleNextStep}
        prevStep={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ),
    "add-stops": (
      <AddStopsStep nextStep={handleNextStep} prevStep={undefined} />
    ),
  };

  return (
    <FormProvider {...form}>{STEPS[step as keyof typeof STEPS]}</FormProvider>
  );
};
