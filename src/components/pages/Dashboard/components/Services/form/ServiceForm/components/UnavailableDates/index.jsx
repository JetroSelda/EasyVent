import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash } from "lucide-react";

const UnavailableDates = ({ defaultValues = [], updateFormState  }) => {

  const addUnavailableDate = () => {
    const copy = [...defaultValues];

    updateFormState("availability", [...copy, ""]);
  }

  const removeDate = (index) => {
    const copy = [...defaultValues];

    copy.splice(index, 1);

    updateFormState("availability", [...copy]);

  }

  const updateDate = (selectedIndex, updatedValue) => {
    const updatedAmenities = defaultValues.map((item, index) => {
      if (selectedIndex !== index) return item;

      return updatedValue;
    });

    updateFormState("availability", updatedAmenities);
  };

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5  text-[1.15rem] flex justify-between">
          <span>
            Unavailable Dates
          </span>

          <Button variant="ghost" onClick={addUnavailableDate}><CirclePlus /></Button>
        </p>

        {defaultValues.map((item, index) => (
          <div className="grid gap-3 mb-3">
            <Label htmlFor={`Unavailable-${index}`}>Unavailable Date #{index + 1}</Label>
            <div className="flex items-center gap-1">
              <Input
                id={`Unavailable-${index}`}
                type="date"
                required
                value={item}
                 className="w-[9rem]"
                onChange={(event) => updateDate(index, event.target.value)}
              />

              <Button variant="icon" onClick={() => removeDate(index)}><Trash /></Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default UnavailableDates;