import type { Transaction } from "./columns";
import { ArrowRight, ArrowRightLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface DashboardMobileCardProps {
  transaction: Transaction;
}

export const DashboardMobileCard = ({
  transaction,
}: DashboardMobileCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 uppercase">LEAD ID</span>
          <span className="font-medium text-gray-900">#{transaction.id}</span>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {format(new Date(transaction.date), "d MMM yyyy")}
          </div>
          <div className="text-xs text-gray-500">
            {format(new Date(transaction.date), "H:mm")}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-sm font-medium text-gray-900 mb-1">
          {transaction.name}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="truncate max-w-[40%]">{transaction.from}</span>
          {transaction.type === "Return" ? (
            <ArrowRightLeft className="h-3 w-3 flex-shrink-0" />
          ) : (
            <ArrowRight className="h-3 w-3 flex-shrink-0" />
          )}
          <span className="truncate max-w-[40%]">{transaction.to}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <div className="text-xs text-gray-400">
          {transaction.paid}/{transaction.total}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-green-600">
            €{transaction.price}
          </span>
          <ChevronRight className="h-4 w-4 text-blue-500" />
        </div>
      </div>
    </div>
  );
};
