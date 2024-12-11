"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";

import waterfall from "@/public/images/all-img/water-fall.jpg";
import Image from "next/image";

const ScrollableDialog = () => {
  return (
    <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
      <Dialog>
        <DialogTrigger asChild>
          <Button type="button">Inside</Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-screen p-0">
          <div className="h-[300px] sm:h-[600px]  w-full ">
            <ScrollArea className="h-full p-5 ">
              <div className="h-[150px] sm:h-[212px] mt-5">
                <Image
                  src={waterfall}
                  className="w-full h-full object-cover rounded-sm"
                  alt=""
                />
              </div>
              <h3 className="text-lg font-semibold text-default-950 dark:text-primary-foreground mt-5">
                The most wonderful sea beach in the world
              </h3>
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-default-800  mb-3">
                    1. Saud Beach, Philippines
                  </h4>
                
                </div>
                <div>
                  <h4 className="text-base font-semibold text-default-800  mb-3">
                    2. Elafonissi Beach, Greece
                  </h4>
                  
                </div>
                <div>
                  <h4 className="text-base font-semibold text-default-800  mb-3">
                    3. Nungwi Beach, Tanzania
                  </h4>
                  
                </div>
              </div>
            </ScrollArea>
          </div>
          <DialogFooter className="px-5 py-3 pt-0 gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="underline">
              Follow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScrollableDialog;
