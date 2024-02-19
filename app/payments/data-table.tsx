"use client";

import * as React from "react";
import status from "@/app/payments/data/status";
import category from "@/app/payments/data/category";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ComboboxDemo } from "@/components/ui/combobox";
import { DataTableFacetedFilter } from "@/components/ui/dataitable-facted-filter";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filters, setFilters] = React.useState("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setFilters,
    state: {
      columnFilters,
      columnVisibility,
      globalFilter: filters,
    },
  });

  return (
    <div>
      <div className=" container flex justify-between align-middle shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md mb-7 py-4">
        <div className=" flex justify-center align-middle font-bold text-2xl">
          {" "}
          ORDERS
        </div>
        <div>
          {" "}
          <Button>CREATE NEW</Button>{" "}
        </div>
      </div>
      <div>
        <div className="flex items-center py-4 justify-between shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md container mb-7">
          <div className=" flex-[2]">
            <div className=" font-bold py-1">What Are You Looking For</div>
            {/* <Input
              placeholder="Filter emails..."
              value={
                (table.getColumn("email")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="max-w-sm outline-none"
            /> */}
            <Input
              placeholder="Search for name , email , category...."
              value={filters}
              onChange={(event) => setFilters(event.target.value)}
              className="max-w-sm outline-none"
            />
          </div>
          <div className=" flex gap-4 align-middle">
            <div>
              <div className=" font-bold">Category</div>
              {/* <ComboboxDemo data={category} table={table} type={"source"} /> */}
              {table.getColumn("source") && (
                <DataTableFacetedFilter
                  column={table.getColumn("source")}
                  title="Category"
                  options={category}
                />
              )}
            </div>
            <div>
              <div className=" font-bold">Status</div>
              {/* <ComboboxDemo data={status} table={table} type={"status"} /> */}
              {table.getColumn("status") && (
                <DataTableFacetedFilter
                  column={table.getColumn("status")}
                  title="Status"
                  options={status}
                />
              )}
            </div>
            <div className=" mt-[auto]">
              <Button variant="default">SEARCH</Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" container shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  rounded-md py-4 ">
        <div className="flex justify-between align-middle ">
          <div className="py-4 text-lg font-bold">PRODUCT SURVEY</div>
          <div className=" flex gap-4 align-middle justify-center ">
            <div>
              {" "}
              <span className=" mr-2">show :</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto font-bold">
                    ALL
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              {" "}
              <Button>DISPATCH SELECTED</Button>{" "}
            </div>
            <div>
              {" "}
              <div className="flex items-center justify-end space-x-2 ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className=" container rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
