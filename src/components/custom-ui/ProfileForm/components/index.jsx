import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileInput, Trash, Upload } from "lucide-react";
import { useRef } from "react";

const DocumentsForm = ({ documents = {}, onChange, readOnly }) => {
  const dtiUpload = useRef();
  const birUpload = useRef();
  const permitUpload = useRef();
  const clrUpload = useRef();

  const { dti = {}, bir = {}, permit = {}, clr = {} } = documents;

  const openFile = (type) => {
    console.log("opeinin")
    if (documents?.[type]?.url) {
      const url = documents[type].url;

      window.open(`${import.meta.env.VITE_API_URL}/uploads/${url}`, "_blank");
    }
  }

  const handleUpload = async (type, file) => {
    const documentForm = new FormData();

    documentForm.append("files[]", file);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/services/upload_documents.php`, {
      method: 'POST',
      body: documentForm,
    });

    const json = await res.json();

    if (json.files)  {
      const uploadedFile = json.files[0];

      onChange({
        ...documents,
        [type]: {
          name: uploadedFile.name,
          url: uploadedFile.url,
        }
      })
    }
  }

  const handleDelete = (type) => {
    onChange({
      ...documents,
      [type]: {},
    })
  }

  return (
    <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-start">
      <div className="md:w-[25%]">Documents</div>

      <div className="md:w-[75%] flex flex-col items-start gap-[1rem]">
        <Card className="p-0 shadow-none">
          <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
            <div className="w-[3rem] h-full flex items-center justify-center">
              <FileInput size={28} />
            </div>

            <p className="md:w-[15rem]" onClick={() => openFile("dti")}>
              <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">DTI Certificate</h4>
              <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{dti.name || "No uploaded file"}</p>
            </p>

            {!readOnly && (
              <Button type="button" variant="ghost" className="ml-auto cursor-pointer" onClick={() => {
                if (dti.url) {
                  return handleDelete("dti");
                }

                dtiUpload.current.click();
              }}>
                {dti.url ? <Trash /> : <Upload />}
              </Button>
            )}

            <input type="file" className="hidden" ref={dtiUpload} onChange={(event) => handleUpload("dti", event.target.files[0])} />

          </CardContent>
        </Card>

        <Card className="p-0 shadow-none">
          <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
            <div className="w-[3rem] h-full flex items-center justify-center">
              <FileInput size={28} />
            </div>

            <p className="md:w-[15rem]" onClick={() => openFile("bir")}>
              <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">BIR Certificate</h4>
              <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{bir.name || "No uploaded file"}</p>
            </p>

            {!readOnly && (
              <Button type="button" variant="ghost" className="ml-auto cursor-pointer" onClick={() => {
                if (bir.url) {
                  return handleDelete("bir");
                }

                birUpload.current.click();
              }}>
                {bir.url ? <Trash /> : <Upload />}
              </Button>
            )}

            <input type="file" className="hidden" ref={birUpload} onChange={(event) => handleUpload("bir", event.target.files[0])} />
          </CardContent>
        </Card>
        
        <Card className="p-0 shadow-none">
          <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
            <div className="w-[3rem] h-full flex items-center justify-center">
              <FileInput size={28} />
            </div>

            <p className="md:w-[15rem]" onClick={() => openFile("permit")}>
              <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">Business Permit</h4>
              <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{permit.name || "No uploaded file"}</p>
            </p>

            {!readOnly && (
              <Button type="button" variant="ghost" className="ml-auto cursor-pointer" onClick={() => {
                if (permit.url) {
                  return handleDelete("permit");
                }

                permitUpload.current.click();
              }}>
                {permit.url ? <Trash /> : <Upload />}
              </Button>
            )}

            <input type="file" className="hidden" ref={permitUpload} onChange={(event) => handleUpload("permit", event.target.files[0])} />
          </CardContent>
        </Card>
        
        <Card className="p-0 shadow-none">
          <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
            <div className="w-[3rem] h-full flex items-center justify-center">
              <FileInput size={28} />
            </div>

            <p className="md:w-[15rem]" onClick={() => openFile("clr")}>
              <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">Barangay Business Clearance</h4>
              <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{clr.name || "No uploaded file"}</p>
            </p>

            {!readOnly && (
              <Button type="button" variant="ghost" className="ml-auto cursor-pointer" onClick={() => {
                if (clr.url) {
                  return handleDelete("clr");
                }

                clrUpload.current.click();
              }}>
                {clr.url ? <Trash /> : <Upload />}
              </Button>
            )}

            <input type="file" className="hidden" ref={clrUpload} onChange={(event) => handleUpload("clr", event.target.files[0])} />
          </CardContent>
        </Card>
      </div>
    </div>
    
  )
};

export default DocumentsForm;