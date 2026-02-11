import type { ColumnDef } from "@tanstack/react-table";
import {
  Wallet,
  Users,
  ArrowRight,
  School,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { IAdminLead } from "@/types/lead.interface";

export type QuotationStatus =
  | "Pending"
  | "Modified"
  | "Quoted"
  | "Booked"
  | "Completed"
  | "Canceled"
  | "Rejected";

export const getStatusColor = (status: string) => {
  // Normalize status for comparison (case-insensitive)
  const normalizedStatus = status.toLowerCase();

  switch (normalizedStatus) {
    case "pending":
      return "bg-blue-100 text-blue-700";
    case "modified":
      return "bg-orange-100 text-orange-700";
    case "quoted":
      return "bg-purple-100 text-purple-700";
    case "booked":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-gray-100 text-gray-700";
    case "canceled":
    case "rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const formatCurrency = (amount: string | number) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(value)) return "€0.00";
  return `€${value.toFixed(2)}`;
};

export const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return { date: "N/A", time: "" };
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { date: "Invalid Date", time: "" };

  return {
    date: format(date, "MMM d, yyyy"),
    time: format(date, "h:mm a")
  };
};

export const formatStatus = (status: string) => {
  if (!status) return "Unknown";
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export const getColumns = (isDetailsOpen: boolean): ColumnDef<IAdminLead>[] => {
  const allColumns: ColumnDef<IAdminLead>[] = [
    {
      accessorKey: "quote_id",
      header: "QUOTE ID",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 font-medium text-gray-900">
          <Wallet className="h-4 w-4 text-gray-500" />
          {row.getValue("quote_id")}
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: "REQUESTED AT",
      cell: ({ row }) => {
        const { date, time } = formatDateTime(row.getValue("created_at"));

        return (
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-900">{date}</span>
            {time && <span className="text-gray-500 text-xs">{time}</span>}
          </div>
        );
      },
    },
    {
      accessorKey: "school",
      header: "SCHOOL",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-900">
          <span className="p-1.5 bg-orange-100 text-orange-600 rounded-md shrink-0">
            <School className="h-4 w-4" />
          </span>
          <span className="font-medium whitespace-normal min-w-[200px]">
            {row.getValue("school") || "N/A"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "pickup",
      header: "FROM",
      cell: ({ row }) => (
        <div className="min-w-[200px] text-sm text-gray-900 font-medium whitespace-normal">
          {row.getValue("pickup") || "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "dropoff",
      header: "TO",
      cell: ({ row }) => {
        // Default to "One Way" and ArrowRight since API doesn't provide type yet
        // const type = "One Way";
        return (
          <div className="flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-blue-500 shrink-0" />
            <div className="min-w-[200px] text-sm text-gray-900 font-medium whitespace-normal">
              {row.getValue("dropoff") || "N/A"}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "trip_date",
      header: "DATE & TIME",
      cell: ({ row }) => {
        const { date, time } = formatDateTime(row.getValue("trip_date"));

        return (
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-900">{date}</span>
            {time && <span className="text-gray-500 text-xs">{time}</span>}
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
          {row.getValue("passengers") || 0}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "PRICE",
      cell: ({ row }) => {
        return (
          <div className="font-medium text-gray-900">
            {formatCurrency(row.getValue("price"))}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const rawStatus = row.getValue("status") as string;
        const formattedStatus = formatStatus(rawStatus);

        return (
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
              getStatusColor(rawStatus)
            )}
          >
            {formattedStatus}
          </span>
        );
      },
    },
  ];

  if (isDetailsOpen) {
    return allColumns.filter((col) => {
      const key = (col as any).accessorKey;
      // Adjusted keys to match IAdminLead
      return ["quote_id", "school", "status"].includes(key);
    });
  }

  return allColumns;
};

// Keep 'columns' for backward compatibility if needed, or remove if confident
export const columns = getColumns(false);
