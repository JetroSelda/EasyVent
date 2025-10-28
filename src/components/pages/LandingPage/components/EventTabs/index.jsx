import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Bookmark, Columns, Hotel, Landmark, TreePalm, Users, Utensils } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const EventTabs = ({ updateEventTab }) => {
  return (
    <div className="p-2 md:p-10">
      <Card className="py-2">
        <CardContent className="px-3 text-center">
          <div className="flex items-center">
            <div className="md:flex items-center-safe justify-around w-[95%] hidden">
              <Button onClick={() => updateEventTab("")} variant="link" className="text-[1rem]"><Columns /> Show All</Button>
              <Button onClick={() => updateEventTab("hotels")} variant="link" className="text-[1rem]"><Hotel /> Hotels/Resorts</Button>
              <Button onClick={() => updateEventTab("restaurants")} variant="link" className="text-[1rem]"><Utensils /> Restaurants</Button>
              <Button onClick={() => updateEventTab("functionHalls")} variant="link" className="text-[1rem]"><Landmark /> Function Halls</Button>
              <Button onClick={() => updateEventTab("serviceProviders")} variant="link" className="text-[1rem]"><Users /> Service Providers</Button>
            </div>

            <div className="md:hidden">
              <Select className="w-[50%]">
                <SelectTrigger className="w-[100%]">
                  <SelectValue placeholder="Select a Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Event Type</SelectLabel>
                    <SelectItem value="apple">Show All</SelectItem>
                    <SelectItem value="banana">Hotels</SelectItem>
                    <SelectItem value="blueberry">Restaurants</SelectItem>
                    <SelectItem value="grapes">Resort Spas</SelectItem>
                    <SelectItem value="pineapple">Service Providers</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex grow justify-end cursor-pointer">
              <Bookmark fill="orange" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default EventTabs;