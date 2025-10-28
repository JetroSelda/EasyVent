
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, CalendarPlus, CirclePlus, Ellipsis, Funnel, HandPlatter, Landmark, Plus, Search, SlidersHorizontal, Star, Users } from "lucide-react";
import ServicesTable from "./components/ServicesTable";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

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

const CategorySelection = () => {
  const navigate = useNavigate();

  const navigateForm = (category) => {
    navigate("/dashboard/services/form", { state: { category }})
  }

  return (
    <form>
      <DialogHeader>
        <DialogTitle>Categories</DialogTitle>
        <DialogDescription>
          Select category to list your service
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 gap-5 py-7">
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => navigateForm("Hotel/Resort")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Building2 size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Hotel/Resort</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => navigateForm("Restaurant")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <HandPlatter size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.5rem]">Restaurant</div>
                <p className="text-[0.9rem] text-gray-500">
                  Provision of food services at various locatins, categorized into commercial, noncommercial and military
                  segments. It encompasses on-premise and off-premise services, with types of caterers ranging from full service
                  to party food caterers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => navigateForm("Function Hall")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Landmark size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Function Hall</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => navigateForm("Independent Provider")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Users size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Independent Provider</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

const StatusFilter = ({ onSubmit, defaultValues = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const statusList = ["Published", "Draft", "Deactivated"];

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

const CategoryFilter = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState([]);
  const categoryList = ["Hotel/Resort", "Restaurant", "Function Hall", "Independent Provider"];

  const handleOnChange = (value) => {
    setIsOpen(value);

    if (!value) onSubmit(selected);
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
        <Button variant="outline" className="h-8"><CirclePlus /> Category</Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>

              {categoryList.map((item) => {
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

const Services = () => {
  const [servicesList, setServicesList] = useState([]);
  const [enabledCategory, setEnabledCategory] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  const handleCreate = () => {
    setEnabledCategory(true);
  };


  const fetchServices = (status = [], category = []) => {
    const userData = localStorage.getItem("user-data");
    const parsedData = JSON.parse(userData);

    const formData = new FormData();

    formData.append("userId", parsedData.id);

    if (status.length > 0) {
      const statusParams = status.map((item) => `'${item}'`).join(", ");
      formData.append("status", statusParams);
    }

    if (category.length > 0) {
      const categoryParams = category.map((item) => `'${item}'`).join(", ");
      formData.append("category", categoryParams);
    }

    fetch(`${import.meta.env.VITE_API_URL}/services/fetchByProvider.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data = {} }) => {
        const { services = [] } = data;

        const parsedServices = services.map((item) => {
          const packages = JSON.parse(item.packages_list || "[]");
          const prices = packages.map((item) => Number(item.price ?? 0));

          const maxPrice = Math.max(...prices);
          const minPrice = Math.max(...prices);
          return {
            ...item,
            packages_list: packages,
            minPrice,
            maxPrice,
          }
        });

        setServicesList(parsedServices);
      });
    
  }
  
  const updateStatusFilter = (value) => {
    setStatusFilter(value);

    fetchServices(value, categoryFilter);
  }

  const updateCategoryFilter = (value) => {
    setCategoryFilter(value);

    fetchServices(statusFilter, value);
  }

  useEffect(() => {
    fetchServices()
  }, []);

  const filteredList = servicesList.filter((item) => item.property_name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex gap-3">
        <div className="relative w-[20rem]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Search service by name or ID"
            className="pl-10 pr-3 w-full h-8"
            onChange={(evt) => setSearchFilter(evt.target.value)}
          />
        </div>

        <StatusFilter onSubmit={updateStatusFilter} />
        
        <CategoryFilter onSubmit={updateCategoryFilter} />

        <div className="ml-auto">
          <Button onClick={handleCreate} type="button" className="h-8 bg-[#183B4E] hover:bg-[#2e5e78]"><CalendarPlus />Create Service</Button>
        </div>
      </div>
      
      <ServicesTable servicesList={filteredList} />

      <Dialog open={!!enabledCategory} onOpenChange={setEnabledCategory}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-auto">
          <CategorySelection />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default Services;