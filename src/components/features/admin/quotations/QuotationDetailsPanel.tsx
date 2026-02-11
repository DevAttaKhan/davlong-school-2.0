import { X } from "lucide-react";
import { QuotationDetails } from "./QuotationDetails";
import { cn } from "@/lib/utils";

interface QuotationDetailsPanelProps {
    quotationId: string | null;
    onClose: () => void;
    onDeleteSuccess?: () => void;
}

export const QuotationDetailsPanel = ({
    quotationId,
    onClose,
    onDeleteSuccess,
}: QuotationDetailsPanelProps) => {
    return (
        <div
            className={cn(
                "shrink-0 h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out",
                quotationId
                    ? "w-[58%] opacity-100 translate-x-0"
                    : "w-0 opacity-0 translate-x-10 pointer-events-none hidden"
            )}
        >
            {quotationId && (
                <>
                    <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-gray-900">
                            Trip Details #{quotationId}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
                        <QuotationDetails
                            quotationId={quotationId}
                            onDeleteSuccess={onDeleteSuccess}
                        />
                    </div>
                </>
            )}
        </div>
    );
};
