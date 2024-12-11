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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Switch } from "@/components/ui/switch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ViewModel from "../components/ViewModel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import SegmentIcon from "@mui/icons-material/Segment";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { deleteApiData, getApiData, postApiData } from "@/helper/common";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function BasicDataTable() {
  const [_id, set_id] = React.useState(null);
  const [_id1, set_id1] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpen1, setIsOpen1] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const FetchUserList = async () => {
    try {
      const apiResData = await getApiData(`users`);
      if (apiResData.success === true) {
        setData(apiResData?.users);
      } else {
        setData([]);
        setError(apiResData.message || "Failed to fetch data");
      }
      console.log(view);
    } catch (error) {
      console.error("Error fetching:", error);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    FetchUserList();
  }, []);

  const userDelete = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`users/${_id}`);
      if (response.success === true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await FetchUserList();
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClose1 = () => {
    setIsOpen1(false);
  };

  const DeleteConfirm = (_id) => {
    set_id(_id);
    setIsOpen(true);
  };
  const [view, setView] = useState("");

 // Handle the View button click and open the Sheet
 const ViewConfirm = async (_id) => {
  try {
    const apiResData = await getApiData(`users/${_id}`);
    if (apiResData) {
      setView(apiResData?.user);
      setIsOpen1(true); // Open sheet when view is confirmed
    }
  } catch (error) {
    console.error("Error fetching:", error);
  }
};





  //  console.log(view);

  const columns = [
    {
      accessorKey: "sn",
      header: "S No",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.index + 1}</div>
      ),
    },

   

    {
      accessorKey: "name",
      header: "Full Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <span>{row.original.name}</span>
        </div>
      ),
    },

    {
      accessorKey: "email",
      header: "Email Address",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.email}</div>
      ),
    },
    
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <Badge
        variant="soft"
        color={
          row.original?.gender === "male"
            ? "info"
            : row.original.gender === "female"
            ? "success"
            : row.original.gender === "other"
            ? "warning"
           
            : "#9c27b0" // Fallback color
        }
        className="capitalize" 
      >
        {row.original.gender}
      </Badge>
      
      ),
    },
    {
      accessorKey: "mobile",
      header: "mobile",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row.original.mobile}</div>
      ),
    },
    
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
        variant="soft"
        color={
          row.original?.role === "user"
            ? "info"
            : row.original.role === "admin"
            ? "success"
            : row.original.role === "staff"
            ? "warning"
            : row.original.role === "retailer"
            ? "secondary"
            : "#9c27b0" // Fallback color
        }
        className="capitalize" 
      >
        {row.original.role}
      </Badge>
      
      ),
    },

    {
      accessorKey: "action",
      header: "Action",
      headerProps: { className: "text-center" },
      cell: ({ row }) => (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Link href={`/admin/users/edit/${row?.original?._id}`}>
            <Button
              size="icon"
              variant="outline"
              color="secondary"
              className="h-7 w-7"
            >
              <Icon icon="heroicons:pencil" className="h-4 w-4" />
            </Button>
          </Link>

       
          <Sheet open={isOpen1} onOpenChange={handleClose1}>
             <SheetTrigger asChild>
              <Button
                onClick={() => ViewConfirm(row.original._id)}
                size="icon"
                variant="outline"
                color="secondary"
                className="h-7 w-7 text-green-700"
              >
                <Icon icon="heroicons:eye" className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="max-w-md p-0">
              <SheetHeader className="py-3 pl-3.5">
                <SheetTitle>User Details</SheetTitle>
              </SheetHeader>
              <hr />
              <div
                className="flex flex-col justify-between overflow-y-auto custom-scrollbar p-4"
                style={{ height: "calc(100vh - 120px)" }}
              >
                <form className="p-8 bg-gradient-to-br ">
                  <h2 className="text-2xl font-bold mb-6 text-blue-800 border-b-2 border-blue-200 pb-2">
                    User Details
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                   
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <Label className="text-gray-600 font-medium">Name</Label>
                      <p className="text-gray-800 font-semibold">
                        {view?.name || "N/A"}
                      </p>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <Label className="text-gray-600 font-medium">Email</Label>
                      <p className="text-gray-800 font-semibold">
                        {view?.email || "N/A"}
                      </p>
                    </div>

                   

                    

                   

                    {/* Mobile */}
                    <div className="flex flex-col gap-1">
                      <Label className="text-gray-600 font-medium">
                        Mobile
                      </Label>
                      <p className="text-gray-800 font-semibold">
                        {view?.mobile || "N/A"}
                      </p>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col gap-1">
                      <Label className="text-gray-600 font-medium">
                        Gender
                      </Label>
                      <p className="text-gray-800 font-semibold">
                        {view?.gender || "N/A"}
                      </p>
                    </div>
                   
                  </div>
                </form>
              </div>
              <div className=" pt-4 px-6">
                <div className="flex justify-start gap-3">
                  <SheetClose asChild>
                    <Button
                      color="warning"
                      variant="outline"
                      size="xs"
                      className="flex-1"
                    >
                      Close
                    </Button>
                  </SheetClose>
                 
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Button
            onClick={() => DeleteConfirm(row.original._id)}
            size="icon"
            variant="outline"
            color="secondary"
            className="h-7 w-7 text-red-700"
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
          {table.getFilteredRowModel().rows.length} {"rows selected"}
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
          {" "}
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-base font-medium ">
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                >
                  {" "}
                  User Delete Confirm
                </p>
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center text-center">
              <span className="text-sm text-default-500  mt-1 block"></span>
              <p
                style={{
                  fontSize: "16px",
                  textAlign: "justify",
                  lineHeight: "30px",
                  width: "100%",
                }}
                width={"100%;"}
              >
                Are you sure you want to delete this user?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  {"Cencel"}
                </Button>
              </DialogClose>
              {/* <Link href="/admin/kyc-update" > */}
              <Button onClick={() => userDelete()} type="button">
                Delete Confirm
              </Button>
              {/* </Link> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default BasicDataTable;