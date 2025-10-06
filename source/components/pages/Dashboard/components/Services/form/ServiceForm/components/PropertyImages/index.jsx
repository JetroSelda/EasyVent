import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, Upload, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useRef, useState } from "react";

const PropertyImages = ({ defaultValues = [], updateFormState, title = "Property" }) => {
  const inputRef = useRef();

  const [files, setFiles] = useState(defaultValues);

  useEffect(() => {
    setFiles(defaultValues);
  }, [defaultValues]);

  const handleBrowse = () => {
    inputRef.current.click();
  }

  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    setFiles((prev) => {
      const updated = ([...prev, ...files]);

      updateFormState("images_url", updated);

      return updated;
    });
  }

  const handleRemove = (index) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);

      updateFormState("images_url", copy);

      return copy;
    })
  }

  const handleUpload = (event) => {
    event.preventDefault();

    setFiles((prev) => {
      const updated = ([...prev, ...event.target.files]);

      updateFormState("images_url", updated);

      return updated;
    });
  }

  const formattedUrls = useMemo(() => {
    if (files.length === 0) return [];

    const formatted = files.map((item) => {
      if (typeof item === "string") {

        return `${import.meta.env.VITE_API_URL}/uploads/${item}`;
      }

      if (typeof item === "object") {
        return URL.createObjectURL(item);
      }
    });

    const filtered = formatted.filter(Boolean);

    return filtered;
  }, [files]);

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem]">{title} Images</p>
        
        <Input onChange={handleUpload} ref={inputRef} multiple accept=".png, .jpg, .jpeg" type="file" className="hidden" id="property_images" />
        
        {files.length === 0 && (
          <div
          className="border-dashed border-1 h-[12rem] rounded-md flex justify-center items-center flex-col"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="w-[3rem] h-[3rem] border-1 rounded-full flex items-center justify-center text-gray-500 mb-3">
              <Image size={16} />
            </div>

            <p>Drop your images here</p>
            <p className="text-gray-500 text-[0.9rem] mb-3">PNG or JPG</p>

            <Label htmlFor="property_images">
              <Button variant="outline" type="button" onClick={handleBrowse}><Upload /> Browse Files</Button>
            </Label>
          </div>
        )}

        {formattedUrls.length !== 0 && (
          <div
            className="border-dashed gap-5 border-1 m-h-[12rem] rounded-md flex justify-between flex-col p-5 py-3"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex justify-between">
              <p>Uploaded Files ({formattedUrls.length})</p>

              <Label htmlFor="property_images">
                <Button variant="outline" type="button" onClick={handleBrowse}><Upload /> Add More</Button>
              </Label>
            </div>

            <div className="grid grid-cols-3 items-start">
              {formattedUrls.map((file, index) => (
                <div className="w-[12rem] mr-4 mb-3 shadow-sm border-1 rounded-md relative">
                  <div onClick={() => handleRemove(index)} className="bg-black flex items-center justify-center text-white absolute top-[-0.4rem] right-[-0.4rem] w-[1.2rem] h-[1.2rem] rounded-full"><X size={15} /></div>
                  <div className="rounded-md overflow-hidden">
                    <img src={file} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
};

export default PropertyImages;