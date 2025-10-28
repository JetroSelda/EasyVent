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
import { Circle, Ellipsis, HandCoins, Mail, PhilippinePeso, Phone, Smartphone, Star, Timer, Users } from "lucide-react";
import { formatCurrency, formatCurrencyWithoutSymbol, formatDate } from "../../../../../../../api/util";

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
} from "@/components/ui/popover";


import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

import BDOLOGO from "@/assets/images/bdo_logo.png";
import BPILOGO from "@/assets/images/bpi_logo.png";
import GCASHLOGO from "@/assets/images/gcash_logo.png";
import LANDBANKLOGO from "@/assets/images/landbank_logo.png";
import { toast } from "sonner";

const PAYMENTS_LOGO = {
  BDO: BDOLOGO,
  BPI: BPILOGO,
  GCASH: GCASHLOGO,
  LANDBANK: LANDBANKLOGO,
}

const CONTACT_ICONS = {
  Landline: Phone,
  Mobile: Smartphone,
};

const FeedbackForm = ({ defaultValue = {} }) => {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { rating = 0, comment } = formState;

  const updateRating = (rate) => setFormState((prev) => ({ ...prev, rating: rate }));

  const updateComment = (com) => setFormState((prev) => ({ ...prev, comment: com }));

  const initiateData = () => {
    const formData = new FormData();
    formData.append("bookingId", defaultValue.id);

    fetch(`${import.meta.env.VITE_API_URL}/booking/getComment.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setFormState(data?.comment ?? {});
      })
  };

  const createFeedback = () => {
    if (isLoading) return;
    setIsLoading(true);

    const userData = localStorage.getItem("user-data");
    const parsedUser = JSON.parse(userData);

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating);
    formData.append("serviceId", defaultValue.id_service);
    formData.append("bookingId", defaultValue.id);
    formData.append("userId", parsedUser.id);
    

    fetch(`${import.meta.env.VITE_API_URL}/booking/createComment.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
        initiateData();
      })
  }

  const updateFeedback = () => {
    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("rating", rating);
    formData.append("id", formState.id);
    

    fetch(`${import.meta.env.VITE_API_URL}/booking/updateComment.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
        initiateData();
      })
  };

  useEffect(() => {
    initiateData();
  }, [defaultValue])

  console.log("Default Value Feedback", defaultValue)

  const handleSubmit = () => {
    if (formState.id) return updateFeedback();
    return createFeedback();
  };
  return (
    <div className="grid gap-3 py-3">
      <Label className="text-lg pb-0">Comment</Label>

      <div className="flex gap-2 text-[#ffb86a] cursor-pointer">
        <Star onClick={() => updateRating(1)}fill={rating > 0 ? "#ffb86a" : "transparent"} />
        <Star onClick={() => updateRating(2)}fill={rating > 1 ? "#ffb86a" : "transparent"} />
        <Star onClick={() => updateRating(3)}fill={rating > 2 ? "#ffb86a" : "transparent"} />
        <Star onClick={() => updateRating(4)}fill={rating > 3 ? "#ffb86a" : "transparent"} />
        <Star onClick={() => updateRating(5)}fill={rating > 4 ? "#ffb86a" : "transparent"} />
      </div>

      <Textarea value={comment} onChange={(event) => updateComment(event.target.value)} />

      <Button type="button" disabled={isLoading} onClick={handleSubmit}>
        {isLoading && <Spinner />} Save Comment
      </Button>
    </div>
  )
};

const BookingForm = ({ defaultValue = {} }) => {
  const { property_name, email, contacts = [], package_item: packageItem, status, reason } = defaultValue;
  const displayPicture = `${import.meta.env.VITE_API_URL}/uploads/${defaultValue.display_picture}`;

  return (
    <form>
      <DialogHeader>
        <DialogTitle>My Booking</DialogTitle>
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
                     {property_name}
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

            {defaultValue.status !== "Pending" && <FeedbackForm defaultValue={defaultValue} />}
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

const PaymentForm = ({ defaultValue, toggle }) => {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const currState = {
    ...defaultValue,
    ...formState,
  }

  const methods = JSON.parse(defaultValue.payment_methods ?? "[]");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (isLoading) return;
    setIsLoading(true);

    let receiptUrl = "";

    if (currState.receipt) {
      const documentForm = new FormData();

      documentForm.append("files[]", currState.receipt)

      const res = await fetch(`${import.meta.env.VITE_API_URL}/services/upload_documents.php`, {
        method: 'POST',
        body: documentForm,
      });

      const json = await res.json();

      if (json.files)  {
        receiptUrl = json.files[0];
      }
    }

    const formData = new FormData();
    const userData = localStorage.getItem("user-data");
    const parsed = JSON.parse(userData);

    formData.append("bookingId", defaultValue.id);
    formData.append("userId", parsed.id);
    formData.append("paymentReceipt", JSON.stringify(receiptUrl));
    formData.append("paymentMethod", JSON.stringify(currState.selected_method));

    fetch(`${import.meta.env.VITE_API_URL}/booking/createPayment.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast(data.title, {description: data.message});
        toggle();
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Payment</DialogTitle>
        <DialogDescription>{currState.selected_method ? "Please make a payment and upload the receipt." : "Please select payment method"}</DialogDescription>
      </DialogHeader>
      
      {!currState.selected_method && (
        <div className="grid gap-3 pt-5">
          {methods.map((payment, index) => (
            <Card className="py-2" onClick={() => {
              setFormState((prev) => ({ ...prev, selected_method: payment }))
            }}>
              <CardContent className="px-3">
                <div className="flex mb-2 items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={payment.type !== "LANDBANK" ? "h-[3rem]" : "h-[1.5rem] mt-[0.5rem] mb-[0.5rem]"}>
                      <img src={PAYMENTS_LOGO[payment.type]} className="w-full h-full" />
                    </div>
                  </div>
                </div>

                <div className="grid mb-2 px-2">
                  <p className="font-semibold">
                    Account Name
                  </p>

                  <div className="text-gray-500">{payment.account_name}</div>
                </div>

                <div className="grid mb-2 px-2">
                  <p className="font-semibold">
                    Account Number
                  </p>

                  <div className="text-gray-500">{payment.account_number}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!!currState.selected_method && (
        <div className="grid gap-3 pt-5">
          <Input type="file" required onChange={(event) => setFormState((prev) => ({ ...prev, receipt: event.target.files[0] }))} />

          <Card className="py-2">
            <CardContent className="px-3">
              <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={currState.selected_method.type !== "LANDBANK" ? "h-[3rem]" : "h-[1.5rem] mt-[0.5rem] mb-[0.5rem]"}>
                    <img src={PAYMENTS_LOGO[currState.selected_method.type]} className="w-full h-full" />
                  </div>
                </div>
              </div>

              <div className="grid mb-2 px-2">
                <p className="font-semibold">
                  Account Name
                </p>

                <div className="text-gray-500">{currState.selected_method.account_name}</div>
              </div>

              <div className="grid mb-2 px-2">
                <p className="font-semibold">
                  Account Number
                </p>

                <div className="text-gray-500">{currState.selected_method.account_number}</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={() => setFormState((prev) => ({ ...prev, selected_method: null }))}>Back</Button>
            <Button disabled={isLoading}>{isLoading && <Spinner />} Submit Payment</Button>
          </div>
        </div>
      )}
    </form>
  )
};

const BookingTable = ({ bookingList = [], refresh }) => {
  const [paymentState, setPaymentState] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  return (
    <Card className="p-0 rounded-md">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-400">
              <TableHead className="w-[150px] px-5 py-3 text-gray-500">Record ID</TableHead>
              <TableHead className="w-[200px] text-gray-500">Service</TableHead>
              <TableHead className="text-gray-500">Package</TableHead>
              <TableHead className="text-gray-500">Price</TableHead>
              <TableHead className="text-gray-500">Date</TableHead>
              <TableHead className="px-5 py-3 text-gray-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingList.map((service) => (
              <TableRow key={service.invoice}>
                <TableCell className="font-medium px-5 py-2">Booking{service.id.toString().padStart(4, "0")}</TableCell>
                <TableCell>
                  <div className="w-[90%] overflow-hidden text-ellipsis">
                    {service.property_name}
                  </div>
                </TableCell>
                <TableCell>{service.package_item?.package_name}</TableCell>
                <TableCell>{formatCurrency(service.package_item?.price)}</TableCell>
                <TableCell>{formatDate(service.schedule)}</TableCell>
                <TableCell className="px-5 py-2 w-[20rem]">
                  <div className="flex items-center">
                    <span className="mr-auto">{service.status}</span>


                    {service.status === "Confirmed" && (
                      <Button variant="outline" className="mr-4" onClick={() => setPaymentState(service)}><HandCoins /> Pay Booking</Button>
                    )}

                    <Popover align="right">
                      <PopoverTrigger asChild>
                        <Button variant="icon"><Ellipsis /></Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[150px] p-0"  side="bottom" align="end">
                        <Command>
                          <CommandList>
                            <CommandGroup>

                              <CommandItem
                                onSelect={() => setSelectedBooking(service)}
                              >
                                Open Booking
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

      <Dialog open={!!paymentState} onOpenChange={setPaymentState}>
        <DialogContent className="sm:max-w-[505px] max-h-[85vh] overflow-auto">
          {!!paymentState && (
            <PaymentForm toggle={() => {
              setPaymentState(null);
              refresh();
            }} defaultValue={paymentState} />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedBooking} onOpenChange={setSelectedBooking}>
        <DialogContent className="sm:max-w-[855px] max-h-[85vh] overflow-auto">
          {!!selectedBooking && (
            <BookingForm defaultValue={selectedBooking} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default BookingTable;