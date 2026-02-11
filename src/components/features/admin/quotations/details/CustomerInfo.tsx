import { Mail, Phone, School, User } from "lucide-react";
import type { ILeadDetails } from "@/types/lead.interface";

interface CustomerInfoProps {
  quotation: ILeadDetails;
}

export const CustomerInfo = ({ quotation }: CustomerInfoProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-blue-600 font-medium">
        <User className="h-5 w-5" />
        <h3 className="uppercase tracking-wider">Customer Information</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 rounded-lg p-4">
        <div>
          <span className="text-xs text-gray-500 uppercase block mb-1">
            Teacher
          </span>
          <p className="font-medium text-gray-900">{quotation.name}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500 uppercase block mb-1">
            School
          </span>
          <div className="flex items-center gap-2">
            <School className="h-4 w-4 text-gray-400" />
            <p className="font-medium text-gray-900">{quotation.institute_name}</p>
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
            <p className="font-medium text-gray-900">{quotation.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
