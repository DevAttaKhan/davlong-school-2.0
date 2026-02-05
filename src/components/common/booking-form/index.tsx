import { useState } from "react";
import { SelectTripType } from "./SelectTripType";
import { OneWaySteps } from "./oneway-steps";
import { ReturnTripSteps } from "./returntrip-steps";

export const BookingForm = () => {
  const [tripType, setTripType] = useState<"roundtrip" | "oneway" | "initial">(
    "initial"
  );

  const handleSetTripType = (newTripType: "roundtrip" | "oneway" | "initial") => {
    setTripType(newTripType);
  };

  const FormStepMap = {
    initial: <SelectTripType selectTripType={handleSetTripType} />,
    roundtrip: (
      <ReturnTripSteps 
        setTripType={handleSetTripType}
      />
    ),
    oneway: <OneWaySteps setTripType={handleSetTripType} />,
  };
  return <div>{FormStepMap[tripType]}</div>;
};
