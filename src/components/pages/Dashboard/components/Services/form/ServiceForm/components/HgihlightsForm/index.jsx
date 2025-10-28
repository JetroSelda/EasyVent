import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const HighlightsForm = ({ defaultValues = [], updateFormState }) => {
  const [highlightList, setHighlistList] = useState(defaultValues);
  
  useEffect(() => {
    setHighlistList(defaultValues);
  }, [defaultValues])

  const addHighlight = () => {
    setHighlistList((prev) => {
      const copy = [...prev];

      updateFormState("highlights", [...copy, { title: "", description: "" }]);

      return [...copy, { title: "", description: "" }];
    });
  }

  const removeHighlight = (index) => {
    setHighlistList((prev) => {
      const copy = [...prev];

      copy.splice(index, 1);

      updateFormState("highlights", [...copy]);

      return [...copy];
    });
  }

  const updateHighlight = (selectedIndex, updatedValue, fieldName) => {
    setHighlistList((prev) => {
      const updatedHighlight = prev.map((item, index) => {
        if (selectedIndex !== index) return item;

        return { ...item, [fieldName]: updatedValue };
      });

      updateFormState("highlights", updatedHighlight);

      return updatedHighlight;
    });
  };

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem] flex items-center justify-between">
          <span>Key Highlights</span>

          <Button type="button" variant="ghost" onClick={addHighlight}><CirclePlus /></Button>
        </p>

        {highlightList.map((item, index) => (
          <div className="grid gap-3">
            <div className="grid gap-3 w-[50%]">
              <Label htmlFor="service_name">Highlight #{index + 1}</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="service_name"
                  type="text"
                  placeholder="Highlight Title"
                  required
                  value={item.title}
                  onChange={(event) => updateHighlight(index, event.target.value, "title")}
                />

                <Button variant="icon" onClick={() => removeHighlight(index)}><Trash /></Button>
              </div>
            </div>

            <div className="grid gap-3 mb-5">
              <Textarea placeholder="Highlight Description" onChange={(event) => updateHighlight(index, event.target.value, "description")} value={item.description} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default HighlightsForm;