import type { Transaction } from "./data";
import { format } from "date-fns";
import { ArrowRight, ArrowRightLeft, ChevronRight } from "lucide-react";

interface TransactionMobileCardProps {
  transaction: Transaction;
  onClick: () => void;
}

export const TransactionMobileCard = ({
  transaction,
  onClick,
}: TransactionMobileCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500">
            LEAD ID #{transaction.leadId}
          </span>
          <h4 className="font-semibold text-gray-900 mt-1">
            {transaction.user}
          </h4>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-bold text-green-600">
            €{transaction.amount}
          </span>
          {transaction.installments && (
            <span className="text-xs text-gray-400">
              {transaction.installments}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{transaction.from}</span>
          {transaction.routeType === "Return" ? (
            <ArrowRightLeft className="w-3 h-3 text-blue-500" />
          ) : (
            <ArrowRight className="w-3 h-3 text-blue-500" />
          )}
          <span>{transaction.to}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3">
        <div className="flex items-center gap-1">
          {format(new Date(transaction.date), "d MMM yyyy, HH:mm")}
        </div>
        <ChevronRight className="w-4 h-4 text-blue-500" />
      </div>
    </div>
  );
};
