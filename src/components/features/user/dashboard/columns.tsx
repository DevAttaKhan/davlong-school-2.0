import type { ColumnDef } from "@tanstack/react-table";
import { ArrowRight, ArrowRightLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export type Transaction = {
  id: string;
  date: string;
  name: string;
  from: string;
  to: string;
  price: number;
  paid: number;
  total: number;
  type: "One Way" | "Return";
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "LEAD ID",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 uppercase">LEAD ID</span>
        <span className="text-sm font-medium text-gray-900">
          #{row.getValue("id")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "DATE",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">
            {format(date, "d MMM yyyy")}
          </span>
          <span className="text-xs text-gray-500">{format(date, "H:mm")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-gray-900">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    id: "route",
    header: "ROUTE",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{row.original.from}</span>
          {type === "Return" ? (
            <ArrowRightLeft className="h-3 w-3" />
          ) : (
            <ArrowRight className="h-3 w-3" />
          )}
          <span>{row.original.to}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "PRICE",
    cell: ({ row }) => (
      <div className="flex items-center justify-end gap-2">
        <span className="text-sm font-bold text-green-600">
          €{row.original.price}
        </span>
        <span className="text-xs text-gray-400">
          {row.original.paid}/{row.original.total}
        </span>
        <ChevronRight className="h-4 w-4 text-blue-500" />
      </div>
    ),
  },
];
