import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const PropertyForm = ({ defaultValues = {}, updateFormState }) => {
  const [propertyState, setPropertyState] = useState(defaultValues);

  useEffect(() => {
    setPropertyState(defaultValues);
  }, [defaultValues])

  const { property_name, property_description } = propertyState;

  const updateProperty = (updatedValue, fieldName) => {
    setPropertyState((prev) => {
      const updated = ({ ...prev, [fieldName]: updatedValue });
      updateFormState("property_details", updated)

      return updated;
    });
  } 

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem]">Property Details</p>

        <div className="grid gap-3 mb-4">
          <Label htmlFor="service_name">Property Name</Label>
          <Input
            id="service_name"
            type="text"
            required
            value={property_name}
            onChange={(event) => updateProperty(event.target.value, "property_name")}
          />
        </div>

        <div className="grid gap-3 mb-5">
          <Label htmlFor="service_name">Property Description</Label>
          <Textarea onChange={(event) => updateProperty(event.target.value, "property_description")} value={property_description} />
        </div>
      </CardContent>
    </Card>
  )
};

export default PropertyForm;
