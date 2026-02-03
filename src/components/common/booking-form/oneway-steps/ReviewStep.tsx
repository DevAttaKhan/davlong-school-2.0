import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { TripSummarySection } from "./review/TripSummarySection";
import { PassengersSection } from "./review/PassengersSection";
import { ContactDetailsSection } from "./review/ContactDetailsSection";
import { PrivacyAndSubmitSection } from "./review/PrivacyAndSubmitSection";
import { FeatureIconsSection } from "./review/FeatureIconsSection";
import type { LeadSchemaType } from "./schema";

type ReviewStepProps = {
  prevStep: () => void;
  navigateToStep?: (step: string) => void;
};

export const ReviewStep = ({ prevStep, navigateToStep }: ReviewStepProps) => {
  const { watch } = useFormContext<LeadSchemaType>();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // Get all form values
  const formData = watch();
  const {
    outbound_trip,
    teachers_count,
    students_count,
    school_name,
    email,
    teacher_incharge,
    phone_number,
    special_instructions,
  } = formData;

  const handleSendRequest = () => {
    if (privacyAgreed) {
      console.log("Sending quote request:", formData);
      // TODO: Implement API call to send booking request
    }
  };

  const handleEditTrip = () => {
    // Navigate back to pickup location step (where trip locations are set)
    if (navigateToStep) {
      navigateToStep("pickup-location");
    } else {
      prevStep();
    }
  };

  const handleEditPassengers = () => {
    // Navigate back to group details step
    if (navigateToStep) {
      navigateToStep("group-details");
    } else {
      prevStep();
    }
  };

  const handleEditContact = () => {
    // Navigate back to contact details step
    if (navigateToStep) {
      navigateToStep("contact-details");
    } else {
      prevStep();
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-2 sm:px-4">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 mt-[40px]">
        <StepHeader progressValue={STEP_PROGRESS.REVIEW} onBack={prevStep} />

        <div
          className={`${CONTENT_PADDING} mt-6 sm:mt-8 md:mt-[40px] space-y-8`}
        >
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-[32px] font-semibold leading-[110%] tracking-[-0.04em] text-[#053373] text-center">
              Review your booking
            </h1>
            <p className="text-black text-sm text-center whitespace-nowrap mt-2">
              Please check that all your trip details are correct before sending your request.
            </p>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Review Sections */}
          <div className="max-w-[670px] mx-auto space-y-6">
            {/* Trip Summary Section */}
            <TripSummarySection
              tripData={outbound_trip}
              onEdit={handleEditTrip}
            />

            {/* Passengers Section */}
            <PassengersSection
              teachersCount={teachers_count ?? 0}
              studentsCount={students_count ?? 0}
              onEdit={handleEditPassengers}
            />

            {/* Contact Details Section */}
            <ContactDetailsSection
              schoolName={school_name ?? undefined}
              email={email ?? undefined}
              teacherInCharge={teacher_incharge ?? undefined}
              phoneNumber={phone_number ?? undefined}
              additionalInfo={special_instructions ?? undefined}
              onEdit={handleEditContact}
            />

            {/* Privacy and Submit Section */}
            <PrivacyAndSubmitSection
              privacyAgreed={privacyAgreed}
              onPrivacyChange={setPrivacyAgreed}
              onSubmit={handleSendRequest}
            />

            {/* Feature Icons */}
            <FeatureIconsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
