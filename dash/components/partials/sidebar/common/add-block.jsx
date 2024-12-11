"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

import { X } from "lucide-react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import thumbnail from "@/public/images/all-img/thumbnail.png";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const AddBlock = ({
  className,
  image = thumbnail,
  title = "Logica Portal",
  desc = "Logica Portal: Streamlining eCommerce for effortless product management.",
}) => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
      <div
        className={cn(
          "bg-primary dark:bg-default-400 text-primary-foreground pt-5 pb-4 px-2  rounded  m-3 hidden xl:block",
          className
        )}
      >
        <div className={cn("text-base font-semibold text-primary-foreground")}>
          {" "}
          {title}
        </div>
        <div className={cn(" text-sm text-primary-foreground")}><p>{desc}</p></div>
        <div className="mt-4 relative">
          <Image src={image} alt="footer-thumbnail" className="w-full h-full" />
          <Button
            size="icon"
            type="button"
            color="secondary"
            className="rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
            onClick={() => setOpenVideo(true)}
          >
            <Icon
              icon="heroicons:play-16-solid"
              className="w-5 h-5 text-white"
            />
          </Button>
        </div>
       
      </div>
      <Dialog open={openVideo}>
        <DialogContent size="lg" className="p-0" hiddenCloseIcon>
          <Button
            size="icon"
            onClick={() => setOpenVideo(false)}
            className="absolute -top-4 -right-4 bg-default-900"
          >
            <X className="w-6 h-6" />
          </Button>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/8D6b3McyhhU?si=zGOlY311c21dR70j"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen 
          ></iframe>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBlock;




