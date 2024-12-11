"use client";
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteApiData, getApiData } from "@/helper/common";
import Link from "next/link";

export function BasicDataTable() {
  const [id, setId] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [view, setView] = React.useState("");
  const [pdfUrl, setPdfUrl] = React.useState("");

  const handleClose1 = () => {
    setIsOpen1(false);
  };

  const ViewConfirm = async (id) => {
    setIsOpen1(true);
    try {
      const apiResData = await getApiData(`invoice/${id}`);
      if (apiResData.success) {
        setView(apiResData?.invoice); // Adjusted to reflect correct API response field
        setPdfUrl(apiResData?.invoice?.pdfUrl); // Assuming PDF URL is provided
      } else {
        toast.error("Failed to fetch invoice data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching invoice data");
    }
  };

  const fetchInvoiceList = async () => {
    try {
      const apiResData = await getApiData(`invoice/list`);
      if (apiResData.success === true) {
        setData(apiResData?.invoices);
      } else {
        setData([]);
        setError(apiResData.message || "Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchInvoiceList();
  }, []);

  const invoiceDelete = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`invoice/${id}`);
      if (response.success === true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await fetchInvoiceList(); // Fetch updated data
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error deleting invoice");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const DeleteConfirm = (id) => {
    setId(id);
    setIsOpen(true);
  };

  const columns = [
    {
      accessorKey: "sn",
      header: "S NO",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.index + 1}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);
        return (
          <div className="whitespace-nowrap">
            {createdAt.toLocaleDateString()}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Time",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);
        return (
          <div className="whitespace-nowrap">
            {createdAt.toLocaleTimeString()}
          </div>
        );
      },
    },
    {
      accessorKey: "filename",
      header: "Invoice Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.filename}</div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      headerProps: { className: "text-center" },
      cell: ({ row }) => (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link href={`/admin/categories/edit/${row?.original?.id}`}>
            {/* Uncomment and configure if you have edit functionality */}
            {/* <Button
              size="icon"
              variant="outline"
              color="secondary"
              className="h-7 w-7"
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button> */}
          </Link>
          <Link href={`http://localhost:5000/invoice/${row.original.id}`}>
          <Button
            // onClick={() => ViewConfirm(row.original.id)}
            size="icon"
            variant="outline"
            className="h-7 w-7 text-green-700"
            color="secondary"
          >
            <Icon icon="heroicons:eye" className="h-4 w-4" />
          </Button>
          </Link>
         
          <Button
            onClick={() => DeleteConfirm(row.original.id)}
            size="icon"
            variant="outline"
            className="h-7 w-7 text-red-700"
            color="secondary"
          >
            <Icon icon="heroicons:trash" className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
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
                  No results
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} rows selected
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-left" className="w-5 h-5" />
          </Button>

          {table.getPageOptions().map((page, pageIdx) => (
            <Button
              key={`basic-data-table-${pageIdx}`}
              onClick={() => table.setPageIndex(pageIdx)}
              variant={`${
                pageIdx === table.getState().pagination.pageIndex
                  ? ""
                  : "outline"
              }`}
              className={cn("w-8 h-8")}
            >
              {page + 1}
            </Button>
          ))}

          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="outline"
            size="icon"
            className="h-8 w-8"
          >
            <Icon icon="heroicons:chevron-right" className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div>
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium text-center">
                Invoice Delete Confirm
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center text-center">
              <p className="text-sm text-default-500 mt-1">
                Are you sure you want to delete this invoice?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={invoiceDelete} type="button">
                Confirm Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* View Invoice Dialog */}
      <div>
        <Dialog open={isOpen1} onOpenChange={handleClose1}>
          <DialogContent size="2xl">
            <DialogHeader>
              <DialogTitle className="text-base font-medium text-default-700">
                Invoice Preview
              </DialogTitle>
            </DialogHeader>

           
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default BasicDataTable;
