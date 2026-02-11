import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Pagination } from "@/components/common/table/Pagination";
import { DebouncedInput } from "@/components/common/table/DebouncedInput";
import { columns } from "./columns";
import { dummyUsers } from "./data";
import { UserMobileCard } from "./UserMobileCard";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

export const AdminUsersList = () => {
  const [search, setSearch] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = dummyUsers.filter((item) => {
    return (
      search === "" ||
      item.schoolName.toLowerCase().includes(String(search).toLowerCase()) ||
      item.email.toLowerCase().includes(String(search).toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="w-full">
        <DebouncedInput
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder="Search users"
        />
      </div>

      <div className="hidden min-[786px]:block">
        <DataTable table={table} />
      </div>

      <div className="block min-[786px]:hidden">
        {paginatedData.map((item) => (
          <UserMobileCard key={item.id} user={item} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
