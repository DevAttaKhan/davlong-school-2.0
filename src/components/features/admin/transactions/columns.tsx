import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowRight, ArrowRightLeft, ChevronRight } from "lucide-react";
import type { Transaction } from "./data";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "leadId",
    header: "LEAD ID",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">LEAD ID</span>
        <span className="font-medium text-gray-900">
          #{row.original.leadId}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm text-gray-900 font-medium">
          {format(new Date(row.original.date), "d MMM yyyy")}
        </span>
        <span className="text-xs text-gray-500">
          {format(new Date(row.original.date), "HH:mm")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "USER",
    cell: ({ row }) => (
      <span className="font-bold text-gray-900">{row.original.user}</span>
    ),
  },
  {
    accessorKey: "route",
    header: "ROUTE",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>{row.original.from}</span>
        {row.original.routeType === "Return" ? (
          <ArrowRightLeft className="w-3 h-3" />
        ) : (
          <ArrowRight className="w-3 h-3" />
        )}
        <span>{row.original.to}</span>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <span className="font-bold text-green-600">€{row.original.amount}</span>
        {row.original.installments && (
          <span className="text-xs text-gray-400">
            {row.original.installments}
          </span>
        )}
        <ChevronRight className="w-4 h-4 text-blue-500" />
      </div>
    ),
  },
];
