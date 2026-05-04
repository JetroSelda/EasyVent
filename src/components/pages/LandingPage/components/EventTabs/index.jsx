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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventTabs = ({ updateEventTab }) => {
  const [bookmark, setBookmark] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    navigate("/servicehotel", { state: { id: item.id } })
  };

  useEffect(() => {
    const bmData = localStorage.getItem("bookmark");
    const bmParsed = JSON.parse(bmData ?? "[]");

    setBookmark(bmParsed);
  }, []);
  return (
    <div className="p-2 md:p-10">
      <Card className="py-2">
        <CardContent className="px-3 text-center">
          <div className="flex items-center">
            <div className="md:flex items-center-safe justify-around w-[95%] hidden">
              <Button onClick={() => updateEventTab("")} variant="link" className="text-[1rem]"><Columns /> Show All</Button>
              <Button onClick={() => updateEventTab("hotels")} variant="link" className="text-[1rem]"><Hotel /> Hotels/Resorts</Button>
              <Button onClick={() => updateEventTab("restaurants")} variant="link" className="text-[1rem]"><Utensils /> Restaurants</Button>
              <Button onClick={() => updateEventTab("functionHalls")} variant="link" className="text-[1rem]"><Landmark /> Travel Agencies</Button>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Bookmark fill="#dda853" />
                </PopoverTrigger>
                <PopoverContent className="w-60 overflow-auto p-0">
                  {bookmark.map((bm) => (
                    <div onClick={() => handleNavigate(bm)} className="py-3 px-4 hover:bg-gray-100 cursor-pointer border-b-1">
                      <h3 className="font-semibold text-xl">{bm.name}</h3>
                      <p>{bm.category}</p>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
};

export default EventTabs;