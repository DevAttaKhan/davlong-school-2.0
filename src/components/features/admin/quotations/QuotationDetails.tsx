import type { AdminQuotation } from "./columns";
import { format } from "date-fns";
import { Users, Mail, Phone, School, User } from "lucide-react";

interface QuotationDetailsProps {
  quotation: AdminQuotation;
}

export const QuotationDetails = ({ quotation }: QuotationDetailsProps) => {
  return (
    <div className="space-y-6 pb-6">
      {/* Header Info */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Trip ID: #{quotation.id}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Submitted:{" "}
              {format(new Date(quotation.requestedAt), "dd MMM yyyy")}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700">
              Message
            </button>
            <button className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 text-sm font-medium rounded hover:bg-red-100">
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-blue-600 font-medium">
          <User className="h-5 w-5" />
          <h3>CUSTOMER INFORMATION</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-lg p-4">
          <div>
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Teacher
            </span>
            <p className="font-medium">{quotation.teacherName}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase block mb-1">
              School
            </span>
            <div className="flex items-center gap-2">
              <School className="h-4 w-4 text-gray-400" />
              <p className="font-medium">{quotation.schoolName}</p>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Email
            </span>
            <div className="flex items-center gap-2 text-blue-600">
              <Mail className="h-4 w-4" />
              <p className="font-medium">{quotation.email}</p>
            </div>
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase block mb-1">
              Phone
            </span>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <p className="font-medium">{quotation.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          Additional Information
        </h3>
        <div className="bg-gray-50 p-4 rounded-lg text-gray-500 text-sm">
          No additional information provided.
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700">
          View History
        </button>
        <button className="w-full py-2 bg-green-500 text-white font-medium rounded hover:bg-green-700">
          Show Similar Routes
        </button>
      </div>

      {/* Journey Details */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-medium text-blue-600">OUTBOUND JOURNEY</h3>
        <div className="flex gap-4">
          <div className="flex flex-col items-center pt-1">
            <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white">
              A
            </div>
            <div className="w-0.5 h-full bg-gray-200 my-1"></div>
            <div className="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white">
              B
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-xs text-gray-500 uppercase">
                Depart From:
              </span>
              <p className="font-medium text-gray-900">{quotation.from}</p>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(quotation.tripDate), "dd MMM yyyy h:mm a")}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500 uppercase">
                Arrive At:
              </span>
              <p className="font-medium text-gray-900">{quotation.to}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded text-sm">
          <div>
            <span className="text-gray-500 block text-xs">PASSENGERS</span>
            <div className="flex items-center gap-1 font-medium">
              <Users className="h-4 w-4 text-gray-400" />
              {quotation.passengers}
            </div>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">TOTAL DISTANCE</span>
            <div className="font-medium">174.64km</div>
          </div>
          <div>
            <span className="text-gray-500 block text-xs">DURATION</span>
            <div className="font-medium">3:29hrs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
