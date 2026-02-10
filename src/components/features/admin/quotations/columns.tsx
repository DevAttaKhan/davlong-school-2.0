import type { ColumnDef } from "@tanstack/react-table";
import {
  Wallet,
  Users,
  ArrowRightLeft,
  ArrowRight,
  School,
} from "lucide-react";
import { format } from "date-fns";
import type { ReactNode } from "react";

export type QuotationStatus =
  | "Pending"
  | "Modified"
  | "Quoted"
  | "Booked"
  | "Completed"
  | "Canceled"
  | "Rejected";

export type AdminQuotation = {
  teacherName: ReactNode;
  email: ReactNode;
  phone: ReactNode;
  id: string;
  requestedAt: string;
  schoolName: string;
  from: string;
  to: string;
  tripDate: string;
  passengers: number;
  price: number;
  status: QuotationStatus;
  type: "One Way" | "Return";
};

export const columns: ColumnDef<AdminQuotation>[] = [
  {
    accessorKey: "id",
    header: "QUOTE ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 font-medium text-gray-900">
        <Wallet className="h-4 w-4 text-gray-500" />
        {row.getValue("id")}
      </div>
    ),
  },
  {
    accessorKey: "requestedAt",
    header: "REQUESTED AT",
    cell: ({ row }) => {
      const date = new Date(row.getValue("requestedAt"));
      return (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-900">
            {format(date, "MMM d, yyyy")}
          </span>
          <span className="text-gray-500 text-xs">
            {format(date, "h:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "schoolName",
    header: "SCHOOL",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-gray-900">
        <span className="p-1.5 bg-orange-100 text-orange-600 rounded-md shrink-0">
          <School className="h-4 w-4" />
        </span>
        <span className="font-medium whitespace-normal min-w-[200px]">
          {row.getValue("schoolName")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "from",
    header: "FROM",
    cell: ({ row }) => (
      <div className="min-w-[200px] text-sm text-gray-900 font-medium whitespace-normal">
        {row.getValue("from")}
      </div>
    ),
  },
  {
    accessorKey: "to",
    header: "TO",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-2">
          {type === "Return" ? (
            <ArrowRightLeft className="h-4 w-4 text-blue-500 shrink-0" />
          ) : (
            <ArrowRight className="h-4 w-4 text-blue-500 shrink-0" />
          )}
          <div className="min-w-[200px] text-sm text-gray-900 font-medium whitespace-normal">
            {row.getValue("to")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "tripDate",
    header: "DATE & TIME",
    cell: ({ row }) => {
      const date = new Date(row.getValue("tripDate"));
      return (
        <div className="flex flex-col text-sm">
          <span className="font-medium text-gray-900">
            {format(date, "MMM d, yyyy")}
          </span>
          <span className="text-gray-500 text-xs">
            {format(date, "h:mm a")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "passengers",
    header: "PASSENGERS",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-gray-900">
        <Users className="h-4 w-4 text-gray-500" />
        {row.getValue("passengers")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      return (
        <div className="font-medium text-gray-900">€{price.toFixed(2)}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Pending":
            return "bg-blue-100 text-blue-700";
          case "Modified":
            return "bg-orange-100 text-orange-700";
          case "Quoted":
            return "bg-purple-100 text-purple-700";
          case "Booked":
            return "bg-green-100 text-green-700";
          case "Completed":
            return "bg-gray-100 text-gray-700";
          case "Canceled":
          case "Rejected":
            return "bg-red-100 text-red-700";
          default:
            return "bg-gray-100 text-gray-700";
        }
      };

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      );
    },
  },
];
