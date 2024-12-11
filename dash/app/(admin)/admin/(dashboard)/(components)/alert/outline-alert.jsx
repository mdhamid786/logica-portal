"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const OutlineAlert = () => {
  return (
    <div className="space-y-4">
      <Alert variant="outline">
        <AlertDescription>
          an alert with primary background color
        </AlertDescription>
      </Alert>
      <Alert color="secondary" variant="outline">
        <AlertDescription>
          an alert with secondary background color
        </AlertDescription>
      </Alert>

      <Alert color="warning" variant="outline">
        <AlertDescription>
          an alert with warning background color
        </AlertDescription>
      </Alert>
      <Alert color="success" variant="outline">
        <AlertDescription>
          an alert with success background color
        </AlertDescription>
      </Alert>
      <Alert color="destructive" variant="outline">
        <AlertDescription>
          an alert with destructive background color
        </AlertDescription>
      </Alert>
      <Alert color="info" variant="outline">
        <AlertDescription>
          an alert with info background color
        </AlertDescription>
      </Alert>
      <Alert color="dark" variant="outline">
        <AlertDescription>
          an alert with dark background color
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default OutlineAlert;
