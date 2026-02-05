import { Mail, Pencil } from "lucide-react";

type ContactDetailsSectionProps = {
  schoolName?: string | null;
  email?: string | null;
  teacherInCharge?: string | null;
  phoneNumber?: string | null;
  additionalInfo?: string | null;
  onEdit?: () => void;
};

export const ContactDetailsSection = ({
  schoolName,
  email,
  teacherInCharge,
  phoneNumber,
  additionalInfo,
  onEdit,
}: ContactDetailsSectionProps) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-blue-600">
            Your contact details
          </h2>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <div className="space-y-4">
        {/* Row 1: School Name and Teacher In Charge */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">SCHOOL NAME</p>
            <p className="text-sm font-medium text-gray-900">
              {schoolName || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">
              TEACHER IN CHARGE
            </p>
            <p className="text-sm font-medium text-gray-900">
              {teacherInCharge || "Not specified"}
            </p>
          </div>
        </div>

        {/* Row 2: Email and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">EMAIL</p>
            <p className="text-sm font-medium text-gray-900">
              {email || "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">PHONE</p>
            <p className="text-sm font-medium text-gray-900">
              {phoneNumber ? `+353 ${phoneNumber}` : "Not provided"}
            </p>
          </div>
        </div>

        {/* Row 3: Additional Information (Full Width) */}
        <div>
          <p className="text-xs text-gray-500 uppercase mb-1">
            ADDITIONAL INFORMATION
          </p>
          <p className="text-sm text-gray-600">
            {additionalInfo || "No additional information provided"}
          </p>
        </div>
      </div>
    </div>
  );
};
