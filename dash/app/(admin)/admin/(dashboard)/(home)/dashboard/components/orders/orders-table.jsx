"use client";
import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel ,flexRender} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils"; // Utility for conditional classes
import { getApiData } from "@/helper/common"; // Assume this fetches data from API
import { Badge } from "@/components/ui/badge";

const columns = [
  {
    accessorKey: "invoice",
    header: "Invoice",
    cell: ({ row }) => <span>{row.getValue("invoice")}</span>,
  },
  {
    accessorKey: "tracking_number",
    header: "Tracking Number",
    cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("tracking_number")}</span>,
  },
  // {
  //   accessorKey: "payment_method",
  //   header: "Payment Method",
  //   cell: ({ row }) => <span className="whitespace-nowrap">{row.getValue("payment_method")}</span>,
  // },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>₹ {row.getValue("amount").toLocaleString()}</span>,
  },
  
  {
    accessorKey: "Status",
    header: "Order Status",
    cell: ({ row }) => (
      <Badge
        variant="soft"
        color={
          row?.original?.status === "inprocess"
            ? "info"
            : row?.original?.status === "dispatched"
            ? "success"
            : row?.original?.status === "intransit"
            ? "success"

             : row?.original?.status === "delivered"
            ? "success"

             : row?.original?.status === "pending"
            ? "secondary"

              : row?.original?.status === "completed"
            ? "secondary"

               : row?.original?.status === "cancelled"
            ? "destructive"

              : row?.original?.status === "rejected"
            ? "destructive"

            : "destructive"
        }
        className="capitalize"
      >
        {row?.original?.status}
      </Badge>
    ),
  },
  {
    accessorKey: "Status",
    header: "Payment Status",
    cell: ({ row }) => (
      <Badge
        variant="soft"
        color={
          row?.original?.payment_status === "pending"
            ? "info"
            : row?.original?.payment_status === "paid"
            ? "success"
           
           

              : row?.original?.payment_status === "failed"
            ? "destructive"

            : "destructive"
        }
        className="capitalize"
      >
        {row?.original?.payment_status}
      </Badge>
    ),
  },
];

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const apiResData = await getApiData(`orders`);
        if (apiResData.success) {
          setData(apiResData.orders);
        } else {
          setError(apiResData.message || "Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching:", error);
        setError("Error fetching data");
      }
    };
    fetchOrders();
  }, []);

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <div className="h-full w-full overflow-auto no-scrollbar">
          <Table>
            <TableHeader className="bg-default-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-sm font-semibold text-default-600 h-12 last:text-end whitespace-nowrap">
                      {!header.isPlaceholder && flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="[&_tr:last-child]:border-1">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-default-50 border-default-200">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-sm text-default-600 py-3 last:text-end">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 mt-5">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600">
          <Icon icon="heroicons:chevron-left" className="w-3.5 h-3.5" />
        </Button>
        {table.getPageOptions().map((page, pageIdx) => (
          <Button key={`orders-table-${pageIdx}`} onClick={() => table.setPageIndex(pageIdx)} className={cn("w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600", { "bg-primary text-primary-foreground": pageIdx === table.getState().pagination.pageIndex })}>
            {page + 1}
          </Button>
        ))}
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="w-7 h-7 p-0 bg-default-100 hover:bg-default-200 text-default-600">
          <Icon icon="heroicons:chevron-right" />
        </Button>
      </div>
    </>
  );
};

export default OrdersTable;
