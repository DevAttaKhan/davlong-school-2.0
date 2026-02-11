import { useState } from "react";
import { format } from "date-fns";
import type { ILeadDetails } from "@/types/lead.interface";
import { useDeleteLeadMutation } from "@/store/apis/lead.api";
import { ConfirmationModal } from "@/components/common/ConfirmationModal";
import { ConversationModal } from "./ConversationModal";

interface QuotationHeaderProps {
  quotation: ILeadDetails;
  onDeleteSuccess?: () => void;
}

export const QuotationHeader = ({ quotation, onDeleteSuccess }: QuotationHeaderProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [deleteLead, { isLoading }] = useDeleteLeadMutation();

  const handleDelete = async () => {
    try {
      await deleteLead(quotation.id).unwrap();
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Failed to delete lead:", error);
      alert("Failed to delete the trip. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Trip ID: #{quotation.id}
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Submitted:{" "}
            {format(new Date(quotation.created_at), "dd MMM yyyy")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMessageModalOpen(true)}
            className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
          >
            Message
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isLoading}
            className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded hover:bg-red-100 disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Trip"
        message="Are you sure you want to delete this trip? This action cannot be undone."
        confirmText="Delete Trip"
        isLoading={isLoading}
        variant="danger"
      />

      <ConversationModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        leadId={quotation.id}
      />
    </div>
  );
};
