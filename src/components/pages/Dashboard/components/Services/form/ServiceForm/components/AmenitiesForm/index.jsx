import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { CirclePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";

const AmenitiesForm = ({ defaultValues = [], updateFormState  }) => {
  const [amenities, setAmenities] = useState(defaultValues);

  useEffect(() => {
    setAmenities(defaultValues);
  }, [defaultValues]);

  const addAmenity = () => {
    setAmenities((prev) => {
      const copy = [...prev];

      updateFormState("amenities", [...copy, ""]);

      return [...copy, ""];
    });
  }

  const removeAmenity = (index) => {
    setAmenities((prev) => {
      const copy = [...prev];

      copy.splice(index, 1);

      updateFormState("amenities", [...copy]);

      return [...copy];
    });
  }

  const updateAmenity = (selectedIndex, updatedValue) => {
    setAmenities((prev) => {
      const updatedAmenities = prev.map((item, index) => {
        if (selectedIndex !== index) return item;

        return updatedValue;
      });

      updateFormState("amenities", updatedAmenities);

      return updatedAmenities;
    });
  };

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5  text-[1.15rem] flex justify-between">
          <span>
            Amenities
          </span>

          <Button variant="ghost" onClick={addAmenity}><CirclePlus /></Button>
        </p>

        {amenities.map((item, index) => (
          <div className="grid gap-3 mb-3">
            <Label htmlFor={`amenity-${index}`}>Amenity #{index + 1}</Label>
            <div className="flex items-center gap-1">
              <Input
                id={`amenity-${index}`}
                type="text"
                required
                value={item}
                onChange={(event) => updateAmenity(index, event.target.value)}
              />

              <Button variant="icon" onClick={() => removeAmenity(index)}><Trash /></Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default AmenitiesForm;