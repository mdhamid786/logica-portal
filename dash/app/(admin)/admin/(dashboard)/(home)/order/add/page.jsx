"use client"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import  Form  from "../components/newForm";

 
const Home = () => {


  return (

    <Card>
      <CardHeader>
        <CardTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
          {("Add New Order")}

          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-4 space-y-4 gap-2 lg:space-y-0 lg:grid lg:grid-cols-1 gap-6 mx-auto ">
          <div className="col-span-2 mb-5">
            <Form />
          </div>
        </div>
      </CardContent>
    </Card >

  );
};

export default Home;