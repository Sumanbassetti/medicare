import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import PaginationControl from "./PaginationControl";

// Defines a column in the table with a key, label, and optional custom render function
type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface CommonTableProps<T> {
  data: T[]; // Array of data items to display in the table
  isLoading?: boolean; // If true, shows loading state
  columns: Column<T>[]; // Column definitions
  paginationEnabled?: boolean; // Whether to show pagination (optional, unused here)
  total?: number; // Total number of items (for pagination)
  page?: number; // Current page number
  pageSize?: number; // Items per page
  onPageChange?: (newPage: number) => void; // Handler for page change
}

// Generic table component for displaying paginated data with loading and empty states
const CommonTable = <T extends { id: number | string }>({
  data,
  isLoading = false,
  columns,
  paginationEnabled = false,
  total = 0,
  page = 1,
  pageSize = 10,
  onPageChange,
}: CommonTableProps<T>) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm min-h-[400px] flex flex-col justify-between">
      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="p-6 animate-pulse space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full" />
          ))}
        </div>
      ) : // Empty State
      data.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0v-4m4-4h8m-4-4v8m-4 4h8"
            />
          </svg>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            No data available
          </h4>
          <p className="text-gray-500">
            Records will appear here once available.
          </p>
        </div>
      ) : (
        // Table Rendering
        <>
          <div className="overflow-x-auto">
            <Table className="px-4">
              {/* Table Header */}
              <TableHeader>
                <TableRow className="bg-[#EBEFF5]">
                  {columns.map((col) => (
                    <TableHead
                      key={String(col.key)}
                      className="text-base text-gray-700 py-3 px-4"
                    >
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={String(row.id)}
                    className="font-medium text-sm leading-none tracking-[-0.03em] font-inter text-[#3D5A6B]"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={String(col.key)}
                        className="py-4 px-4 text-[#3D5A6B]"
                      >
                        {col.render ? col.render(row) : (row[col.key] as any)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {onPageChange && page && pageSize && (
            <div className="mt-4 flex justify-end pr-4 pb-4">
              <PaginationControl
                page={page}
                total={total}
                pageSize={pageSize}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommonTable;
