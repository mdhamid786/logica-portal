"use client"
import React, { useEffect, useState } from 'react'
import BasicTab from './component/BasicTabs'

const Page = () => {
const [data, setData] = useState("")
useEffect(() => {
  const userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
  if (userData) {
    setData(JSON.parse(userData));
  }
}, []);
  
console.log(data);

  
  return (
    <>
    <main>


  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-12 lg:col-span-4 space-y-6">
      <div className="rounded-md bg-card text-card-foreground shadow-sm">
        <div className="p-6 flex flex-col items-center">
          <div className="w-[124px] h-[124px] relative rounded-full">
            <img
              alt="avatar"
              loading="lazy"
              width={300}
              height={300}
              decoding="async"
              data-nimg={1}
              className="w-full h-full object-cover rounded-full"
              srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=384&q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=640&q=75 2x"
              src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar-3.d19d606f.jpg&w=640&q=75"
              style={{ color: "transparent" }}
            />
           
            <div className="flex-1 w-full">
              <input
                className="w-full bg-background dark:border-700 px-3 file:border-0 file:bg-transparent file:text-sm file:font-medium read-only:bg-background disabled:cursor-not-allowed disabled:opacity-50 transition duration-300 border-default-300 text-default-500 focus:outline-none focus:border-primary disabled:bg-default-200 placeholder:text-accent-foreground/50 border rounded-lg h-9 text-xs read-only:leading-9 hidden"
                id="avatar"
                type="file"
              />
            </div>
          </div>
          <div className="mt-4 text-xl font-semibold text-default-900">
          {data?.firstName}
          </div>
          <div className="mt-1.5 text-sm font-medium text-default-500">
           {data?.role}
          </div>

          
        </div>
      </div>
  
   
    </div>
    <div className="col-span-12 lg:col-span-8">
     
          <BasicTab data={data}/>
     
    </div>
  </div>
</main>

    </>
  )
}

export default Page