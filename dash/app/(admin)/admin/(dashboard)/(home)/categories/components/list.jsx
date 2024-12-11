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
  

  const FetchCategoryList = async () => {
    try {
      const apiResData = await getApiData(`categories`);
     
      if (apiResData.success) {
        setData(apiResData?.hierarchy);
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
    FetchCategoryList();
  }, []);

  const categoryDel = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`categories/${_id}`);
      if (response.success === true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await FetchCategoryList();
        setIsOpen(false);
      }
      else {
        toast.error(response.error)
      }
    } catch (error) {
      toast.error(data.message);
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
  const baseUrl = process.env.NEXT_PUBLIC_APIBASEURL || '';
 // Handle the View button click and open the Sheet
 const ViewConfirm = async (_id) => {
  try {
    const apiResData = await getApiData(`categories/${_id}`);
    if (apiResData) {
      setView(apiResData?.category);
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
      accessorKey: "profile",
      header: "Category Image",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
            <img
          // src={row.original.images && row.original.images[0]}
          src={row.original?`${baseUrl}/${row.original.cat_image}` : '/placeholder.jpg'} 
          alt="Product"
          className="h-8 w-8 object-contain"
        />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "category_hierarchy",
      header: "Category Hierarchy & Actions",
      cell: ({ row }) => {
        const category = row.original;
  
        const renderChildren = (children) => {
          return (
            <ul className="ml-4">
              {children.map((child) => (
                <li key={child._id} className="flex justify-between items-center">
                  <div>{child.name}</div>
  
                  {/* Edit button for child category */}
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/categories/edit/${child._id}`}>
                      <Button
                        size="icon"
                        variant="outline"
                        color="secondary"
                        className="h-7 w-7 mt-2 mx-2"
                      >
                        <Icon icon="heroicons:pencil" className="h-4 w-4" />
                      </Button>
                    </Link>
  
                    {/* Delete button for child category */}
                    <Button
                      onClick={() => DeleteConfirm(child._id)}
                      size="icon"
                      variant="outline"
                      color="secondary"
                      className="h-7 w-7 text-red-700 mt-2 mx-2"
                    >
                      <Icon icon="heroicons:trash" className="h-4 w-4" />
                    </Button>
                  </div>
  
                  {/* Recursively render children if they exist */}
                  {child.children && child.children.length > 0 && renderChildren(child.children)}
                </li>
              ))}
            </ul>
          );
        };
  
        return (
          <div className="whitespace-nowrap">
            {/* Display Parent Category */}
            <div className="flex justify-between items-center ">
           
   
              {/* <div className="flex items-center space-x-2 ">
             <span style={{ color: "green" }}>Cannot delete{"=>"} category has subcategories.</span>

                <Link href={`/admin/categories/edit/${category._id}`}>
                  <Button
                    size="icon"
                    variant="outline"
                    color="secondary"
                    className="h-7 w-7"
                  >
                    <Icon icon="heroicons:pencil" className="h-4 w-4" />
                  </Button>
                </Link>
  
                <Button
                  onClick={() => DeleteConfirm(category._id)}
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7 text-red-700"
                >
                  <Icon icon="heroicons:trash" className="h-4 w-4" />
                </Button>
              </div> */}
               {!category.children.length > 0 &&
                 <div className="flex items-center space-x-2 ">

                <Link href={`/admin/categories/edit/${category._id}`}>
                  <Button
                    size="icon"
                    variant="outline"
                    color="secondary"
                    className="h-7 w-7"
                  >
                    <Icon icon="heroicons:pencil" className="h-4 w-4" />
                  </Button>
                </Link>
  
                <Button
                  onClick={() => DeleteConfirm(category._id)}
                  size="icon"
                  variant="outline"
                  color="secondary"
                  className="h-7 w-7 text-red-700"
                >
                  <Icon icon="heroicons:trash" className="h-4 w-4" />
                </Button>
              </div>}
            </div>
  
            <div className=" flex gap-5">
              
            {category.children && category.children.length > 0 && renderChildren(category.children)}
            </div>
          </div>
        );
      },
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
                  Category Delete Confirm
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
                Are you sure you want to delete this categories?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  {"Cencel"}
                </Button>
              </DialogClose>
              {/* <Link href="/admin/kyc-update" > */}
              <Button onClick={() => categoryDel()} type="button">
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