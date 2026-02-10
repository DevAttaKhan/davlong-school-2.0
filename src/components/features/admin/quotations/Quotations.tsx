import { useState } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Pagination } from "@/components/common/table/Pagination";
import { DebouncedInput } from "@/components/common/table/DebouncedInput";
import { TableTabs } from "@/components/common/table/TableTabs";
import { columns, type AdminQuotation } from "./columns";

import { dummyQuotations } from "./data";
import { QuotationMobileCard } from "./QuotationMobileCard";
import { QuotationDetails } from "./QuotationDetails";
import { BottomDrawer } from "@/components/common/BottomDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Fragment } from "react";

const TABS = [
  "All",
  "Pending",
  "Modified",
  "Quoted",
  "Booked",
  "Completed",
  "Canceled",
  "Rejected",
];

const SCHOOLS = [
  "Select School",
  "Clonakilty Community College",
  "Sacred Heart Clonakilty",
  "St. Patricks BNS",
  "Mount Saint Michael",
];

export const AdminQuotations = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState<string | number>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSchool, setSelectedSchool] = useState(SCHOOLS[0]);
  const itemsPerPage = 10;

  const [selectedQuotation, setSelectedQuotation] =
    useState<AdminQuotation | null>(null);
  const isMobile = useIsMobile();

  // Filter data based on active tab and search
  const filteredData = dummyQuotations.filter((item) => {
    const matchesTab = activeTab === "All" || item.status === activeTab;
    const matchesSearch =
      search === "" ||
      item.schoolName.toLowerCase().includes(String(search).toLowerCase()) ||
      item.id.includes(String(search));
    const matchesSchool =
      selectedSchool === "Select School" || item.schoolName === selectedSchool;
    return matchesTab && matchesSearch && matchesSchool;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (row: AdminQuotation) => {
    setSelectedQuotation(row);
  };

  const closeDetails = () => {
    setSelectedQuotation(null);
  };

  return (
    <div className="h-full flex flex-col p-4 sm:p-6 space-y-6">
      <div className="shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* School Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Listbox value={selectedSchool} onChange={setSelectedSchool}>
            <div className="relative w-full sm:w-64">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm border border-gray-300 focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate text-gray-700">
                  {selectedSchool}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {SCHOOLS.map((school, schoolIdx) => (
                    <Listbox.Option
                      key={schoolIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={school}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {school}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <div className="w-full sm:w-72">
          <DebouncedInput
            value={search}
            onChange={(value) => setSearch(value)}
            placeholder="Search Trips"
          />
        </div>
      </div>

      <div className="shrink-0">
        <TableTabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      {/* Desktop Split View */}
      <div className="hidden min-[786px]:flex gap-6 items-start flex-1 min-h-0">
        {/* Table Section */}
        <div className="flex-1 min-w-0 h-full flex flex-col transition-all duration-300">
          <div className="flex-1 w-full overflow-auto pb-4">
            <DataTable
              columns={columns}
              data={paginatedData}
              onRowClick={handleRowClick}
              className="w-full whitespace-nowrap"
            />
          </div>
          <div className="shrink-0 mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Details Section */}
        {selectedQuotation && (
          <div className="w-[600px] shrink-0 h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="shrink-0 flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-900">
                Trip Details #{selectedQuotation.id}
              </h3>
              <button
                onClick={closeDetails}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <QuotationDetails quotation={selectedQuotation} />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Card View */}
      <div className="block min-[786px]:hidden space-y-4 flex-1 overflow-y-auto">
        {paginatedData.map((item) => (
          <QuotationMobileCard
            key={item.id}
            quotation={item}
            onClick={() => handleRowClick(item)}
          />
        ))}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Mobile Bottom Drawer */}
      <BottomDrawer
        isOpen={!!selectedQuotation && isMobile}
        onClose={closeDetails}
        title={selectedQuotation ? `Trip #${selectedQuotation.id}` : "Details"}
      >
        {selectedQuotation && (
          <QuotationDetails quotation={selectedQuotation} />
        )}
      </BottomDrawer>
    </div>
  );
};
