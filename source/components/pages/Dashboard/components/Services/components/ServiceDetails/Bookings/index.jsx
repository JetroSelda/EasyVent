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
import { Circle, Ellipsis, Mail, PhilippinePeso, Phone, Smartphone, Timer, User, Users } from "lucide-react";

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
import { useEffect, useRef, useState } from "react";
import { formatCurrency, formatCurrencyWithoutSymbol } from "../../../../../../../../api/util";

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
import { toast } from "sonner";

const CONTACT_ICONS = {
  Landline: Phone,
  Mobile: Smartphone,
};

const BookingForm = ({ defaultValue = {} }) => {
  const { personal_name, last_name, email, contacts = [], package_item: packageItem, status, reason } = defaultValue;
  const displayPicture = `${import.meta.env.VITE_API_URL}/uploads/${defaultValue.display_picture}`;
  return (
    <form>
      <DialogHeader>
        <DialogTitle>Booking</DialogTitle>
      </DialogHeader>
      <div className="grid gap-3 pt-5">
        <div className="flex gap-3 pb-5">
          <div className="w-[35%]">
            <Card className="rounded-sm p-0 overflow-hidden">
              <CardContent className="p-0 relative overflow-hidden">
                <div className="h-[7rem] w-full absolute top-0 left-0 bg-blue-300" />

                <div className="relative py-5 z-[2] flex items-center justify-center bg-transparent">
                  <div className="w-[9rem] h-[9rem] bg-white shadow-sm rounded-full border-4 border-white overflow-hidden ">
                    <img src={displayPicture} className="w-full h-full object-cover" />
                  </div>
                </div>

                <p className="px-5">
                  <div className="flex font-title font-bold text-[#183B4E] text-[1.2rem]">
                     {[personal_name, last_name].filter(Boolean).join(" ")}
                  </div>

                  <div className="py-4">
                    {contacts.map((contact) => {
                      const IconComponent = CONTACT_ICONS[contact.type];

                      return (
                        <div className="flex gap-2 items-center italic">
                          <IconComponent size={15} /> {contact.value}
                        </div>
                      )
                    })}

                    <div className="flex gap-2 items-center italic">
                      <Mail size={15} /> {email}
                    </div>
                  </div>
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="w-[60%]">
            {status === "Rejected" && (
              <Card className="rounded-sm mb-3">
                <CardContent>
                  <div className="rounded-sm mb-4">
                    <div className="font-semibold mb-1">
                      Reason for Rejection
                    </div>

                    <div className="italic">{reason}</div>
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="rounded-sm mb-3">
              <CardContent>
                <div className="rounded-sm mb-4">
                  <div className="font-semibold mb-1">
                    {packageItem.package_name}
                  </div>
                  <div className="flex gap-10 mb-5">
                    <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><PhilippinePeso size={15} /> {formatCurrencyWithoutSymbol("en-US", "PHP", packageItem.price)}</p>
                    {packageItem.no_guest && (
                      <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Users size={15} /> {packageItem.no_guest} Guests</p>
                    )}

                    {packageItem.duration && (
                      <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Timer size={15} /> {packageItem.duration} hour(s)</p>
                    )}
                  </div>

                  <p className="font-semibold mb-1">Inclusions</p>
                  <ul className="mb-5">
                    {packageItem.inclusions.map((inclusion) => (
                      <li className="decoration" key={inclusion}>
                        <div className="flex pl-3 gap-2">
                          <div className="w-[1.2rem] pt-[0.5rem]">
                            <Circle size={9} fill="#183B4E" />  
                          </div> {inclusion}
                        </div>
                      </li>
                    ))}
                  </ul>

                  {packageItem.meal_sets && (
                    <>
                      <p className="font-semibold mb-1">Meal Sets</p>
                      <div className="grid grid-cols-2">
                        {packageItem.meal_sets.map(({ title = "", meals = [] }) => (
                          <ul key={title}>
                            <li className="decoration">
                              <div className="flex pl-3 gap-2 items-center">
                                <Circle size={9} fill="#183B4E" /> {title}
                              </div>

                              <ul>
                                {meals.map((mealItem) => (
                                  <li key={mealItem}>
                                    <div className="flex pl-6 gap-2 items-center">
                                      <Circle size={9} /> {mealItem}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          </ul>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </form>
  )
};

const RejectBookingForm = ({ defaultValue = {}, refetch }) => {
  console.log("Default Value", defaultValue);
  const [reason, setReason] = useState("");
  const formRef = useRef();
  const cancelRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", defaultValue.id);
    formData.append("reason", reason);

    fetch(`${import.meta.env.VITE_API_URL}/booking/reject.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast(data.title, { description: data.message });
        refetch();
        cancelRef.current.click();
      });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Reject Booking</DialogTitle>
        <DialogDescription>
          Please fill in the reason for rejecting the booking
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <Label>Reason</Label>
        <Textarea value={reason} onChange={(event) => setReason(event.target.value)} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" ref={cancelRef}>Cancel</Button>
        </DialogClose>
        <Button type="submit" variant="destructive" onClick={() => formRef.current.requestSubmit()}>Reject Booking</Button>
      </DialogFooter>
  </form>
  )
}

const Bookings = ({ service = {} }) => {
  const [bookingList, setBookingList] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState();
  const [rejectingBooking, setRejectingBooking] = useState();

  const fetchBookingList = () => {
    if (!service.id) return;
    const formData = new FormData();

    formData.append("serviceId", service.id);

    fetch(`${import.meta.env.VITE_API_URL}/booking/serviceBooking.php`, {
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
        }));

        setBookingList(parsedBookings);
      })
      .catch((error) => {
        toast("Something Went Wrong!", { description: error.message });
      })
  }

  const bookingConfirmation = (selected) => {
    const formData = new FormData();

    formData.append("id", selected.id);
    const userData = localStorage.getItem("user-data");
    const parsedUser = JSON.parse(userData);

    const { property_name } = service;
    const { id_customer, personal_name, last_name, display_picture } = selected;

    formData.append("user1Id", parsedUser.id);
    formData.append("user1Name", property_name);
    formData.append("user1Image", parsedUser.display_picture);

    formData.append("user2Id", id_customer);
    formData.append("user2Name", [personal_name, last_name].filter(Boolean).join(" "));
    formData.append("user2Image", display_picture);

    fetch(`${import.meta.env.VITE_API_URL}/booking/confirmBooking.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast(data.title, { description: data.message });
        fetchBookingList();
      });
  }
  
  useEffect(() => {
    fetchBookingList();
  }, []);
  return (
    <Card className="p-0 rounded-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="w-[150px] px-5 py-3 text-gray-500">Customer</TableHead>
              <TableHead className="text-gray-500">Package</TableHead>
              <TableHead className="text-gray-500">Date</TableHead>
              <TableHead className="px-5 py-3 text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingList.map((booking) => (
              <TableRow key={booking.invoice}>
                <TableCell className="font-medium px-5 py-2">
                  <div className="w-[90%] overflow-hidden text-ellipsis">
                    {[booking.personal_name, booking.last_name].filter(Boolean).join(" ")}
                  </div>
                </TableCell>
                <TableCell>{booking.package_item?.package_name}</TableCell>
                <TableCell>YYYY/MM/DD HH:MM</TableCell>
                <TableCell className="px-5 py-2">
                  <div className="flex items-center justify-between">
                    <span>{booking.status}</span>

                    <Popover align="right">
                      <PopoverTrigger asChild>
                        <Button variant="icon"><Ellipsis /></Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[150px] p-0"  side="bottom" align="end">
                        <Command>
                          <CommandList>
                            <CommandGroup>

                              <CommandItem
                                onSelect={() => setSelectedBooking(booking)}
                              >
                                Open Booking
                              </CommandItem>

                              {booking.status === "Pending" && (
                                <CommandItem
                                  onSelect={() => {
                                    bookingConfirmation(booking);
                                  }}
                                >
                                  Confirm Booking
                                </CommandItem>
                              )}

                              {booking.status === "Pending" && (
                                <CommandItem
                                  onSelect={() => {
                                    setRejectingBooking(booking);
                                  }}
                                >
                                  Reject Booking
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

      <Dialog open={!!selectedBooking} onOpenChange={setSelectedBooking}>
        <DialogContent className="sm:max-w-[855px] max-h-[85vh] overflow-auto">
          {!!selectedBooking && (
            <BookingForm defaultValue={selectedBooking} />
          )}
        </DialogContent>
      </Dialog>


      <Dialog open={!!rejectingBooking} onOpenChange={setRejectingBooking}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          {!!rejectingBooking && (
            <RejectBookingForm defaultValue={rejectingBooking} refetch={fetchBookingList} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
};

export default Bookings;