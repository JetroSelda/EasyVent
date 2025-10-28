import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Edit, PlusCircle, Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextEditor from "../../../../../../custom-ui/TextEditor";

const SupportSettings = () => {
  const [formState, setFormState] = useState([]);
  const [enabledForm, setEnabledForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = () => {
    setFormState((prev) => ([...prev, { status: "Active" }]));
  };

  const handleUpdate = (index, updatedValue, fieldName) => {
    setFormState((prev) => {
      const copy = [...prev];

      const selectedItem = copy[index];

      copy.splice(index, 1, {
        ...selectedItem,
        [fieldName]: updatedValue,
        updated: true,
      });

      return copy;
    });
  };

  const initiateData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/getQuestions.php`)
      .then((res) => res.json())
      .then(({ data }) => {
        setFormState(data?.questions ?? []);
      });
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const added = [];
    const updated = [];

    formState.forEach((item) => {
      if (!item.id && item.status === "Active") {
        return added.push(item);
      }

      if (!!item.id && item.updated) {
        return updated.push(item);
      }
    });

    const createRequests = added.map((item) => {
      const formData = new FormData();
      formData.append("question", item.question);
      formData.append("response", item.response);

      return fetch(`${import.meta.env.VITE_API_URL}/settings/createQuestion.php`, {
        method: "POST",
        body: formData,
      });
    })

    const updateRequests = updated.map((item) => {
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("status", item.status);
      formData.append("question", item.question);
      formData.append("response", item.response);

      return fetch(`${import.meta.env.VITE_API_URL}/settings/updateQuestion.php`, {
        method: "POST",
        body: formData,
      });
    })

    await Promise.all([...createRequests, ...updateRequests]);

    
    toast("Updated Content", { description: "Updated Support (FAQs) content" });
    initiateData();
    setEnabledForm(false);
    setIsLoading(false);
  }

  useEffect(() => {
    initiateData();
  }, []);

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <div className="semi-bold">Support (FAQs)</div>

          {enabledForm && (
            <div className="flex items-center gap-3">
              <Button disabled={isLoading} variant="ghost" type="button" onClick={handleSubmit}>
                {isLoading ? <Spinner /> : <Save />} Save Changes
              </Button>
              <Button disabled={isLoading} variant="ghost" type="button" onClick={handleAdd}>
                <PlusCircle /> Add Question
              </Button>
            </div>
          )}

          {
            !enabledForm && (
              <Button variant="ghost" type="button" onClick={() => setEnabledForm(true)}><Edit /> Edit Content</Button>
            )
          }
        </div>

        <div className="py-3 grid gap-10 w-[50%]">
          
          {formState.map((item, index) => {
            if (item.status !== "Active") return null;

            return (
              <div className="grid gap-2">
                <Label>Question</Label>

                <div className="flex gap-2">
                  <Input type="text" value={item.question} onChange={(event) => handleUpdate(index, event.target.value, "question")} />

                  {enabledForm && <Button variant="ghost" type="button" onClick={() => handleUpdate(index, "Deleted", "status")}><Trash /></Button>}
                </div>

                <Label>Response</Label>
                <TextEditor defaultValue={item.response} onChange={(value) => handleUpdate(index, value, "response")} />
              </div>
            )
          })}

        </div>
      </CardContent>
    </Card>
  )
};

export default SupportSettings;