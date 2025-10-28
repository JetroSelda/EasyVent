import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Edit, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import TextEditor from "../../../../../../custom-ui/TextEditor";

const TermsSettings = ({ settings = {}, refresh }) => {
  const [formState, setFormState] = useState({});
  const [enabledForm, setEnabledForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const currState = {
    ...settings,
    ...formState,
  };

  const handleChange = (value) => {
    setFormState((prev) => ({ ...prev, terms: value }));
  };

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const { terms } = currState;

    const formData = new FormData();

    formData.append("terms", terms);
    formData.append("id", 1);

    fetch(`${import.meta.env.VITE_API_URL}/settings/updateTerms.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast("Updated Content", { description: data.message });
        refresh();
        setEnabledForm(false);
        setIsLoading(false);
      });
  }

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center mb-5">
          <div className="semi-bold">Terms & Condition Page</div>

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

        <div className="py-3 grid gap-2">
          <TextEditor disabled={isLoading || !enabledForm} defaultValue={currState.terms} onChange={handleChange} />
        </div>
      </CardContent>
    </Card>
  )
};

export default TermsSettings;