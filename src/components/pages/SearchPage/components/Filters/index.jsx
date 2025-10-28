import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

import RangeSlider from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { formatCurrency } from "../../../../../api/util";
import NearByMap from "../NearyByMap";

const Filters = ({ toggleType, serviceTypes, maxPrice = 0, eventList, setSearchState, setMapEnabled, setNameFilter }) => {
  const [range, setRange] = useState([0, maxPrice / 2]);

  const updateBudget = (value) => {
    setRange(value);

    setSearchState((prev) => ({ ...prev, budget_range: value }));
  }

  console.log("Max Price", maxPrice)

  return (
    <div className="hidden md:block w-[35%] p-5 pl-[2rem]">
      <div className="relative w-full mb-[1rem]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
        <Input 
          type="search" 
          placeholder="Search place by name"
          className="pl-10 pr-3 w-full h-8"
          onChange={(evt) => setNameFilter(evt.target.value)}
        />
      </div>

      <div className="relative mb-5 h-[12rem] shadow-md border-1 rounded-sm overflow-hidden">
        <NearByMap eventList={eventList} zoom={12} />

        <div onClick={() => setMapEnabled(true)} className="opacity-0 cursor-pointer hover:opacity-100 absolute top-0 left-0 w-full h-full z-[5] bg-[#000000AA] text-white flex items-center justify-center">
          View Nearby Place
        </div>
      </div>

      <Card className="rounded-md py-4 gap-4">
        <CardHeader className="border-b-1 px-4 pb-2">
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="px-4">
          <Label className="font-bold text-[1rem] text-[#183B4E]">Budget Range</Label>
          <div className="py-5">
            <RangeSlider
              min={0}
              max={maxPrice}
              step={1}
              value={range}
              onValueChange={updateBudget}
              formatLabel={(v) => formatCurrency(v)}
              className="w-full"
            />
          </div>

          
          {/* <Label className="font-bold text-[1rem] mt-5 mb-4 text-[#183B4E]">Payment Options</Label>

          <div className="flex gap-3 items-center mb-4">
            <Checkbox /> <Label>Free Cancellation</Label>
          </div>
          <div className="flex gap-3 items-center mb-4">
            <Checkbox /> <Label>Book Now, Pay Later</Label>
          </div> */}

          <Label className="font-bold text-[1rem] mt-5 mb-4 text-[#183B4E]">Property Type</Label>

          <div className="flex gap-3 items-center mb-4">
            <Checkbox checked={serviceTypes.includes("Hotel/Resort")} id="hotel-checkbox" onClick={() => toggleType("Hotel/Resort")} /> <Label htmlFor="hotel-checkbox">Hotels/Resorts</Label>
          </div>
          <div className="flex gap-3 items-center mb-4">
            <Checkbox checked={serviceTypes.includes("Restaurant")} id="rest-checkbox" onClick={() => toggleType("Restaurant")} /> <Label htmlFor="rest-checkbox">Restaurant</Label>
          </div>
          <div className="flex gap-3 items-center mb-4">
            <Checkbox checked={serviceTypes.includes("Function Hall")} id="hall-checkbox" onClick={() => toggleType("Function Hall")} /> <Label htmlFor="hall-checkbox">Function Hall</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filters;