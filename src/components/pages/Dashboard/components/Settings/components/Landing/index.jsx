import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import Textarea from "@/components/ui/textarea";
import { Edit, Save } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const LandingSettings = ({ settings = {}, refresh }) => {
  const [formState, setFormState] = useState({});
  const [enabledForm, setEnabledForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const uploadRef = useRef();

  const currState = {
    ...settings,
    ...formState,
  };

  const handleChange = (event, fieldName) => {
    const { value } = event.target;

    setFormState((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];

    setFormState((prev) => ({ ...prev, file }));
  }

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { file, landing_bg, landing_title, landing_description } = currState;

    let newUrl = "";

    if (file) {
      const uploadForm = new FormData();

      uploadForm.append("images[]", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/services/upload_images.php`, {
        method: 'POST',
        body: uploadForm,
      });

      const json = await res.json();

      if (json.files)  {
        newUrl = json.files[0];
      }
    }

    const formData = new FormData();

    formData.append("landing_bg", newUrl || landing_bg);
    formData.append("landing_title", landing_title);
    formData.append("landing_description", landing_description);
    formData.append("id", 1);

    fetch(`${import.meta.env.VITE_API_URL}/settings/updateLanding.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast("Updated Content", { description: data.message });
        refresh();
        setEnabledForm(false);
        setIsLoading(false);
        setFormState((prev) => ({
          ...prev,
          file: undefined,
          landing_bg: newUrl || landing_bg,
        }));
      })
  }

  const fileImg = currState.file ? URL.createObjectURL(currState.file) : null;
  const imgUrl = fileImg ? fileImg : `${import.meta.env.VITE_API_URL}/uploads/${currState.landing_bg}`;

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <div className="semi-bold">Landing Page</div>

          {enabledForm && (
            <Button disabled={isLoading} variant="ghost" type="button" onClick={handleSubmit}>
              {isLoading ? <Spinner /> : <Save />} Save Changes
            </Button>
          )}

          {
            !enabledForm && (
              <Button variant="ghost" type="button" onClick={() => setEnabledForm(true)}><Edit /> Edit Content</Button>
            )
          }
        </div>

        <div className="flex gap-10">
          <div className="w-[50%]">
            <div className="py-3 grid gap-2">
              <Label>Title</Label>
              <Input value={currState.landing_title} disabled={isLoading || !enabledForm} onChange={(event) => handleChange(event, "landing_title")} />
            </div>
            <div className="py-3 grid gap-2">
              <Label>Description</Label>
              <Textarea value={currState.landing_description} disabled={isLoading || !enabledForm} onChange={(event) => handleChange(event, "landing_description")} />
            </div>
          </div>
          <div className="w-[50%]">
            <div className="w-full h-[30rem] border-1 overflow-hidden">
              <Input onChange={handleUpload} type="file" accept=".png, .jpg, .jpeg"  ref={uploadRef} className="hidden" />

              <img src={imgUrl} onClick={() => {
                console.log("Clicking Shit", isLoading, enabledForm);
                if (isLoading || !enabledForm) return;
                console.log("Clicking Shit[0]", isLoading, enabledForm);
                uploadRef.current.click();
              }} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default LandingSettings;