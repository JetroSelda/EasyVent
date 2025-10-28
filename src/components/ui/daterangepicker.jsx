"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarRangeIcon, ChevronDownIcon } from "lucide-react";

const today = new Date();
const tom = new Date(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`)

export default function DateRangePicker({ defaultValue, onChange }) {
  const handleChange = (data) => {
    if (onChange) onChange(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-9 w-[12rem] justify-start">
          <CalendarRangeIcon />
          {defaultValue?.from && defaultValue.to
            ? `${format(defaultValue.from, "MMM d")} – ${format(defaultValue.to, "MMM d yyyy")}`
            : `${format(today, "MMM d")} – ${format(tom, "MMM d yyyy")}`}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0 overflow-hidden" align="start">
        <Calendar
          mode="range"
          selected={defaultValue}
          onSelect={handleChange}
          captionLayout="dropdown"
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
