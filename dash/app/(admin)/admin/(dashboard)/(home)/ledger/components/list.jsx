"use client";
import React, { useEffect } from "react";
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
import toast, { Toaster } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";


import { useState } from "react";
// import { getApiData } from "../../../../../../helper/common";
import { Input } from "@/components/ui/input";

export function LedgerTable({ type }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    fetchNewsList();
  }, []);


//     try {
//       const response = await getApiData(
//         "api/transactions",
       
//       );

      

//       const data = await response.json();
//       setData(data);
//       console.log(data);
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };
const fetchNewsList = async () => {
    try {
      const apiResData = await getApiData(`api/transactions`);
      console.log(apiResData);
      if (apiResData) {
        setData(apiResData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  const [status, setStatus] = useState("");

  const columns = [
    {
      accessorKey: "sn",
      header: "index",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.index + 1}</div>
      ),
    },

  

 

    {
      accessorKey: "User Name",
      header: "User Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.amount}</div>
      ),
    },

  
    {
      accessorKey: "Business Name",
      header: "Business Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {row?.original?.opening_balance}
        </div>
      ),
    },

    {
      accessorKey: "Business Address",
      header: "Business Address",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {row?.original?.closing_balance}
        </div>
      ),
    },

    {
      accessorKey: "Opening Balance",
      header: "Opening Balance",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {row?.original?.closing_balance}
        </div>
      ),
    },


    {
      accessorKey: "action",
      header: "Action",
      headerProps: { className: "text-center" },
      cell: ({ row }) => (
        <div className="flex space-x-3 rtl:space-x-reverse">
        <Button
          size="icon"
          variant="outline"
          color="secondary"
          className=" h-7 w-7 "
        >
          <Icon icon="heroicons:pencil" className=" h-4 w-4  " />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className=" h-7 w-7 text-green-700"
          color="secondary"
        >
          <Icon icon="heroicons:eye" className=" h-4 w-4  " />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className=" h-7 w-7  text-red-700"
          color="secondary"
        >
          <Icon icon="heroicons:trash" className=" h-4 w-4  " />
        </Button>
      </div>
      ),
    },
  ];
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

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
      <div className="flex items-center flex-wrap gap-2  px-4">
        <Input
          placeholder="Filter..."
          // value={table.getColumn("email")?.getFilterValue() || ""}
          // onChange={(event) =>
          //   table.getColumn("email")?.setFilterValue(event.target.value)
          // }
          className="max-w-sm min-w-[200px] h-10"
        />
      
      </div>
      
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
                  {"No results"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center flex-wrap gap-4 px-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground whitespace-nowrap">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} {"row selected"}
        </div>

        <div className="flex gap-2  items-center">
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
    </>
  );
}

export default LedgerTable;
