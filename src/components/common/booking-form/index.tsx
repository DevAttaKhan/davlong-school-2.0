import { useState } from "react";
import { SelectTripType } from "./SelectTripType";
import { OneWaySteps } from "./oneway-steps";

export const BookingForm = () => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "initial">(
    "initial"
  );

  const FormStepMap = {
    initial: <SelectTripType selectTripType={setTripType} />,
    roundtrip: <OneWaySteps />,
    oneway: <OneWaySteps />,
  };
  return <div>{FormStepMap[tripType]}</div>;
};
