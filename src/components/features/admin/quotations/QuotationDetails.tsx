import { useState } from "react";
import { useGetLeadByIdQuery } from "@/store/apis/lead.api";
import { QuotationHeader } from "./details/QuotationHeader";
import { CustomerInfo } from "./details/CustomerInfo";
import { JourneyDetails } from "./details/JourneyDetails";
import { PriceActionSection } from "./details/PriceActionSection";
import { SimilarRoutesModal } from "./details/SimilarRoutesModal";
import { BookingHistoryModal } from "./details/BookingHistoryModal";

interface QuotationDetailsProps {
  quotationId: string;
  onDeleteSuccess?: () => void;
}

export const QuotationDetails = ({ quotationId, onDeleteSuccess }: QuotationDetailsProps) => {
  const { data: quotation, isLoading } = useGetLeadByIdQuery(quotationId);
  const [isSimilarRoutesOpen, setIsSimilarRoutesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handlePriceSubmit = (price: number, notes: string) => {
    console.log("Submitting price:", price, "with notes:", notes);
    // API integration will happen here later
  };

  const handleReject = () => {
    console.log("Rejecting quotation");
    // API integration will happen here later
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading details...</div>;
  }

  if (!quotation) {
    return <div className="p-8 text-center text-red-500">Failed to load details</div>;
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Header Info */}
      <QuotationHeader quotation={quotation} onDeleteSuccess={onDeleteSuccess} />

      {/* Customer Information */}
      <CustomerInfo quotation={quotation} />

      {/* Additional Information */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900 uppercase tracking-wider text-sm">
          Additional Information
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-sm border border-gray-100">
          {quotation.special_instructions || "No additional information provided."}
        </div>
      </div>

      {/* View History Button */}
      <div className="space-y-2">
        <button
          onClick={() => setIsHistoryOpen(true)}
          className="w-full py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-sm"
        >
          View History
        </button>
      </div>

      {/* Show Similar Button */}
      <div className="space-y-1">
        <button
          onClick={() => setIsSimilarRoutesOpen(true)}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm"
        >
          Show Similar Routes
        </button>
      </div>

      {/* Journey Details */}
      <div className="space-y-10">
        {quotation?.outbound_trip && (
          <JourneyDetails
            title="OUTBOUND JOURNEY"
            from={quotation.outbound_trip?.pickup_location}
            to={quotation.outbound_trip?.dropoff_location}
            date={quotation.outbound_trip?.pickup_date}
            passengers={quotation.number_of_passengers}
            distance={quotation.outbound_trip?.distance}
            duration={quotation.outbound_trip?.duration}
            stops={quotation.outbound_trip?.stops}
          />
        )}

        {quotation?.return_trip && (
          <JourneyDetails
            title="RETURN JOURNEY"
            from={quotation.return_trip?.pickup_location}
            to={quotation.return_trip?.dropoff_location}
            date={quotation.return_trip?.pickup_date}
            passengers={quotation.number_of_passengers}
            distance={quotation.return_trip?.distance}
            duration={quotation.return_trip?.duration}
            stops={quotation.return_trip?.stops}
            isReturn={true}
          />
        )}
      </div>

      {/* Price Update and Actions */}
      <div className="pt-6 border-t border-gray-100 pb-6">
        <PriceActionSection
          estimatedPrice={parseFloat(quotation.estimated_price || "0")}
          onPriceSubmit={handlePriceSubmit}
          onReject={handleReject}
        />
      </div>

      {/* Modals */}
      <SimilarRoutesModal
        isOpen={isSimilarRoutesOpen}
        onClose={() => setIsSimilarRoutesOpen(false)}
        quotation={quotation}
      />

      <BookingHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        schoolName={quotation.institute_name || "Unknown School"}
      />
    </div>
  );
};
