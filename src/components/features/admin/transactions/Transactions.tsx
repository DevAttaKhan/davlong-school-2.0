import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Pagination } from "@/components/common/table/Pagination";
import { DebouncedInput } from "@/components/common/table/DebouncedInput";
import { columns } from "./columns";
import type { Transaction } from "./data";
import { dummyTransactions } from "./data";
import { TransactionDetails } from "./TransactionDetails";
import { TransactionMobileCard } from "./TransactionMobileCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { X, ChevronDown } from "lucide-react";
import { BottomDrawer } from "@/components/common/BottomDrawer";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

export const AdminTransactions = () => {
  const [search, setSearch] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const isMobile = useIsMobile();

  // Filter data based on search
  const filteredData = dummyTransactions.filter((item) => {
    const matchesSearch =
      search === "" ||
      item.user.toLowerCase().includes(String(search).toLowerCase()) ||
      item.leadId.includes(String(search)) ||
      item.from.toLowerCase().includes(String(search).toLowerCase()) ||
      item.to.toLowerCase().includes(String(search).toLowerCase());
    return matchesSearch;
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

  const handleRowClick = (row: Transaction) => {
    setSelectedTransaction(row);
  };

  const closeDetails = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="w-full">
            <DebouncedInput
              value={search}
              onChange={(value) => {
                setSearch(value);
                setCurrentPage(1);
              }}
              placeholder="Search transactions"
              className="w-full"
            />
          </div>
        </div>

        {/* Sort/Filter Dropdown placeholder */}
        <div className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
          <span>Latest first</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="flex gap-6 relative">
        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${selectedTransaction && !isMobile ? "w-[calc(100%-620px)]" : "w-full"}`}
        >
          {isMobile ? (
            <div className="space-y-4">
              {paginatedData.map((transaction) => (
                <TransactionMobileCard
                  key={transaction.id}
                  transaction={transaction as Transaction}
                  onClick={() => handleRowClick(transaction)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <DataTable
                table={table}
                onRowClick={handleRowClick}
              />
            </div>
          )}

          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Desktop Detail Panel */}
        <div
          className={`shrink-0 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col self-start sticky top-6 max-h-[calc(100vh-100px)] overflow-y-auto transition-all duration-300 ease-in-out ${!isMobile && selectedTransaction
            ? "w-[600px] opacity-100 translate-x-0"
            : "w-0 opacity-0 translate-x-10 pointer-events-none hidden"
            }`}
        >
          {selectedTransaction && (
            <>
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-gray-900">
                  Transaction Details
                </h3>
                <button
                  onClick={closeDetails}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <TransactionDetails transaction={selectedTransaction} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Bottom Drawer */}
      <BottomDrawer
        isOpen={!!selectedTransaction && isMobile}
        onClose={closeDetails}
        title="Transaction Details"
      >
        {selectedTransaction && (
          <div className="p-4">
            <TransactionDetails transaction={selectedTransaction} />
          </div>
        )}
      </BottomDrawer>
    </div>
  );
};
