import { useEffect, useState } from "react";
import PropertyImages from "../PropertyImages";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import { CirclePlus, Trash } from "lucide-react";
import IndependentLocations from "../IndependentLocations";
import IndependentPackages from "../IndependentPackages";


const IndependentProfileForm = ({ defaultValues = {}, updateFormState }) => {
  const [profileState, setProfileState] = useState({});

  useEffect(() => setProfileState(defaultValues), [defaultValues]);

  const { property_name, property_description, skills = [], experiences = [] } = profileState;

  const updateBio = (updatedBio) => {
    setProfileState((prev) => {
      const updated = ({ ...prev, property_description: updatedBio });

      updateFormState("property_details", updated);

      return updated;
    });
  }

  const addListItem = (fieldName) => {
    setProfileState((prev) => {
      const updated = ({ ...prev, [fieldName]: [ ...(prev[fieldName] || []), ""] });

      updateFormState("property_details", updated);

      return updated;
    });
  };

  const removeListItem = (index, fieldName) => {
    setProfileState((prev) => {
      const copy = [...(prev[fieldName] || [])];

      copy.splice(index, 1);

      const updated = { ...prev, [fieldName]: copy };

      updateFormState("property_details", updated);

      return updated;
    });
  };

  const updateListItem = (updatedValue, index, fieldName) => {
    setProfileState((prev) => {
      const copy = [...(prev[fieldName] || [])];

      copy.splice(index, 1, updatedValue);

      const updated = { ...prev, [fieldName]: copy };

      updateFormState("property_details", updated);

      return updated;
    });
  };

  const updateServiceName = (updatedName) => {
    setProfileState((prev) => {
      const updated = ({ ...prev, property_name: updatedName });

      updateFormState("property_details", updated);

      return updated;
    });
  }

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem]">Profile Details</p>

        <div className="grid gap-3 mb-5">
          <Label htmlFor="service_name">Service Name</Label>
          <Input onChange={(event) => updateServiceName(event.target.value)} value={property_name} />
        </div>

        <div className="grid gap-3 mb-5">
          <Label htmlFor="service_name">About</Label>
          <Textarea onChange={(event) => updateBio(event.target.value)} value={property_description} />
        </div>

        <div className="grid gap-3 mb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="skills">Skills</Label>
            <Button variant="ghost" onClick={() => addListItem("skills")} type="button">
              <CirclePlus />
            </Button>
          </div>

          {skills.map((skill, index) => (
            <div className="flex items-center gap-1" key={index}>
              <Input
                id={`skills`}
                type="text"
                required
                value={skill}
                onChange={(event) => updateListItem(event.target.value, index, "skills")}
              />

              <Button variant="icon" onClick={() => removeListItem(index, "skills")}><Trash /></Button>
            </div>
          ))}
        </div>

        <div className="grid gap-3 mb-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="experiences">Experiences</Label>
            <Button variant="ghost" onClick={() => addListItem("experiences")} type="button">
              <CirclePlus />
            </Button>
          </div>

          {experiences.map((skill, index) => (
            <div className="flex items-center gap-1" key={index}>
              <Input
                id={`experiences`}
                type="text"
                required
                value={skill}
                onChange={(event) => updateListItem(event.target.value, index, "experiences")}
              />

              <Button variant="icon" onClick={() => removeListItem(index, "experiences")}><Trash /></Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const IndependentForm = ({ formState = {}, updateFormState }) => {
  const { images_url = [], property_details = {}, independent_locations = [], packages_list = [] } = formState;

  return (
    <div className="flex gap-5 py-3">
      <div className="w-[60%] flex flex-col gap-5">
        <IndependentProfileForm defaultValues={property_details} updateFormState={updateFormState} />

        <PropertyImages title="Service" defaultValues={images_url} updateFormState={updateFormState} />
      </div>
      <div className="w-[40%] flex flex-col gap-5">
        <IndependentLocations defaultValues={independent_locations} updateFormState={updateFormState} />

        <IndependentPackages defaultValues={packages_list} updateFormState={updateFormState} />
      </div>
    </div>
  )
};

export default IndependentForm;