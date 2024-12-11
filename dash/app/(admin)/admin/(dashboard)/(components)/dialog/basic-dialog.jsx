"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const BasicDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Basic Modal</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-base font-medium ">
              What is Modals in UI Design?
            </DialogTitle>
          </DialogHeader>

        
          <DialogFooter className="mt-8 gap-2">

            <DialogClose asChild>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>

            <Button type="submit">Agree</Button>
          </DialogFooter>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BasicDialog;
