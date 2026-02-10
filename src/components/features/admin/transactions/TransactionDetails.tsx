import type { Transaction } from "./data";
import { format } from "date-fns";
import { ChevronRight } from "lucide-react";

interface TransactionDetailsProps {
  transaction: Transaction;
}

export const TransactionDetails = ({
  transaction,
}: TransactionDetailsProps) => {
  return (
    <div className="space-y-6">
      {/* Transaction Details Section */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Transaction Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              AMOUNT
            </label>
            <p className="text-2xl font-bold text-gray-900">
              €{transaction.amount}
            </p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              TOTAL
            </label>
            <p className="text-2xl font-bold text-gray-900">
              €{transaction.amount}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
              DATE
            </label>
            <p className="text-sm text-gray-600">
              {format(new Date(transaction.date), "d MMMM yyyy HH:mm")}
            </p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
              BY
            </label>
            <p className="text-sm text-blue-600">{transaction.user}</p>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">
              LEAD
            </label>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                <span>{transaction.from}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span>{transaction.to}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {format(new Date(transaction.date), "d MMMM yyyy HH:mm")}
            </p>
          </div>
        </div>
      </section>

      {/* Payment Information Section */}
      <section className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <h3 className="text-md font-bold text-gray-900 mb-4">
          Payment Information
        </h3>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Transaction ID:</span>
            <span className="col-span-2 text-gray-900">{transaction.id}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 items-center">
            <span className="text-gray-500">Status:</span>
            <span className="col-span-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                {transaction.status}
              </span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Amount:</span>
            <span className="col-span-2 text-gray-900">
              €{transaction.amount.toFixed(2)}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Payment Type:</span>
            <span className="col-span-2 text-gray-900">
              {transaction.paymentType}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Payment ID:</span>
            <span className="col-span-2 text-gray-900 break-all">
              {transaction.paymentId}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Created:</span>
            <span className="col-span-2 text-gray-900">
              {format(new Date(transaction.created), "dd/MM/yyyy, HH:mm:ss")}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-500">Updated:</span>
            <span className="col-span-2 text-gray-900">
              {format(new Date(transaction.updated), "dd/MM/yyyy, HH:mm:ss")}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
