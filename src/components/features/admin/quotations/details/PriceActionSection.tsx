import { MessageSquare, Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";

interface PriceActionSectionProps {
  estimatedPrice: number;
  onPriceSubmit: (price: number, notes: string) => void;
  onReject: () => void;
}

export const PriceActionSection = ({
  estimatedPrice,
  onPriceSubmit,
  onReject,
}: PriceActionSectionProps) => {
  const [actualPrice, setActualPrice] = useState(estimatedPrice.toString());
  const [notes, setNotes] = useState("");

  return (
    <div className="space-y-6">
      {/* Additional Notes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-600">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm font-medium">
            Additional Notes for the User (Optional)
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add additional notes about the price update here..."
          className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
      </div>

      {/* Price Inputs */}
      <div className="flex flex-col md:flex-row gap-8 py-4 border-y border-gray-100">
        <div className="flex-1 space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">
            ESTIMATED PRICE
          </span>
          <p className="text-2xl font-bold text-green-600">
            €{estimatedPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex-1 space-y-2">
          <span className="text-[10px] text-gray-400 font-bold uppercase block">
            ACTUAL PRICE
          </span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              €
            </span>
            <input
              type="text"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-white px-4 py-3 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center gap-2 text-gray-900 font-bold">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span className="text-sm">Recent Messages</span>
          </div>
          <button className="text-blue-600 text-xs font-medium">
            View all
          </button>
        </div>
        <div className="p-8 text-center bg-white/50">
          <p className="text-gray-400 text-sm italic">No chats yet</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <button
          onClick={() => onPriceSubmit(parseFloat(actualPrice), notes)}
          className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
        >
          <Check className="w-5 h-5" />
          Submit Price
        </button>

        <div className="relative group">
          <button
            onClick={onReject}
            className="w-full py-3 bg-[#1e293b] hover:bg-[#0f172a] text-white font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
          >
            <X className="w-5 h-5" />
            Reject
            <ChevronDown className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
