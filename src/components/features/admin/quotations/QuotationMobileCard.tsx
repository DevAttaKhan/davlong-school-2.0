import type { AdminQuotation } from "./columns";

import { format } from "date-fns";
import { ArrowRight, ArrowRightLeft } from "lucide-react";
import cn from "clsx";

interface QuotationMobileCardProps {
  quotation: AdminQuotation;
  onClick: () => void;
}

export const QuotationMobileCard = ({
  quotation,
  onClick,
}: QuotationMobileCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500">
            #{quotation.id}
          </span>
          <h4 className="font-semibold text-gray-900">
            {quotation.schoolName}
          </h4>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            quotation.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : quotation.status === "Quoted"
                ? "bg-green-100 text-green-800"
                : quotation.status === "Booked"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
          }`}
        >
          {quotation.status}
        </span>
      </div>

      <div className="space-y-3 mb-3 relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-100" />
        <div className="flex items-start gap-2 relative z-10">
          <div className="mt-1 min-w-[16px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-green-500 bg-white" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{quotation.from}</p>
        </div>
        <div className="flex items-start gap-2 relative z-10">
          <div className="mt-1 min-w-[16px] flex justify-center">
            <div className="w-2.5 h-2.5 rounded-full border-2 border-red-500 bg-white" />
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{quotation.to}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1">
          {quotation.type === "Return" ? (
            <ArrowRightLeft className="h-3 w-3 text-blue-500" />
          ) : (
            <ArrowRight className="h-3 w-3 text-blue-500" />
          )}
          {quotation.type}
        </div>
        <div>{format(new Date(quotation.tripDate), "MMM d, yyyy")}</div>
        <div className="font-medium text-gray-900">
          €{quotation.price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};
