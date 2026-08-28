import { useState } from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import { cn } from "@/shared/lib/cn"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Render the "Showing X to Y of Z entries" footer. Default: true. */
  showEntriesCount?: boolean
  /** Message shown when there are no rows. */
  emptyMessage?: string
  /** Rows per page. Omit to disable pagination (show all rows). */
  pageSize?: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showEntriesCount = true,
  emptyMessage = "No results.",
  pageSize,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const paginated = pageSize != null

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    ...(paginated
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          initialState: { pagination: { pageSize } },
        }
      : {}),
  })

  const rows = table.getRowModel().rows

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-lg border border-border">
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <TableHead
                      key={header.id}
                      className="border-b border-border bg-muted/60 text-xs font-semibold tracking-wide text-muted-foreground uppercase not-last:border-r"
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          type="button"
                          onClick={header.column.getToggleSortingHandler()}
                          className="inline-flex w-full items-center justify-between gap-2 select-none"
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                          </span>
                          {sorted === "asc" ? (
                            <ChevronUp className="size-3.5 shrink-0" />
                          ) : sorted === "desc" ? (
                            <ChevronDown className="size-3.5 shrink-0" />
                          ) : (
                            <ChevronsUpDown className="size-3.5 shrink-0 opacity-50" />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length ? (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border-b border-border py-3 not-last:border-r",
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {(showEntriesCount || (paginated && table.getPageCount() > 1)) && (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          {showEntriesCount &&
            (() => {
              const total = table.getFilteredRowModel().rows.length
              const { pageIndex, pageSize: ps } = table.getState().pagination
              const start = total === 0 ? 0 : paginated ? pageIndex * ps + 1 : 1
              const end = paginated
                ? Math.min(total, (pageIndex + 1) * ps)
                : rows.length
              return (
                <p className="text-sm text-muted-foreground">
                  Showing {start} to {end} of {total} entries
                </p>
              )
            })()}

          {paginated && table.getPageCount() > 1 && (
            <div className="flex flex-wrap items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                ← Previous
              </Button>
              {Array.from({ length: table.getPageCount() }, (_, i) => (
                <Button
                  key={i}
                  variant={
                    table.getState().pagination.pageIndex === i
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => table.setPageIndex(i)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next →
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
