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
import { getServiceData } from "../../../../../../../api/services";

const ServicesTable = ({ servicesList = [] }) => {
  const navigate = useNavigate();
  const openService = (id) => {
    navigate("/dashboard/services/details", { state: { id } });
  }

  const editService = async (id) => {
    const data = await getServiceData(id);

    navigate("/dashboard/services/form", { state: { ...data } });
  }

  return (
    <Card className="p-0 rounded-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="w-[150px] px-5 py-3 text-gray-500">Record ID</TableHead>
              <TableHead className="w-[200px] text-gray-500">Name</TableHead>
              <TableHead className="text-gray-500">Category</TableHead>
              <TableHead className="text-gray-500">Price Range (min)</TableHead>
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
                <TableCell>{formatCurrency(service.minPrice)}</TableCell>
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

                              <CommandItem
                                onSelect={() => {
                                  editService(service.id);
                                }}
                              >
                                Edit Service
                              </CommandItem>
                              
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
    </Card>
  )
};

export default ServicesTable;