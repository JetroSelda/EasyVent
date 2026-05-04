import { Input } from "@/components/ui/input";
import { Bookmark, Clock, MapPin, Users } from "lucide-react";
import DateRangePicker from "@/components/ui/daterangepicker";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom";


const SearchSection = ({ bookmark = [], setSearchState, sortBy, setSortBy }) => {
  const [dateRange, setDateRange] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [pax, setPax] = useState();

  const navigate = useNavigate();

  const submitSearch = () => {
    setSearchState({ date_range: dateRange, time, location, pax });
  }

  const handleNavigate = (item) => {
    navigate("/servicehotel", { state: { id: item.id } })
  };

  return (
    <div className="border-b-1 px-2 md:px-[10rem] py-5">
      <div className="flex-col md:flex-row flex gap-5 md:items-center">
        <div className="relative md:w-[12rem]">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          <Input
            type="search" 
            placeholder="Location"
            className="pl-10 pr-3 w-full h-9"
            onChange={(evt) => setLocation(evt.target.value)}
          />
        </div>

        <DateRangePicker defaultValue={dateRange} onChange={setDateRange} />

        <div className="relative">
          <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none" />
          <Select onValueChange={(val) => setPax(val)}>
            <SelectTrigger className="w-full md:w-[12rem] pl-10">
              <SelectValue placeholder="Event Pax" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Event Pax</SelectLabel>
                <SelectItem value="1-10">1 - 10 pax</SelectItem>
                <SelectItem value="10-20">10 - 20 pax</SelectItem>
                <SelectItem value="20-40">20 - 40 pax</SelectItem>
                <SelectItem value="40-60">40 - 60 pax</SelectItem>
                <SelectItem value="60-100">60 - 100 pax</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button className="bg-[#183B4E]" onClick={submitSearch}>Search</Button>
      </div>

      <div className="flex-col flex md:flex-row gap-5 md:items-center pt-5">
        <p className="font-bold">Sort by</p>
        <Button className={`${sortBy === "" ? "bg-[#dda853]" : "bg-[#27548a]"} hover:bg-[#dda853] px-10`} onClick={() => setSortBy("")}>Best Match</Button>
        <Button className={`${sortBy === "price" ? "bg-[#dda853]" : "bg-[#27548a]"} hover:bg-[#dda853] px-10`} onClick={() => setSortBy("price")}>Budget</Button>
        <Button className={`${sortBy === "rate" ? "bg-[#dda853]" : "bg-[#27548a]"} hover:bg-[#dda853] px-10`} onClick={() => setSortBy("rate")}>Top Rated</Button>
        

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
  )
};

export default SearchSection;