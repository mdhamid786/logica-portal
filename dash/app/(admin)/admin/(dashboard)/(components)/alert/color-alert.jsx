"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ColorAlert = () => {
  return (
    <div className="space-y-4 ">
      <Alert>
        <AlertDescription>
           an alert with primary background color
        </AlertDescription>
      </Alert>
      <Alert color="secondary">
        <AlertDescription>
           an alert with secondary background color
        </AlertDescription>
      </Alert>

      <Alert color="warning">
        <AlertDescription>
           an alert with warning background color
        </AlertDescription>
      </Alert>
      <Alert color="success">
        <AlertDescription>
           an alert with success background color
        </AlertDescription>
      </Alert>
      <Alert color="destructive">
        <AlertDescription>
           an alert with destructive background color
        </AlertDescription>
      </Alert>
      <Alert color="info">
        <AlertDescription>
           an alert with info background color
        </AlertDescription>
      </Alert>
      <Alert color="dark">
        <AlertDescription>
           an alert with dark background color
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ColorAlert;
