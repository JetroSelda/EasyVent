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
import { Circle, CirclePlus, CopyPlus, ListPlus, Minus, PhilippinePeso, Plus, Trash, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { formatCurrencyWithoutSymbol } from "@/api/util";

const defaultPackage = {
  package_name: "",
  no_guest: "",
  price: "",
  inclusions: [""],
  meal_sets: [{ title: "", meals: [""] }]
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

  const addMealSet = () => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      return {
        ...prev,
        meal_sets: [...copySet, { title: "", meals: [""] }],
      }
    });
  };

  const removeMealSet = (index) => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      copySet.splice(index, 1);

      return {
        ...prev,
        meal_sets: [...copySet],
      }
    });
  };

  const updateMealSetTitle = (updatedValue, index) => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      copySet.splice(index, 1, { ...copySet[index], title: updatedValue });

      return {
        ...prev,
        meal_sets: [...copySet],
      }
    });
  };

  const addMeal = (setIndex) => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      const selectedSet = copySet[setIndex];

      copySet.splice(setIndex, 1, { ...selectedSet, meals: [...selectedSet.meals, ""] });

      return {
        ...prev,
        meal_sets: [...copySet],
      }
    });
  }

  const removeMeal = (setIndex, mealIndex) => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      const selectedSet = { ...copySet[setIndex] };

      const copyMeals = [...selectedSet.meals];

      copyMeals.splice(mealIndex, 1);

      copySet.splice(setIndex, 1, { ...selectedSet, meals: [...copyMeals] });


      return {
        ...prev,
        meal_sets: [...copySet],
      }
    });
  }

  const updateMeal = (updatedValue, setIndex, mealIndex) => {
    setPackageState((prev) => {
      const copySet = [...prev.meal_sets];

      const selectedSet = { ...copySet[setIndex] };

      selectedSet.meals.splice(mealIndex, 1, updatedValue);

      copySet.splice(setIndex, 1, { ...selectedSet });

      return {
        ...prev,
        meal_sets: [...copySet],
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
        <DialogTitle>New Package</DialogTitle>
        <DialogDescription>
          Add new package details.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3">

        <div className="grid gap-2">
          <Label htmlFor="package_name" className="text-[1rem]">Package Name</Label>
          <Input onChange={(event) => updatePackageField(event, "package_name")} id="package_name" name="package_name" defaultValue={packageState.package_name} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="no_guest" className="text-[1rem]">No. of Guest</Label>
          <Input onChange={(event) => updatePackageField(event, "no_guest")} id="no_guest" name="no_guest" type="number" defaultValue={packageState.no_guest} required />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="price" className="text-[1rem]">Price</Label>
          <Input onChange={(event) => updatePackageField(event, "price")} id="price" name="price" type="number" defaultValue={packageState.price} required />
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

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="meal_sets" className="text-[1rem]">Meal Sets</Label>
            <Button type="button" variant="ghost" className="w-fit" onClick={addMealSet}><CirclePlus /></Button>
          </div>
          
          {packageState.meal_sets.map((item, setIndex) => (
            <div className="grid gap-2">
              <Label htmlFor={`meal_set_${setIndex}`}>Meal Set #{setIndex + 1}</Label>
              <div className="flex gap-1">
                <Input value={item.title} id={`meal_set_${setIndex}`} onChange={(event) => updateMealSetTitle(event.target.value, setIndex)} name="name" placeholder="Meal Set Title" />
                <Button type="button" variant="icon" onClick={() => removeMealSet(setIndex)}><Trash /></Button>
              </div>
              
              {item.meals.map((meal, mealIndex) => (
                <div className="flex gap-1 items-center">
                  <div className="mr-3 pl-2">
                    <Circle size={16} />
                  </div>
                  <Input onChange={(event) => updateMeal(event.target.value, setIndex, mealIndex)} value={meal} name="name" placeholder="Meal" />
                  <Button type="button" variant="icon" onClick={() => removeMeal(setIndex, mealIndex)}><Minus /></Button>
                </div>
              ))}

              <div className="pl-6">
                <Button type="button" variant="link" onClick={() => addMeal(setIndex)} className="text-blue-500"><Plus /> Add Meal</Button>
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

const Packages = ({ defaultValues = [], updateFormState }) => {
  const [packagesList, setPackagesList] = useState(defaultValues);
  const [selectedPackage, setSelectedPackage] = useState(null);

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
          <span>Packages</span>

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
              <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Users size={15} /> {packageItem.no_guest} Guests</p>
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

            <p>Meal Sets:</p>
            <ul>
              {packageItem.meal_sets.map(({ title = "", meals = [] }) => (
                <li className="decoration" key={title}>
                  <div className="flex pl-3 gap-2 items-center">
                    <Circle size={9} fill="#183B4E" /> {title}
                  </div>

                  <ul>
                    {meals.map((mealItem) => (
                      <li key={mealItem}>
                        <div className="flex pl-6 gap-2 items-center">
                          <Circle size={9} /> {mealItem}
                        </div>
                      </li>
                    ))}
                  </ul>
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
}

export default Packages;