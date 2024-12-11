"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import img1 from "@/public/images/avatar/avatar-7.jpg";
import img2 from "@/public/images/avatar/avatar-2.jpg";
import img3 from "@/public/images/avatar/avatar-3.jpg";
import img4 from "@/public/images/avatar/avatar-4.jpg";
import img5 from "@/public/images/avatar/avatar-5.jpg";
import img6 from "@/public/images/avatar/avatar-6.jpg";

import { useEffect, useState } from 'react';
import { getApiData } from '@/helper/common';


const Transaction = () => {
  const [data, setData] = useState([]);

  const fetchOrderList = async () => {
    try {
      const apiResData = await getApiData(`orders`);

      if (apiResData.success === true) {
        setData(apiResData?.orders);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, []);

  return (
    <>
      {
        data.map((item, index) => (
          <li
            key={`transaction-${index}`}
            className='flex justify-between items-center gap-2 py-3 px-6 hover:bg-default-50'
          >
            <div className='flex items-center gap-3'>
              <Avatar className="h-12 w-12">
                <AvatarImage src={img3} alt="" />
                <AvatarFallback>{item.name}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-1'>
                <span className='text-sm font-medium text-default-700'> {item.order_no}</span>
                <span className='text-xs font-medium text-default-600'> ₹ {item.amount}</span>
              </div>
            </div>
            <span className='text-sm font-medium text-primary-500'> {item.payment_status}</span>
          </li>
        ))
      }
    </>

  );
};

export default Transaction;