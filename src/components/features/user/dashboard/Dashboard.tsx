import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { DebouncedInput } from "@/components/common/table/DebouncedInput";
import { columns } from "./columns";
import { dummyTransactions } from "./data";
import { ChevronDown } from "lucide-react";
import { DashboardMobileCard } from "./DashboardMobileCard";

export const UserDashboard = () => {
  const [search, setSearch] = useState<string | number>("");

  const filteredData = dummyTransactions.filter((item) => {
    return (
      search === "" ||
      item.name.toLowerCase().includes(String(search).toLowerCase()) ||
      item.id.includes(String(search)) ||
      item.from.toLowerCase().includes(String(search).toLowerCase()) ||
      item.to.toLowerCase().includes(String(search).toLowerCase())
    );
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Transactions</h1>

      <div className="space-y-4">
        <DebouncedInput
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder="Search transactions"
        />

        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1 text-sm text-gray-500">
            Latest first
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="hidden min-[786px]:block [&_thead]:hidden">
          {" "}
          {/* Hide headers if needed to match image exactly, but keeping them is usually better for accessibility. The image seems to NOT show headers for the list, or they are very subtle. I'll hide them with CSS if desired, but for now I'll leave them or hide them based on class. */}
          {/* Actually, looking at the image again, there are NO headers visible for the columns like "Lead ID", "Date". It looks like a list of cards or rows. But TanStack can do headless. 
               However, to keep it consistent with "create the data table for common", I will use the DataTable.
               I will add a class to hide headers if I want to mimic the look, or just keep them.
               The user said "create the data table for common".
               I'll use the DataTable.
           */}
          <DataTable
            columns={columns}
            data={filteredData}
            className="border-none"
          />
        </div>

        <div className="block min-[786px]:hidden">
          {filteredData.map((item) => (
            <DashboardMobileCard key={item.id} transaction={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
