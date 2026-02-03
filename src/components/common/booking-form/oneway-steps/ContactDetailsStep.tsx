import { Mail, ArrowRight } from "lucide-react";
import { useFormContext, Controller } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { FormInput } from "../FormInput";
import { PhoneInput } from "../PhoneInput";
import { AdditionalInfoInput } from "../AdditionalInfoInput";
import type { LeadSchemaType } from "./schema";

type ContactDetailsStepProps = {
  nextStep: (step?: string) => void;
  prevStep: () => void;
};

const NEXT_BUTTON_CLASS =
  "flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-[1.5rem] hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors";

export const ContactDetailsStep = ({
  nextStep,
  prevStep,
}: ContactDetailsStepProps) => {
  const { control, trigger } = useFormContext<LeadSchemaType>();

  const handleNext = async () => {
    const isValid = await trigger([
      "email",
      "teacher_incharge",
      "school_name",
    ]);
    if (isValid) {
      nextStep("review");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        <StepHeader
          progressValue={STEP_PROGRESS.CONTACT_DETAILS}
          onBack={prevStep}
        />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          {/* Header Section */}
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-4 flex justify-center">
              <div className="bg-[#0a67e7] p-4 rounded-full">
                <Mail className="w-7 h-7 text-white" />
              </div>
            </div>
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              How can we contact you about your booking?
            </h1>
            <p className="text-black text-sm text-center max-w-md mx-auto px-4 mt-2">
              We&apos;ll use these details to confirm your trip and send your
              quote.
            </p>
          </div>

          {/* Contact Form Section */}
          <div className="max-w-[670px] mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* Teacher in-charge */}
              <Controller
                name="teacher_incharge"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Teacher in-charge"
                    placeholder="Enter in-charge name"
                    type="text"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* School name */}
              <Controller
                name="school_name"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    value={field.value}
                    onChange={field.onChange}
                    label="School name"
                    placeholder="Enter school name"
                    type="text"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* Phone (Optional) */}
              <Controller
                name="phone_number"
                control={control}
                render={({ field, fieldState }) => (
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    label="Phone"
                    placeholder="Enter phone number"
                    error={fieldState.error?.message}
                  />
                )}
              />

              {/* Additional information (Optional) */}
              <div className="sm:col-span-2">
                <Controller
                  name="special_instructions"
                  control={control}
                  render={({ field, fieldState }) => (
                    <AdditionalInfoInput
                      value={field.value}
                      onChange={field.onChange}
                      label="Additional information"
                      placeholder="Add any special Request and Instructions you'd like us to know."
                      error={fieldState.error?.message}
                      rows={4}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className={`flex justify-end mt-8 ${CONTENT_PADDING}`}>
          <button
            type="button"
            onClick={handleNext}
            className={NEXT_BUTTON_CLASS}
          >
            <span>Next: Review Your Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
