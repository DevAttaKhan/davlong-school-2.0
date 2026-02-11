import {
  flexRender,
  type Table,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface DataTableProps<TData> {
  table: Table<TData>;
  className?: string;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({
  table,
  className,
  onRowClick,
}: DataTableProps<TData>) {
  return (
    <div
      className={cn(
        "rounded-md border border-gray-200 bg-white overflow-hidden",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        "px-6 py-3 font-medium whitespace-nowrap select-none",
                        header.column.getCanSort() && "cursor-pointer hover:bg-gray-100"
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {{
                          asc: <ArrowUp className="h-4 w-4" />,
                          desc: <ArrowDown className="h-4 w-4" />,
                        }[isSorted as string] ?? (
                            <ArrowUpDown className="h-4 w-4 text-gray-300" />
                          )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    "bg-white hover:bg-gray-50 transition-colors",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center text-gray-500"
                >
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
