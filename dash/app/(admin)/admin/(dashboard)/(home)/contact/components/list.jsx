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


import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteApiData, getApiData, postApiData } from "@/helper/common";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";


export function BasicDataTable() {


  const [isOpen1, setIsOpen1] = React.useState(false);
  const [view, setView] = useState("")

 
  const handleClose1 = () => {
    setIsOpen1(false);
  }; 

  const ViewConfirm = async (id) => {
   
    setIsOpen1(true);

    try {
      const apiResData = await getApiData(`productenq/${id}`);
console.log(apiResData,"bbbbbbbbbbbbbbbbbbbbbbbbbbbb");

      if (apiResData) {
        setView(apiResData?.ProductEnq)
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching user data");
    }
  };

  const [id, setId] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchProductenqList = async () => {
    try {
      const apiResData = await getApiData(`productenq/list`);
      if (apiResData.success === true) {
        setData(apiResData?.productEnqs);
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
    fetchProductenqList();
  }, []);

  const productEnqDelete = async () => {
    toast.dismiss();
    try {
      const response = await deleteApiData(`productenq/${id}`);
      if (response.success == true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        await fetchProductenqList(); 
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Error deleting product enquiry");
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
      header: "S No",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.index + 1}</div>
      ),
    },

    // {
    //   accessorKey: " Date",
    //   header: " Date",
    //   cell: ({ row }) => {
    //     const createdAt = new Date(row.original.createdAt);
    //     return (
    //       <div className="whitespace-nowrap">
    //         {createdAt.toLocaleDateString()}
    //       </div>
    //     );
    //   },
    // },

    // {
    //   accessorKey: " Time",
    //   header: " Time",
    //   cell: ({ row }) => {
    //     const createdAt = new Date(row.original.createdAt);
    //     return (
    //       <div className="whitespace-nowrap">
    //         {createdAt.toLocaleTimeString()}
    //       </div>
    //     );
    //   },
    // },
    

    // {
    //   accessorKey: "Query_Related_To",
    //   header: "User Name",
    //   cell: ({ row }) => (
    //     <div className="whitespace-nowrap">{row?.original?.subject}</div>
    //   ),
    // },

    {
      accessorKey: "Contact",
      header: "Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.name}</div>
      ),
    },
    {
      accessorKey: "Contact",
      header: "title",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.title}</div>
      ),
    },

    {
      accessorKey: "Email",
      header: "Email",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.email}</div>
      ),
    },


    {
      accessorKey: "contact",
      header: "Mobile No",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.contact}</div>
      ),
    },
    {
      accessorKey: "BusinessName",
      header: "Business Name",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.bname}</div>
      ),
    },

    

    {
      accessorKey: "Units",
      header: "Units",
      cell: ({ row }) => (
        <div className="whitespace-nowrap">{row?.original?.unit}</div>
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
        onClick={() => ViewConfirm(row.original.id)}
          size="icon"
          variant="outline"
          className=" h-7 w-7 text-green-700"
          color="secondary"
        >
          <Icon icon="heroicons:eye" className=" h-4 w-4  " />
        </Button>
        <Button
         onClick={() => DeleteConfirm(row.original.id)}
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
          {table.getFilteredRowModel().rows.length} {("rows selected")}
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
              variant={`${pageIdx === table.getState().pagination.pageIndex
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
                  Product Enquiry Delete Confirm
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
             Are you sure you want to delete this enquiries?
              </p>
            </div>
            <DialogFooter className="mt-8 gap-2">
              <DialogClose asChild>
                <Button onClick={handleClose} type="button" variant="outline">
                  {("Cencel")}
                </Button>
              </DialogClose>
              {/* <Link href="/admin/kyc-update" > */}
              <Button onClick={() => productEnqDelete()} type="button">
              Delete Confirm
              </Button>
              {/* </Link> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
{/* view model */}

<div className="flex flex-wrap  gap-x-5 gap-y-4 ">
    <Dialog open={isOpen1} onOpenChange={handleClose1}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 ">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-default-500  space-y-4">
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.name}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Contact</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.contact}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>



              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Email-Address</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.email}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Business Name</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.bname}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">BGST</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.bgst}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Address</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.address}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Unit</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.unit}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Message</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.title}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Created Date</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.createdAt ? new Date(view.createdAt).toLocaleDateString() : ''}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Created Time</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.createdAt ? new Date(view.createdAt).toLocaleTimeString() : ''}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


            </div>
          </form>
        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cencel
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