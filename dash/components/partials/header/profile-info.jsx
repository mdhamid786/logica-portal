"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const ProfileInfo = () => {
  // const { data: session } = useSession();

  const logout = () => {
    localStorage.removeItem("token");
  
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
  
    window.location.href = "/";
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          {/* {session?.user?.image && ( */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
              alt="ghfgh"
              width={36}
              height={36}
              className="rounded-full"
            />
          {/* )} */}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          {/* {session?.user?.image && ( */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s"
              alt="kjkjkj"
              width={36}
              height={36}
              className="rounded-full"
            />
          {/* )} */}
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {/* {session?.user?.name ?? "Mcc Callem"} */}
            </div>
            <Link
              href="/dashboard"
              className="text-xs text-default-600 hover:text-primary"
            >
              @ Logica Portals
            </Link>
          </div>
        </DropdownMenuLabel>
       
       
        <DropdownMenuGroup>
          <Link href="/admin/profile" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            
              <Icon icon="heroicons:user-plus" className="w-4 h-4" />
              User Profile
            </DropdownMenuItem>
          </Link>
          
          {/* <Link href="/admin/password">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            <Icon icon="heroicons:user-group" className="w-4 h-4" />
              Change Password
            </DropdownMenuItem>
          </Link> */}

          <Link href="/admin/service-center">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
            <Icon icon="heroicons:user-group" className="w-4 h-4" />
            Service Center
            </DropdownMenuItem>
          </Link>

       
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
