import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { formatCurrency } from "../../../../../../../api/util";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";

const BlockServiceForm = ({ id, onSubmit }) => {
  const [reason, setReason] = useState("");
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (onSubmit) onSubmit(id, reason);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Block Service</DialogTitle>
        <DialogDescription>
          Please fill in the reason for blocking this service
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <Label>Reason</Label>
        <Textarea value={reason} onChange={(event) => setReason(event.target.value)} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" variant="destructive" onClick={() => formRef.current.requestSubmit()}>Block Service</Button>
      </DialogFooter>
  </form>
  )
}

const ServicesTable = () => {
  const navigate = useNavigate();
  const [servicesList, setServicesList] = useState([]);
  const [blockedService, setBlockService] = useState(null);

  const parseServicesData = ({ data = {} }) => {
    const { services = [] } = data;

    const parsedServices = services.map((service) => {
      const parsedService = {
        ...service,
        amenities: JSON.parse(service.amenities ?? "[]"),
        highlights: JSON.parse(service.highlights ?? "[]"),
        images_url: JSON.parse(service.images_url ?? "[]"),
        packages_list: JSON.parse(service.packages_list ?? "[]"),
        location: JSON.parse(service.location ?? "{}"),
        skills: JSON.parse(service.skills ?? "[]"),
        experiences: JSON.parse(service.experiences ?? "[]"),
        independent_locations: JSON.parse(service.independent_locations ?? "[]"),
        contacts: JSON.parse(service.contacts ?? "[]"),
        required_documents: JSON.parse(service.required_documents ?? "[]"),
      };

      return parsedService;
    });

    parsedServices.sort((a, b) => b.status.localeCompare(a.status));

    setServicesList(parsedServices);
  }

  const handleError = (error) => {
    return toast(error.message);
  }

  const getServicesData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/services/activeServices.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then(parseServicesData)
      .catch(handleError);
  };

  const openService = (id) => {
    navigate("/dashboard/admin/service", { state: { id } });
  };

  const blockService = (id, reason) => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", "Blocked");
    formData.append("block_reason", reason);

    fetch(`${import.meta.env.VITE_API_URL}/services/blockService.php`, {
      method: "POST",
      body: formData,
    }).then(() => {
      toast("Successfully Blocked Service", { description: "Service will now be hidden from the public."});

      setBlockService(null);
      getServicesData();
    })
    .catch(handleError);
  };

  const unblockService = (id) => {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", "Published");
    formData.append("block_reason", "");

    fetch(`${import.meta.env.VITE_API_URL}/services/blockService.php`, {
      method: "POST",
      body: formData,
    }).then(() => {
      toast("Successfully Unblocked Service", { description: "Service will now be visible again."});
      getServicesData();
    })
    .catch(handleError);
  };

  useEffect(() => {
    getServicesData();
  }, []);
  return (
    <Card className="p-0 rounded-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="w-[150px] px-5 py-3 text-gray-500">Record ID</TableHead>
              <TableHead className="w-[200px] text-gray-500">Name</TableHead>
              <TableHead className="text-gray-500">Category</TableHead>
              {/* <TableHead className="text-gray-500">Rating</TableHead> */}
              <TableHead className="px-5 py-3 text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesList.map((service) => (
              <TableRow key={service.invoice}>
                <TableCell className="font-medium px-5 py-2">Servc{service.id.toString().padStart(4, "0")}</TableCell>
                <TableCell>
                  <div className="w-[90%] overflow-hidden text-ellipsis">
                    {service.property_name}
                  </div>
                </TableCell>
                <TableCell>{service.category}</TableCell>
                {/* <TableCell>
                  <div className="flex items-center gap-2">
                    <Star fill="#ffb86a" size={16} /> 4.5
                  </div>
                </TableCell> */}
                <TableCell className="px-5 py-2">
                  <div className="flex items-center justify-between">
                    <span>{service.status}</span>


                    <Popover align="right">
                      <PopoverTrigger asChild>
                        <Button variant="icon"><Ellipsis /></Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[120px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>

                              <CommandItem
                                onSelect={() => {
                                  openService(service.id);
                                }}
                              >
                                Open Service
                              </CommandItem>

                              {service.status === "Published" && (
                                <CommandItem
                                  onSelect={() => {
                                    setBlockService(service.id);
                                  }}
                                >
                                  Block Service
                                </CommandItem>
                              )}

                              {service.status === "Blocked" && (
                                <CommandItem
                                  onSelect={() => {
                                    unblockService(service.id)
                                  }}
                                >
                                  Unblock Service
                                </CommandItem>
                              )}
                              
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={!!blockedService} onOpenChange={setBlockService}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          {!!blockedService && (
            <BlockServiceForm id={blockedService} onSubmit={blockService} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
};

export default ServicesTable;