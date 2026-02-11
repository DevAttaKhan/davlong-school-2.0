import { useState, useMemo, useCallback } from "react";
import { DataTable } from "@/components/common/table/DataTable";
import { Pagination } from "@/components/common/table/Pagination";
import { DebouncedInput } from "@/components/common/table/DebouncedInput";
import { TableTabs } from "@/components/common/table/TableTabs";
import { getColumns } from "./columns";

import { QuotationMobileCard } from "./QuotationMobileCard";
import { BottomDrawer } from "@/components/common/BottomDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGetAllLeadsQuery, useGetSchoolsQuery } from "@/store/apis/lead.api";
import type { IGetLeadsParams, IAdminLead } from "@/types/lead.interface";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";
import { SchoolSelect } from "./SchoolSelect";
import { AppFalbackWrapper } from "@/components/common/AppFalbackWrapper";
import { Loading } from "./Loading";
import { Error } from "./Error";
import { cn } from "@/lib/utils";
import { QuotationDetailsPanel } from "./QuotationDetailsPanel";
import { QuotationDetails } from "./QuotationDetails";

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

export const AdminQuotations = () => {
  // Consolidated Filter State
  const [filters, setFilters] = useState({
    activeTab: "All",
    search: "" as string | number,
    page: 1,
    limit: 10,
    school: "Select School",
    sorting: [] as SortingState,
  });

  const [selectedQuotationId, setSelectedQuotationId] =
    useState<string | null>(null);

  const isMobile = useIsMobile();

  // Fetch schools
  const { data: schoolsData } = useGetSchoolsQuery();

  const schools = useMemo(() => {
    const fetchedSchools = schoolsData?.data || [];
    return ["Select School", ...fetchedSchools];
  }, [schoolsData]);

  // Derive query parameters
  const queryParams: IGetLeadsParams = useMemo(() => {
    const params: IGetLeadsParams = {
      page: filters.page,
      limit: filters.limit,
      search: String(filters.search),
    };

    if (filters.activeTab !== "All") {
      params.status = filters.activeTab.toUpperCase();
    }

    if (filters.school !== "Select School") {
      params.school_name = filters.school;
    }

    if (filters.sorting.length > 0) {
      params.sort = filters.sorting[0].id;
      params.order = filters.sorting[0].desc ? "DESC" : "ASC";
    }

    return params;
  }, [filters]);

  const { data: apiResponse, isLoading } = useGetAllLeadsQuery(queryParams, {
    refetchOnMountOrArgChange: true,
  });

  // Use API data directly
  const tableData: IAdminLead[] = useMemo(() => {
    return apiResponse?.data || [];
  }, [apiResponse]);

  const totalPages = apiResponse?.pagination?.totalPages || 1;

  // Table Instance
  const columns = useMemo(
    () => getColumns(!!selectedQuotationId),
    [selectedQuotationId]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    state: {
      sorting: filters.sorting,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(filters.sorting) : updater;
      setFilters((prev) => ({ ...prev, sorting: newSorting }));
    },
  });

  // Handlers
  const handleRowClick = (row: IAdminLead) => {
    setSelectedQuotationId(String(row.quote_id));
  };

  const closeDetails = () => {
    setSelectedQuotationId(null);
  };


  const handleFilterChange = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));

  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page: page }));
  };

  return (
    <AppFalbackWrapper isLoading={isLoading} isError={false} LoadingComponent={<Loading />} ErrorComponent={<Error />}>
      <div className="h-full flex flex-col p-4 sm:p-6 space-y-6">
        <div className="shrink-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* School Select */}
          <SchoolSelect
            schools={schools}
            selectedSchool={filters.school}
            onChange={(value) => handleFilterChange('school', value)}
          />

          <div className="w-full sm:w-72">
            <DebouncedInput
              value={filters.search}
              onChange={(value) => handleFilterChange('search', value)}
              placeholder="Search Trips"
            />
          </div>
        </div>

        <div className="shrink-0">
          <TableTabs
            tabs={TABS}
            activeTab={filters.activeTab}
            onTabChange={(value) => handleFilterChange('activeTab', value)}
          />
        </div>

        {/* Desktop Split View */}
        <div className="hidden min-[786px]:flex gap-6 items-start flex-1 min-h-0 relative">
          {/* Table Section */}
          <div
            className={cn(
              "flex-col transition-all duration-300 ease-in-out h-full",
              selectedQuotationId ? "w-[40%]" : "w-full"
            )}
          >
            <div className="flex-1 w-full overflow-auto pb-4 relative h-full no-scrollbar">
              <DataTable
                onRowClick={handleRowClick}
                className="w-full whitespace-nowrap"
                table={table}
              />
            </div>
            <div className="shrink-0 mt-4">
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          {/* Details Section */}
          <QuotationDetailsPanel
            quotationId={selectedQuotationId}
            onClose={closeDetails}
            onDeleteSuccess={closeDetails}
          />
        </div>

        {/* Mobile Card View */}
        <div className="block min-[786px]:hidden space-y-4 flex-1 overflow-y-auto no-scrollbar">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            tableData.map((item) => (
              <QuotationMobileCard
                key={item.quote_id}
                quotation={item}
                onClick={() => handleRowClick(item)}
              />
            ))
          )}
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Mobile Bottom Drawer */}
        <BottomDrawer
          isOpen={!!selectedQuotationId && isMobile}
          onClose={closeDetails}
          title={selectedQuotationId ? `Trip #${selectedQuotationId} ` : "Details"}
        >
          {selectedQuotationId && (
            <QuotationDetails
              quotationId={selectedQuotationId}
              onDeleteSuccess={closeDetails}
            />
          )}
        </BottomDrawer>
      </div>
    </AppFalbackWrapper>
  );
};
