"use client";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DisableAlert = () => {
  return (
    <div className="space-y-4">
      <Alert dismissible>
        <AlertDescription>
          an alert with primary background color
        </AlertDescription>
      </Alert>
      <Alert color="secondary" dismissible>
        <AlertDescription>
          an alert with secondary background color
        </AlertDescription>
      </Alert>

      <Alert color="warning" dismissible>
        <AlertDescription>
          an alert with warning background color
        </AlertDescription>
      </Alert>
      <Alert color="success" dismissible>
        <AlertDescription>
          an alert with success background color
        </AlertDescription>
      </Alert>
      <Alert color="destructive" dismissible>
        <AlertDescription>
          an alert with destructive background color
        </AlertDescription>
      </Alert>
      <Alert color="info" dismissible>
        <AlertDescription>
          an alert with info background color
        </AlertDescription>
      </Alert>
      <Alert color="dark" dismissible>
        <AlertDescription>
          an alert with dark background color
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DisableAlert;
