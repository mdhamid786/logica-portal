"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TicketList from "../components/list";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = ({ params }) => {
  const check = params.type;

  return (
    <div className=" space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <CardTitle>Enquiries</CardTitle>

              <div className=" w-100 flex justify-between gap-5">
                <div>
                  <Button color="primary">
                    <Link href="/admin/transaction/add" prefetch={true}>
                      Add Enquiries
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <TicketList type={params.type} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;