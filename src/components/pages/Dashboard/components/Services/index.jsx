
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, CalendarPlus, CirclePlus, Download, Ellipsis, Funnel, HandPlatter, Landmark, Plus, Search, SlidersHorizontal, Star, Users } from "lucide-react";
import ServicesTable from "./components/ServicesTable";
import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { AlertTriangleIcon } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

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
import xlsx from "json-as-xlsx";
import { formatCurrency } from "../../../../../api/util";

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
                <div className="font-title font-bold text-[1.2rem]">Travel Agencies</div>
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

  const userCache = localStorage.getItem("user-data");
  const parsedCache = JSON.parse(userCache ?? "{}");

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

  const downloadProvTrans = async () => {
    const userData = localStorage.getItem("user-data");
    const user = JSON.parse(userData);
    const formData = new FormData();
    formData.append("userId", user.id);
    const request = await fetch(`${import.meta.env.VITE_API_URL}/services/allBookings.php`, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    const { data } = response;
    const bookings = data?.bookings ?? [];

    const parsedData = bookings.map((item) => {
      const packageItem = JSON.parse(item.package_item ?? "{}");

      return ({
        id: `Transaction${String(item.id)?.padStart(4, "0")}`,
        service_name: item.property_name,
        customer_name: [item.personal_name, item.last_name].join(" "),
        customer_email: item.email,
        schedule: item.schedule,
        package: packageItem.package_name,
        price: formatCurrency(packageItem.price),
        status: item.status,
      });
    })

    let excelData = [
      {
        sheet: "Transaction History",
        columns: [
          { label: "Transaction ID", value: "id" },
          { label: "Service", value: "service_name" },
          { label: "Customer", value: "customer_name" },
          { label: "Customer Email", value: "customer_email" },
          { label: "Booking Date", value: "schedule" },
          { label: "Booking Package", value: "package" },
          { label: "Booking Price", value: "price" },
          { label: "Status", value: "status" },
        ],
        content: parsedData,
      },
    ]

    let settings = {
      fileName: "TRANSACTION_HISTORY", 
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
    }

    xlsx(excelData, settings);
  };

  const filteredList = servicesList.filter((item) => item.property_name.toLowerCase().includes(searchFilter.toLowerCase()))

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative md:w-[20rem]">
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

        {parsedCache.status !== "Verification" && (
          <>
            <div className="ml-auto w-full md:w-auto">
              <Button
                onClick={downloadProvTrans}
                type="button"
                variant="outline"
                className="h-8 w-full md:w-auto"
              ><Download />Export Transactions</Button>
            </div>

            <div className="w-full md:w-auto">
              <Button onClick={handleCreate} type="button" className="h-8 w-full md:w-auto bg-[#183B4E] hover:bg-[#2e5e78]"><CalendarPlus />Create Service</Button>
            </div>
          </>
        )}
      </div>
      
      {parsedCache.status === "Active" && (
        <ServicesTable servicesList={filteredList} />
      )}

      {parsedCache.status === "Verification" && (
        <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangleIcon />
          <AlertTitle>Alert: Account Under Review</AlertTitle>
          <AlertDescription>
            Your account is currently under review following the submission of your business documents. This process helps ensure compliance with our verification standards and policies.
          
            <br />
            During this time, some account features may be temporarily limited. We appreciate your patience and will notify you once the review has been completed or if additional information is required.
          </AlertDescription>
        </Alert>
      )}

      {parsedCache.status === "Rejected" && (
        <Alert className="border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-50">
          <AlertTriangleIcon />
          <AlertTitle>Alert: Listing Rejected</AlertTitle>
          <AlertDescription>
            Your submitted listing has been rejected after reviewing your business documents. This may be due to missing, incomplete, or invalid information provided during the submission process.
            
            <br />
            Please re-check your submitted documents, ensure all required details are accurate and up to date, and resubmit them for verification. Once updated, our team will review your submission again.
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={!!enabledCategory} onOpenChange={setEnabledCategory}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-auto">
          <CategorySelection />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default Services;