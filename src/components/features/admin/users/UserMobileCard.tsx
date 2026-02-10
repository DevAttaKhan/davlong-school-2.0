import type { User } from "./columns";
import { MoreVertical, ChevronDown, Mail, Phone, School } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMobileCardProps {
  user: User;
}

export const UserMobileCard = ({ user }: UserMobileCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <School className="h-4 w-4 text-gray-500" />
          <h4 className="font-semibold text-gray-900">{user.schoolName}</h4>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-3.5 w-3.5" />
          <span className="break-all">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-3.5 w-3.5" />
          <span>{user.phoneNumber}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t">
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            user.status === "Have Account"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {user.status}
        </span>

        <button
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium bg-white",
            user.verify === "Have Account"
              ? "border-green-200 text-green-800"
              : "border-yellow-200 text-yellow-800"
          )}
        >
          {user.verify}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
