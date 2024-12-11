"use client";
import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function BasicDataTable() {
  return (
    <>
      <div className="  items-center   w-full">
        <Label
          htmlFor="name"
          className="text-default-600 mb-3 xl:text-lg text-xl"
        >
          {"Retailer:"}
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a retailer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="mathmatics">Mathmatics</SelectItem>
            <SelectItem value="physics">Physics</SelectItem>
            <SelectItem value="chemistry">Chemistry</SelectItem>
            <SelectItem value="biology">Biology</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default BasicDataTable;
