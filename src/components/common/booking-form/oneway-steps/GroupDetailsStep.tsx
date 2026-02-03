import { Users, ArrowRight } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { TeacherCountInput } from "../TeacherCountInput";
import { StudentCountInput } from "../StudentCountInput";
import type { LeadSchemaType } from "./schema";

type GroupDetailsStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const GroupDetailsStep = ({
  nextStep,
  prevStep,
}: GroupDetailsStepProps) => {
  const { control, watch, trigger } =
    useFormContext<LeadSchemaType>();

  const teachersCount = watch("teachers_count") ?? 0;
  const studentsCount = watch("students_count") ?? 0;
  const totalPassengers = teachersCount + studentsCount;

  const handleNext = async () => {
    const isValid = await trigger(["teachers_count", "students_count"]);
    if (isValid) {
      nextStep("contact-details");
    }
  };

  const isNextDisabled = teachersCount < 1 || studentsCount < 1;

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        <StepHeader progressValue={STEP_PROGRESS.GROUP_DETAILS} onBack={prevStep} />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          {/* Header Section */}
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center">
              <div className="bg-[#0a67e7] p-4 rounded-full">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Who&apos;s travelling?
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4 mt-2">
              Tell us how many passengers are in your group.
            </p>
          </div>

          {/* Passenger Input Section */}
          <div className="max-w-[670px] mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teachers Count */}
              <Controller
                name="teachers_count"
                control={control}
                rules={{ min: 1 }}
                render={({ field, fieldState }) => (
                  <TeacherCountInput
                    value={field.value ?? 1}
                    onChange={field.onChange}
                    label="Teachers"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* Students Count */}
              <Controller
                name="students_count"
                control={control}
                rules={{ min: 1 }}
                render={({ field, fieldState }) => (
                  <StudentCountInput
                    value={field.value ?? 1}
                    onChange={field.onChange}
                    label="Students"
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>

            {/* Total Passengers Summary */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-900">
                  TOTAL PASSENGERS
                </span>
              </div>
              <span className="text-lg font-bold text-purple-900">
                {totalPassengers}
              </span>
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
            <span>Next: Add contact Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
