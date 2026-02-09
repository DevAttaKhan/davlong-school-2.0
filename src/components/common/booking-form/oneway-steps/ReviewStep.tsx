import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { StepHeader } from "../StepHeader";
import { QuoteRequestSuccessModal } from "../QuoteRequestSuccessModal";
import { CONTENT_PADDING, STEP_PROGRESS } from "../constants";
import { TripSummarySection } from "./review/TripSummarySection";
import { PassengersSection } from "./review/PassengersSection";
import { ContactDetailsSection } from "./review/ContactDetailsSection";
import { PrivacyAndSubmitSection } from "./review/PrivacyAndSubmitSection";
import { FeatureIconsSection } from "./review/FeatureIconsSection";
import { extractApiErrorMessage } from "@/lib/extractApiErrorMessage";
import { useCreateLeadMutation } from "@/store/apis/lead.api";
import type { CreateLeadRequestBody } from "@/types/lead.interface";
import type { LeadSchemaType } from "./schema";
import { toast } from "react-toastify";

type ReviewStepProps = {
  prevStep: () => void;
  navigateToStep?: (step: string) => void;
};

export const ReviewStep = ({ prevStep, navigateToStep }: ReviewStepProps) => {
  const navigate = useNavigate();
  const { watch } = useFormContext<LeadSchemaType>();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const [createLead, { isLoading: isSubmittingLead }] = useCreateLeadMutation();

  // Prepare payload for backend API
  const preparePayload = (): CreateLeadRequestBody => {
    const cleanedTripStops = outbound_trip?.trip_stops?.map((stop) => {
      const { isEditing, ...cleanStop } = stop;
      return cleanStop;
    });

    return {
      school_name: school_name ?? "",
      email: email ?? "",
      teacher_incharge: teacher_incharge ?? "",
      phone_number: phone_number ?? "",
      special_instructions: special_instructions ?? "",
      teachers_count: teachers_count ?? 0,
      students_count: students_count ?? 0,
      outbound_trip: {
        type: outbound_trip?.type ?? "OUTBOUND",
        pickup_location: outbound_trip?.pickup_location ?? "",
        dropoff_location: outbound_trip?.dropoff_location ?? "",
        pickup_date: outbound_trip?.pickup_date ?? "",
        pickup_time: outbound_trip?.pickup_time ?? "",
        arrival_time: outbound_trip?.arrival_time ?? "",
        arrival_date: outbound_trip?.arrival_date ?? "",
        duration: outbound_trip?.duration ?? "",
        distance: outbound_trip?.distance ?? 0,
        trip_stops: cleanedTripStops ?? [],
      },
      privacy_agreed: privacyAgreed,
      submitted_at: new Date().toISOString(),
    };
  };

  const handleSendRequest = async () => {
    if (!privacyAgreed) return;
    try {
      const payload = preparePayload();
      await createLead(payload).unwrap();
      setShowSuccessModal(true);
    } catch (err) {
      toast.error(extractApiErrorMessage(err));
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
    <div className="min-h-screen bg-[#f9fafb] px-2 py-6 sm:px-4 sm:py-8">
      <div className="max-w-[982px] mx-auto bg-white rounded-lg shadow-sm p-2 sm:p-4 pb-8 sm:pb-10">
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
              isSubmitting={isSubmittingLead}
            />

            {/* Feature Icons */}
            <FeatureIconsSection />
          </div>
        </div>
      </div>

      <QuoteRequestSuccessModal
        isOpen={showSuccessModal}
        onBackToHome={() => {
          setShowSuccessModal(false);
          navigate("/");
        }}
      />
    </div>
  );
};
