import { Button } from "../components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../components/ui/pagination";

// Props for the PaginationControl component
interface PaginationControlProps {
  page: number; // Current active page
  total: number; // Total number of items
  pageSize: number; // Number of items per page
  onPageChange: (newPage: number) => void; // Callback when page is changed
}

/**
 * PaginationControl Component
 * Renders a responsive pagination bar that shows page numbers,
 * previous/next buttons, and invokes a callback on page change.
 */
export default function PaginationControl({
  page,
  total,
  pageSize,
  onPageChange,
}: PaginationControlProps) {
  const totalPages = Math.ceil(total / pageSize); // Calculate total pages
  if (totalPages <= 1) return null; // Do not render if only one page

  // Dynamically determine which pages to display (up to 3)
  const pagesToShow: number[] = [];
  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) pagesToShow.push(i);
  } else {
    const start = Math.max(1, Math.min(page - 1, totalPages - 2));
    for (let i = start; i < start + 3; i++) pagesToShow.push(i);
  }

  return (
    <Pagination className="justify-end px-4 pb-4">
      <PaginationContent className="gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 text-lg font-bold"
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ‹
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {pagesToShow.map((pg) => (
          <PaginationItem key={pg}>
            <Button
              size="icon"
              className={`h-10 w-10 font-semibold ${
                pg === page
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(pg)}
            >
              {pg}
            </Button>
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <Button
            size="icon"
            variant="outline"
            className="h-10 w-10 text-lg font-bold"
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            ›
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
