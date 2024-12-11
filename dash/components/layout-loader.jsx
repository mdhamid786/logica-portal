"use client";
import React from "react";
import { SiteLogo } from "@/components/svg";
import { Loader2 } from "lucide-react"; 
import image1 from '../public/images/new/logica.png'
import Image from "next/image";

const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
     <Image className="  md:mx-2" src={image1} height={80} width={80}></Image>
      <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </span>
    </div>
  );
};

export default LayoutLoader;