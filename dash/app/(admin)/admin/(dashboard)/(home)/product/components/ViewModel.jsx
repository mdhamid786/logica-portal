"use client";
import { Button } from "@/components/ui/button";


import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
const ViewModel = () => {

  const [isOpen1, setIsOpen1] = React.useState(false);
  const [view, setView] = useState("")

 
  const handleClose1 = () => {
    setIsOpen1(false);
  }; 

  const ViewConfirm = async (id) => {
   
    setIsOpen1(true);

    try {
      const apiResData = await getApiData(`users/${id}`);
console.log(apiResData,"bbbbbbbbbbbbbbbbbbbbbbbbbbbb");

      if (apiResData) {
        setView(apiResData?.user)
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching:", error);
      toast.error("Error fetching user data");
    }
  };

  return (
    <div className="flex flex-wrap  gap-x-5 gap-y-4 ">
    <Dialog open={isOpen1} onOpenChange={handleClose1}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent size="2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-medium text-default-700 ">
            User Details
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm text-default-500  space-y-4">
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
             

              
             
            
            


              

             

              

              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">User Role</Label>
                <Input
                  type="text"
                  id="lastName"
                  size="lg"
                  value={view?.role}
                  disabled="true"
                  placeholder="Enter Last Name"
                />
              </div>


            </div>
          </form>
        </div>
        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button type="submit" variant="outline">
              Cencel
            </Button>
          </DialogClose>
        
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
  );
}; 

export default ViewModel;