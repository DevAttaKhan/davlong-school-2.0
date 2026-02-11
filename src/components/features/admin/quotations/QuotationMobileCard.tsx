import type { IAdminLead } from "@/types/lead.interface";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatusColor, formatCurrency, formatDateTime, formatStatus } from "./columns";

interface QuotationMobileCardProps {
  quotation: IAdminLead;
  onClick: () => void;
}

export const QuotationMobileCard = ({
  quotation,
  onClick,
}: QuotationMobileCardProps) => {
  const { date } = formatDateTime(quotation.trip_date);
  const price = formatCurrency(quotation.price);
  const statusColor = getStatusColor(quotation.status);
  const statusText = formatStatus(quotation.status);
  // Temporary for type until API has it
  const type = "One Way";

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500">
            #{quotation.quote_id}
          </span>
          <h4 className="font-semibold text-gray-900">
            {quotation.school || "N/A"}
          </h4>
        </div>
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            statusColor
          )}
        >
          {statusText}
        </span>
      </div>

      <div className="space-y-3 mb-3 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
        <div className="flex items-start gap-2 relative z-10">
          <div className="mt-1 min-w-[16px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-white" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{quotation.pickup || "N/A"}</p>
        </div>
        <div className="flex items-start gap-2 relative z-10">
          <div className="mt-1 min-w-[16px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{quotation.dropoff || "N/A"}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1">
          <ArrowRight className="h-3 w-3 text-blue-500" />
          {type}
        </div>
        <div>{date}</div>
        <div className="font-medium text-gray-900">
          {price}
        </div>
      </div>
    </div>
  );
};
