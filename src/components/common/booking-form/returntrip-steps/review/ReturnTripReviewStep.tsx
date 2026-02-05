import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { StepHeader } from "../../StepHeader";
import { CONTENT_PADDING, STEP_PROGRESS } from "../../constants";
import { ReturnTripSummarySection } from "./ReturnTripSummarySection";
import { PassengersSection } from "../../oneway-steps/review/PassengersSection";
import { ContactDetailsSection } from "../../oneway-steps/review/ContactDetailsSection";
import { PrivacyAndSubmitSection } from "../../oneway-steps/review/PrivacyAndSubmitSection";
import { FeatureIconsSection } from "../../oneway-steps/review/FeatureIconsSection";
import type { LeadSchemaType } from "../../oneway-steps/schema";

type ReturnTripReviewStepProps = {
  prevStep: () => void;
  navigateToStep?: (step: string) => void;
};

export const ReturnTripReviewStep = ({
  prevStep,
  navigateToStep,
}: ReturnTripReviewStepProps) => {
  const { watch } = useFormContext<LeadSchemaType>();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // Get all form values
  const formData = watch();
  const {
    outbound_trip,
    return_trip,
    teachers_count,
    students_count,
    school_name,
    email,
    teacher_incharge,
    phone_number,
    special_instructions,
  } = formData;

  // Prepare payload for backend API
  const preparePayload = () => {
    // Clean up trip stops - remove UI-only fields
    const cleanedOutboundStops = outbound_trip?.trip_stops?.map((stop) => {
      const { isEditing, ...cleanStop } = stop;
      return cleanStop;
    });

    const cleanedReturnStops = return_trip?.trip_stops?.map((stop) => {
      const { isEditing, ...cleanStop } = stop;
      return cleanStop;
    });

    const payload = {
      // Lead/Contact Information
      school_name: school_name,
      email: email,
      teacher_incharge: teacher_incharge,
      phone_number: phone_number,
      special_instructions: special_instructions,
      teachers_count: teachers_count,
      students_count: students_count,

      // Trip Information
      outbound_trip: {
        type: outbound_trip?.type || "OUTBOUND",
        pickup_location: outbound_trip?.pickup_location,
        dropoff_location: outbound_trip?.dropoff_location,
        pickup_date: outbound_trip?.pickup_date,
        pickup_time: outbound_trip?.pickup_time,
        arrival_time: outbound_trip?.arrival_time,
        arrival_date: outbound_trip?.arrival_date,
        duration: outbound_trip?.duration,
        distance: outbound_trip?.distance,
        trip_stops: cleanedOutboundStops || [],
      },

      return_trip: {
        type: return_trip?.type || "RETURN",
        pickup_location: return_trip?.pickup_location,
        dropoff_location: return_trip?.dropoff_location,
        pickup_date: return_trip?.pickup_date,
        pickup_time: return_trip?.pickup_time,
        arrival_time: return_trip?.arrival_time,
        arrival_date: return_trip?.arrival_date,
        duration: return_trip?.duration,
        distance: return_trip?.distance,
        trip_stops: cleanedReturnStops || [],
      },

      // Metadata
      privacy_agreed: privacyAgreed,
      submitted_at: new Date().toISOString(),
    };

    return payload;
  };

  const handleSendRequest = () => {
    if (privacyAgreed) {
      const payload = preparePayload();
      // TODO: Implement API call to send booking request
      // await fetch('/api/bookings', { method: 'POST', body: JSON.stringify(payload) })
      void payload;
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
            <p className="text-black text-sm text-center mt-2">
              Please check that all your trip details are correct before sending
              your request.
            </p>
            <div className="w-16 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          {/* Review Sections */}
          <div className="max-w-[670px] mx-auto space-y-6">
            {/* Trip Summary Section */}
            <ReturnTripSummarySection
              outboundTrip={outbound_trip ?? undefined}
              returnTrip={return_trip ?? undefined}
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
