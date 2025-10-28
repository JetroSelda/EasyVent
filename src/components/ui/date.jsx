import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formatDate } from "../../api/util"

const DateInput = ({ defaultValue, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="justify-between font-normal"
          >
            {defaultValue ? formatDate(defaultValue) : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={new Date(defaultValue)}
            captionLayout="dropdown"
            onSelect={(date) => {
              setOpen(false);
              if (onChange) onChange(date);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateInput;