import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Circle, CirclePlus, CopyPlus, ListPlus, Minus, PhilippinePeso, Plus, Timer, Trash, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatCurrencyWithoutSymbol } from "@/api/util";

const defaultPackage = {
  package_name: "",
  price: "",
  inclusions: [""],
};

const CreatePackage = ({ onCreate, onDelete, defaultValue, onUpdate }) => {
  const cancelRef = useRef();
  const formRef = useRef();
  const [packageState, setPackageState] = useState(() => {
    if (typeof defaultValue.index === "number") return defaultValue;

    return defaultPackage;
  });

  const addInclusion = () => {
    setPackageState((prev) => {
      const copyInclusions = [...prev.inclusions];

      return {
        ...prev,
        inclusions: [...copyInclusions, ""],
      }
    });
  }

  const removeInclusions = (index) => {
    setPackageState((prev) => {
      const copyInclusions = [...prev.inclusions];

      copyInclusions.splice(index, 1);

      return {
        ...prev,
        inclusions: [...copyInclusions],
      }
    });
  }

  const updateInclusions = (updatedValue, index) => {
    setPackageState((prev) => {
      const copyInclusions = [...prev.inclusions];

      copyInclusions.splice(index, 1, updatedValue);

      return {
        ...prev,
        inclusions: [...copyInclusions],
      }
    });
  }

  const updatePackageField = (event, fieldName) => {
    const { value } = event.target;

    setPackageState((prev) => ({...prev, [fieldName]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onCreate) onCreate(packageState);

    if (onUpdate) onUpdate(packageState, defaultValue.index);

    setPackageState(defaultPackage)

    cancelRef.current.click();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>New Service Package</DialogTitle>
        <DialogDescription>
          Fill in new service package details.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 pt-5">

        <div className="grid gap-2">
          <Label htmlFor="package_name" className="text-[1rem]">Package Name</Label>
          <Input onChange={(event) => updatePackageField(event, "package_name")} id="package_name" name="package_name" defaultValue={packageState.package_name} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price" className="text-[1rem]">Price</Label>
          <Input onChange={(event) => updatePackageField(event, "price")} id="price" name="price" type="number" defaultValue={packageState.price} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="duration" className="text-[1rem]">Duration (hours)</Label>
          <Input onChange={(event) => updatePackageField(event, "duration")} id="duration" name="duration" type="number" defaultValue={packageState.duration} required />
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="inclusions" className="text-[1rem]">Inclusions</Label>
            <Button type="button" variant="link" className="w-fit" onClick={addInclusion}><CirclePlus /></Button>
          </div>


          {packageState.inclusions.map((item, index) => (
            <div className="grid gap-3 mb-2">
              <Label htmlFor={`inclusions_${index}`}>Inclusion #{index + 1}</Label>
              <div className="flex gap-1">
                <Input id={`inclusions_${index}`} onChange={(event) => updateInclusions(event.target.value, index)} name="name" value={item} />
                <Button type="button" variant="icon" onClick={() => removeInclusions(index)}><Trash /></Button>
              </div>
            </div>
          ))}

        </div>

      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" ref={cancelRef}>Cancel</Button>
        </DialogClose>
        {onDelete && (
          <Button type="button" variant="destructive" onClick={() => {
            onDelete(defaultValue.index)
            cancelRef.current.click();
          }}><Trash /></Button>
        )}
        <Button type="submit" onClick={() => formRef.current.requestSubmit()}>Save changes</Button>
      </DialogFooter>
  </form>
  )
}

const IndependentPackages = ({ defaultValues = [], updateFormState }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packagesList, setPackagesList] = useState(defaultValues);
  
  useEffect(() => {
    setPackagesList(defaultValues);
  }, [defaultValues]);


  const onCreate = (packageItem) => {
    setPackagesList((prev) => {
      const updated = ([...prev, packageItem]);

      updateFormState("packages_list", updated);

      return updated;
    });
  }

  const onUpdate = (packageItem, index) => {
    setPackagesList((prev) => {
      const copy = [...prev];

      copy.splice(index, 1, packageItem);

      updateFormState("packages_list", copy);

      return copy;
    });
  }

  const onDelete = (index) => {
    setPackagesList((prev) => {
      const copy = [...prev];

      copy.splice(index, 1);

      updateFormState("packages_list", copy);

      return copy;
    });
  }

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem] flex justify-between items-center">
          <span>Service Packages</span>

          <div>
            <Button variant="ghost" onClick={() => setSelectedPackage({})}><CirclePlus /></Button>
          </div>
        </p>

        {packagesList.map((packageItem, index) => (
          <div onClick={() => setSelectedPackage({ ...packageItem, index })} className="hover:bg-gray-100 py-2 rounded-sm mb-4">
            <div className="font-semibold mb-1">
              {packageItem.package_name}
            </div>
            <div className="flex gap-10 mb-5">
              <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><PhilippinePeso size={15} /> {formatCurrencyWithoutSymbol("en-US", "PHP", packageItem.price)}</p>
              <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Timer size={15} /> {packageItem.duration} hour(s)</p>
            </div>

            <p>Inclusions:</p>
            <ul className="mb-5">
              {packageItem.inclusions.map((inclusion) => (
                <li className="decoration" key={inclusion}>
                  <div className="flex pl-3 gap-2 items-center">
                    <Circle size={9} fill="#183B4E" /> {inclusion}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>

      <Dialog open={!!selectedPackage} onOpenChange={setSelectedPackage}>
        <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-auto">
          {!!selectedPackage && (
            <CreatePackage
              defaultValue={selectedPackage}
              onCreate={!selectedPackage?.package_name && onCreate}
              onUpdate={!!selectedPackage?.package_name && onUpdate}
              onDelete={!!selectedPackage?.package_name && onDelete}
              index={selectedPackage.index}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
};

export default IndependentPackages;