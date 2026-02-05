import type { ReactNode } from "react";
import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { DatePicker, TimeInput } from "@/components/common";
import { ArrivalInfoBox } from "./ArrivalInfoBox";
import type { LeadSchemaType } from "../oneway-steps/schema";

type TripPath = "outbound_trip" | "return_trip";

type ArrivalBoxProps = {
  icon: ReactNode;
  isLoading: boolean;
  error: boolean;
  formattedArrival: string | null;
  destinationLabel: string;
  stopsCount: number;
  isReturn: boolean;
};

type LegDateTimeSectionProps = {
  /** Section heading, e.g. "Departure date & time" or "Return date & time" */
  title: string;
  /** Description paragraph (can include location name in a <span>) */
  description: ReactNode;
  /** Form path for this leg: "outbound_trip" or "return_trip" */
  tripPath: TripPath;
  control: Control<LeadSchemaType>;
  /** When true, the arrival info box is shown below the inputs */
  showArrivalBox: boolean;
  /** Props for the arrival box; only used when showArrivalBox is true */
  arrivalBoxProps: ArrivalBoxProps;
};

export const LegDateTimeSection = ({
  title,
  description,
  tripPath,
  control,
  showArrivalBox,
  arrivalBoxProps,
}: LegDateTimeSectionProps) => {
  const dateName = `${tripPath}.pickup_date` as const;
  const timeName = `${tripPath}.pickup_time` as const;

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mb-4 text-sm text-gray-600">{description}</p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-[1.5fr_1fr]">
        <Controller
          name={dateName}
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
        <Controller
          name={timeName}
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

      {showArrivalBox && (
        <ArrivalInfoBox
          icon={arrivalBoxProps.icon}
          isLoading={arrivalBoxProps.isLoading}
          error={arrivalBoxProps.error}
          formattedArrival={arrivalBoxProps.formattedArrival}
          destinationLabel={arrivalBoxProps.destinationLabel}
          stopsCount={arrivalBoxProps.stopsCount}
          isReturn={arrivalBoxProps.isReturn}
        />
      )}
    </div>
  );
};
