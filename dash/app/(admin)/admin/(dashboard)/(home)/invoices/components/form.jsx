"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Fragment, useState } from "react";
import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Upload } from "lucide-react";
import { postApiData, postApiFormData } from "@/helper/common";

const TransactionAdd = () => {
  const [files, setFiles] = useState([]);


  // Configure dropzone to accept only PDFs
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 2000000, // Limit to 2 MB
    accept: {
      "application/pdf": [".pdf"], // Allow only PDF files
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
    },
    onDropRejected: () => {
      toast({
        color: "destructive",
        title: "Error",
        description: "You can only upload up to 5 PDF files & max size of 2 MB",
      });
    },
  });

  // Render file preview (for PDF, just showing the file icon)
  const renderFilePreview = (file) => {
    return <Icon icon="tabler:file-description" />;
  };

  const handleRemoveFile = (file) => {
    const filtered = files.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const fileList = files.map((file) => (
    <div
      key={file.name}
      className="flex justify-between border px-3.5 py-3 my-6 rounded-md"
    >
      <div className="flex space-x-3 items-center">
        <div className="file-preview">{renderFilePreview(file)}</div>
        <div>
          <div className="text-sm text-card-foreground">{file.name}</div>
          <div className="text-xs font-light text-muted-foreground">
            {(Math.round(file.size / 100) / 10).toFixed(1)} kb
          </div>
        </div>
      </div>
      <Button
        size="icon"
        color="destructive"
        variant="outline"
        className="border-none rounded-full"
        onClick={() => handleRemoveFile(file)}
      >
        <Icon icon="tabler:x" className="h-5 w-5" />
      </Button>
    </div>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Ensure "files" is the key your backend expects
    });
  
    // Log formData for debugging
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }
  
    try {
      const response = await postApiFormData("invoice/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });
  
      if (response.success === true) {
        toast.success(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        setFiles([]); // Clear the files after successful upload
      } else {
        toast.error(response.message, {
          position: "bottom-center",
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        style: { borderRadius: "10px", background: "#333", color: "#fff" },
      });
    }
  };
  
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          <div className="flex flex-col gap-3 mb-5">
            <Label>
              Select Invoice Files <span style={{ color: "tomato" }}>*</span>
            </Label>
            <Fragment>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <div className="w-full text-center border-dashed border rounded-md py-[12px] flex items-center flex-col">
                  <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
                    <Upload className="h-6 w-6 text-default-500" />
                  </div>
                  <h4 className="text-2xl font-medium mb-1 text-card-foreground/80">
                    Drop PDF files here or click to upload.
                  </h4>
                  <div className="text-xs text-muted-foreground">
                    (You can upload up to 5 PDF files.)
                  </div>
                </div>
              </div>
              {files.length ? (
                <Fragment>
                  <div>{fileList}</div>
                  <div className="flex justify-end space-x-2">
                    <Button color="destructive" onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                    <Button type="submit">Upload Files</Button>
                  </div>
                </Fragment>
              ) : null}
            </Fragment>
          </div>
        </div>
      </form>
    </>
  );
};

export default TransactionAdd;
