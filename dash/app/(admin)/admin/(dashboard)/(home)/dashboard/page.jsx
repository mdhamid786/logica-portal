"use client";

import RevinueChart from "./components/revinue-chart";
import TopBrowser from "./components/top-browser";
import Transaction from "./components/transaction";
import Orders from "./components/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EcommerceStats from "./components/ecommerce-stats";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardDropdown from "@/components/dashboard-dropdown";
import { useEffect, useState } from "react";
const EcommercePage = () => {


  const [data, setData] = useState("")
  useEffect(() => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
    if (userData) {
      setData(JSON.parse(userData));
    }
    else{
      userData("")
    }
  }, []);
    


  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-center bg-primary text-white p-4 ">
        <div className="text-2xl font-medium  text-center text-white">
        
        Welcome to the {data.name}!
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <EcommerceStats />
          </div>
        </CardContent>
      </Card>

       <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="border-none pb-0 mb-0">
              <div className="flex flex-wrap items-center gap-3">
                <CardTitle className="flex-1 whitespace-nowrap">
                Orders
                </CardTitle>
                <div className="flex-none">
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-0">
              <RevinueChart />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <TopBrowser />
        </div>
      </div>
     
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader className="flex-row justify-between items-center gap-4 border-none p-6 pb-4">
              <CardTitle className="whitespace-nowrap">
                Transaction History
              </CardTitle>
              <DashboardDropdown />
            </CardHeader>
            <CardContent className="px-0 pt-0  pb-0">
              <ScrollArea className="h-full">
                <Transaction />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Orders />
        </div>
      </div> 


      {/* <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <TopCountries />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Products />
        </div>
      </div> */}
    
    </div>
  );
};

export default EcommercePage;
