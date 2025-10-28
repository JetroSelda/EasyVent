
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileInput, Trash, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";

const DocumentsForm = ({ onSubmit }) => {
  const formRef = useRef();
  const cancelRef = useRef();
  const fileInputRef = useRef();

  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);

    if (onSubmit) onSubmit(documents);
  };

  const openUpload = () => {
    fileInputRef.current.click();
  };

  const saveUpload = (event) => {
    event.preventDefault();

    setDocuments((prev) => {
      const updated = ([...prev, ...event.target.files]);

      return updated;
    });
  }

  const deleteFile = (index, event) => {
    event.stopPropagation();

    setDocuments((prev) => {
      const updated = [...prev];

      updated.splice(index, 1);

      return updated;
    });
  }

  const openFile = (file) => {
    window.open(URL.createObjectURL(file), "_blank");
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Require Documents</DialogTitle>
        <DialogDescription>
          Please upload documents related to your service, this is required for verifying your credibility.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-5">

        <div className="flex mb-1">
          <Button variant="outline" type="button" onClick={openUpload}><Upload />Upload Files</Button>
          <Input type="file" onChange={saveUpload} className="hidden" ref={fileInputRef} multiple accept=".png, .jpg, .jpeg, .pdf, .doc, .docx" />
        </div>

        {documents.map((doc, index) => (
          <Card className="p-0 shadow-none" onClick={openFile.bind(null, doc)}>
            <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
              <div className="w-[3rem] h-full flex items-center justify-center">
                <FileInput size={28} />
              </div>

              <p className="w-[15rem]">
                <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">{doc.name}</h4>
                <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{doc.type} file</p>
              </p>

              <Button variant="ghost" className="ml-auto cursor-pointer" onClick={deleteFile.bind(null, index)}>
                <Trash />
              </Button>
            </CardContent>
          </Card>
        ))}

      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" ref={cancelRef}>Cancel</Button>
        </DialogClose>
        <Button
          disabled={isLoading} type="submit" onClick={() => formRef.current.requestSubmit()}>{isLoading && <Spinner />} Send Request</Button>
      </DialogFooter>
  </form>
  )
};

export default DocumentsForm;