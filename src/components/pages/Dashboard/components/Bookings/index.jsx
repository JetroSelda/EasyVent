
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox";
import BookingTable from "./components/BookingTable";
import { toast } from "sonner";

const StatusFilter = ({ onSubmit, defaultValues = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const statusList = ["Pending", "Confirmed", "Paid", "Rejected"];

  const handleOnChange = (value) => {
    setIsOpen(value);

    if (!value) onSubmit(selected)
  }

  const onChange = (value) => {
    setSelected((prev) => {
      const updated =  prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value];
      
      return updated;
    });
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOnChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8"><CirclePlus /> Status</Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." className="h-9" />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>

              {statusList.map((item) => {
                return (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                    }}
                  >
                    <Checkbox checked={selected.includes(item)} /> {item}
                  </CommandItem>
                )
              })}
              
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const Bookings = () => {
  const [bookingList, setBookingList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchBookingList = () => {
    const userData = localStorage.getItem("user-data");

    if (!userData) return;

    const parsedData = JSON.parse(userData);

    const formData = new FormData();

    formData.append("userId", parsedData.id);

    fetch(`${import.meta.env.VITE_API_URL}/booking/customerBooking.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data = {} }) => {
        const { bookings = [] } = data;

        const parsedBookings = bookings.map((item) => ({
          ...item,
          package_item: JSON.parse(item.package_item ?? "{}"),
          contacts: JSON.parse(item.contacts ?? "[]"),
          location: JSON.parse(item.location ?? "{}"),
        }));

        setBookingList(parsedBookings);
      })
      .catch((error) => {
        toast("Something Went Wrong!", { description: error.message });
      })
  }

  useEffect(() => {
    fetchBookingList();
  }, []);

  console.log("StatusFilter", statusFilter, bookingList)

  const filteredList = bookingList.filter((item) => {
    return !statusFilter?.length || statusFilter.includes(item.status);
  });

  const updateStatusFilter = (value) => {
    setStatusFilter(value)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-3">
        <div className="relative w-[20rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Search booking by name"
            className="pl-10 pr-3 w-full h-8"
            onChange={(evt) => setSearchFilter(evt.target.value)}
          />
        </div>

        <StatusFilter onSubmit={updateStatusFilter} />
      </div>
      
      <BookingTable bookingList={filteredList} refresh={fetchBookingList} />
    </div>
  )
};

export default Bookings;