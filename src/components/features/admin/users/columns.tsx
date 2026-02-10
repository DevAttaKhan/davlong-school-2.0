import type { ColumnDef } from "@tanstack/react-table";
import { MoreVertical, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type User = {
  id: string;
  schoolName: string;
  email: string;
  phoneNumber: string;
  status: "Have Account" | "No Account";
  verify: "Have Account" | "No Account"; // Based on image, seems to be similar values
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "schoolName",
    header: "SCHOOL",
    cell: ({ row }) => (
      <div className="font-medium text-gray-900">
        {row.getValue("schoolName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "EMAIL",
    cell: ({ row }) => (
      <div className="text-gray-900">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: "PHONE NUMBER",
    cell: ({ row }) => (
      <div className="text-gray-900">{row.getValue("phoneNumber")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const isHaveAccount = status === "Have Account";
      return (
        <span
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            isHaveAccount
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "verify",
    header: "VERIFY",
    cell: ({ row }) => {
      const verify = row.getValue("verify") as string;
      const isHaveAccount = verify === "Have Account";
      return (
        <button
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium bg-white",
            isHaveAccount
              ? "border-green-200 text-green-800"
              : "border-yellow-200 text-yellow-800"
          )}
        >
          {verify}
          <ChevronDown className="h-3 w-3" />
        </button>
      );
    },
  },
  {
    id: "actions",
    header: "ACTIONS",
    cell: () => (
      <button className="text-gray-500 hover:text-gray-700">
        <MoreVertical className="h-4 w-4" />
      </button>
    ),
  },
];
