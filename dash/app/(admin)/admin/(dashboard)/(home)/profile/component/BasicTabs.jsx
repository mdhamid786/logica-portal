"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BasicTabs = ({data}) => {
  return (
    <Tabs defaultValue="account" className="md:w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Personal Details</TabsTrigger>
        <TabsTrigger value="company">Company Details</TabsTrigger>
        <TabsTrigger value="manager">Manager</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
           
          </CardHeader>
          <CardContent className="space-y-2">
           <div className="flex justify-around mb-20">
           <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Last Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.lastName}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email Id</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.email}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.phoneNumber ? data?.phoneNumber:"91 xxxxxxxx"}
          </div>
            </div>
           
           
           </div>
          
        



           <div className="flex justify-around mt-5">
           <div className="space-y-1">
              <Label htmlFor="name">Pan Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.pan_number?data?.pan_number:"Exam77hNNSN"}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Adhar Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.aadhar_number}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">emailVerified</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.disabled}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Role</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
           
           </div>
          </CardContent>
        
        </Card>
      </TabsContent>
      <TabsContent value="company">
        <Card>
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            
          </CardHeader>
          <CardContent className="space-y-2">
           <div className="flex justify-around mb-20">
           <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Last Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.lastName}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email Id</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.email}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.phoneNumber ? data?.phoneNumber:"91 xxxxxxxx"}
          </div>
            </div>
           
           
           </div>
          
        



           <div className="flex justify-around mt-5">
           <div className="space-y-1">
              <Label htmlFor="name">Pan Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.pan_number?data?.pan_number:"Exam77hNNSN"}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Adhar Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.aadhar_number}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">emailVerified</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.disabled}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Role</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
           
           </div>
          </CardContent>
        
        </Card>
      </TabsContent>

      <TabsContent value="manager">
        <Card>
          <CardHeader>
            <CardTitle>manager Details</CardTitle>
           
          </CardHeader>
          <CardContent className="space-y-2">
           <div className="flex justify-around mb-20">
           <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Last Name</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.lastName}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email Id</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.email}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Phone Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.phoneNumber ? data?.phoneNumber:"91 xxxxxxxx"}
          </div>
            </div>
           
           
           </div>
          
        



           <div className="flex justify-around mt-5">
           <div className="space-y-1">
              <Label htmlFor="name">Pan Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.pan_number?data?.pan_number:"Exam77hNNSN"}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Adhar Number</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.aadhar_number}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">emailVerified</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.disabled}
          </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Role</Label>
              <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>
            </div>
           
           </div>
          </CardContent>
         
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default BasicTabs;