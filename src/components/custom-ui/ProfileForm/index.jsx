import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CircleAlert, CirclePlus, Download, Ellipsis, Trash, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DateInput from "../../ui/date";
import Textarea from "../../ui/textarea";
import { useMemo, useRef, useState } from "react";
import { formatISODate } from "../../../api/util";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BDOLOGO from "@/assets/images/bdo_logo.png";
import BPILOGO from "@/assets/images/bpi_logo.png";
import GCASHLOGO from "@/assets/images/gcash_logo.png";
import LANDBANKLOGO from "@/assets/images/landbank_logo.png";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DocumentsForm from "./components";

const PAYMENT_TYPES = [
  { label: "BDO", value: "BDO" },
  { label: "BPI", value: "BPI" },
  { label: "GCASH", value: "GCASH" },
  { label: "LANDBANK", value: "LANDBANK" },
];

const PAYMENTS_LOGO = {
  BDO: BDOLOGO,
  BPI: BPILOGO,
  GCASH: GCASHLOGO,
  LANDBANK: LANDBANKLOGO,
}

const PaymentForm = ({ payment, onSubmit }) => {
  const [formState, setFormState] = useState({});

  const currState = {
    ...payment,
    ...formState,
  };

  const { account_name, account_number } = currState;

  const handleChange = (value, fieldName) => {
    setFormState((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onSubmit(currState);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>New {currState.type} Account</DialogTitle>
        <DialogDescription>
          Please fill in your account details
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <div className="grid gap-2">
          <Label>Account Name</Label>
          <Input value={account_name} onChange={(event) => handleChange(event.target.value, "account_name")} required />
        </div>
        <div className="grid gap-2">
          <Label>Account Number</Label>
          <Input value={account_number} onChange={(event) => handleChange(event.target.value, "account_number")} required />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="bg-[#183B4E] hover:bg-[#2e5e78]">Save Payment</Button>
      </DialogFooter>
    </form>
  )
}

const PaymentsForm = ({ payments = [], onChange }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleUpdate = (payment) => {
    setSelectedPayment(null);
    if (typeof payment.index === "number") {
      const copy = [...payments];

      copy.splice(payment.index, 1, {
        type: payment.type,
        account_name: payment.account_name,
        account_number: payment.account_number,
      });

      return onChange(copy);
    }

    console.log("New Payment", payment);

    return onChange([...payments, payment]);
  };

  const handleRemove = (index) => {
    const copy = [...payments];
    copy.splice(index, 1);

    onChange(copy);
  };
  return (
    <div className="flex flex-col md:flex-row mb-[1.5rem]">
      <div className="md:w-[25%] pt-[0.5rem]">Payment Channels</div>

      <div className="md:w-[75%] flex flex-col gap-[0.25rem]">
        {payments.map((payment, index) => (
          <Card className="md:w-[80%] py-2" onClick={() => setSelectedPayment({ index, ...payment })}>
            <CardContent className="px-3">
              <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={payment.type !== "LANDBANK" ? "h-[3rem]" : "h-[1.5rem] mt-[0.5rem] mb-[0.5rem]"}>
                    <img src={PAYMENTS_LOGO[payment.type]} className="w-full h-full" />
                  </div>
                </div>

                <Button onClick={(event) => {
                  event.stopPropagation();
                  handleRemove(index);
                }} type="button" variant="ghost"><Trash /></Button>
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

        <Popover align="right">
          <PopoverTrigger asChild>
            <Button
              type="button"
              className="w-fit text-blue-600"
              variant="link"
            >
              <CirclePlus /> Add Payment Channel
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-[120px] p-0">
            <Command>
              <CommandList>
                <CommandGroup>

                  {PAYMENT_TYPES.map((item) => (
                    <CommandItem
                      onSelect={() => {
                        setSelectedPayment({ type: item.value });
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}

                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        
      </div>

      <Dialog open={!!selectedPayment} onOpenChange={setSelectedPayment}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          {!!selectedPayment && (
            <PaymentForm payment={selectedPayment} onSubmit={handleUpdate} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

const ProfileForm = ({ isProvider, isCustomer, isCreating, defaultValues = {}, onSubmit, isLoading, downloadTransaction }) => {
  const [profileState, setProfileState] = useState(defaultValues);
  const navigate = useNavigate();

  const fileRef = useRef();

  const { display_picture, file, personal_name, last_name, email, date_of_birth, bio, contacts = [] } = profileState;

  const updateField = (updatedValue, fieldName) => {
    setProfileState((prev) => ({ ...prev, [fieldName]: updatedValue}))
  }

  const handlePhotoChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    updateField(file, "file");
  }

  const addContact = () => {
    const updated = [...contacts, { type: "", value: "" }];

    updateField(updated, "contacts");
  }

  const removeContact = (index) => {
    const updated = contacts.filter((contact, currIndex) => currIndex !== index);

    updateField(updated, "contacts");
  }

  const updateContact = (updatedValue, fieldName, index) => {
    const updated = contacts.map((contact, currIndex) => {
      if (index !== currIndex) return contact;

      return { ...contact, [fieldName]: updatedValue };
    });

    updateField(updated, "contacts");
  }

  console.log("File", file);

  const fileImage = (file && typeof file === "object" && file.name) ? URL.createObjectURL(file) : undefined;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return toast("Validation Error", { description: "Please provide atleast 1 contact details." });
    }

    if (!date_of_birth) {
      return toast("Validation Error", { description: "Missing Date of Birth" });
    }

    if (isProvider && (!Array.isArray(profileState.payments) || profileState.payments.length === 0)) {
      return toast("Validation Error", { description: "Please provide atleast 1 payment method details." });
    }
    if (onSubmit) onSubmit(profileState);
  }

  const handleDeactivate = async () => {
    const formData = new FormData();
    formData.append("userId", profileState.id);
    const request = await fetch(`${import.meta.env.VITE_API_URL}/services/allBookings.php`, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    const { data } = response;
    const bookings = data?.bookings ?? [];

    const confirmBookings = bookings.filter((item) => item.status === "Confirmed");

    // if (confirmBookings.length) {
    //   toast("Can't Proceed!", { description: "There are still ongoing bookings remaining in your services!" });
    //   return;
    // }

    await fetch(`${import.meta.env.VITE_API_URL}/users/deactivate.php`, {
      method: "POST",
      body: formData,
    });

    localStorage.removeItem("user-data");
    navigate("/login");
  }

  return (
    <Card className="overflow-hidden w-full md:w-[60%] rounded-md shadow-xs">
      <CardContent className="px-[3rem] py-[0.5rem]">
        {isCreating && <div className="font-title mb-[0.5rem] font-bold text-[1.5rem]">Profile</div>}
        {isCreating && <p className="mb-[3rem] text-gray-500">Finish setting up your profile name, contacts and other details to continue.</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex gap-1 flex-col md:flex-row mb-[2rem]">
            <div className="md:w-[25%]">Profile Photo</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
              <Avatar className="w-[5rem] h-[5rem]">
                <AvatarImage src={fileImage ? fileImage : display_picture ? `${import.meta.env.VITE_API_URL}/uploads/${display_picture}` : "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <input accept=".png, .jpg, .jpeg" onChange={handlePhotoChange} ref={fileRef} type="file" className="hidden" id="display_picture" />

              <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                <Label htmlFor="display_picture">
                  <Button type="button" variant="outline" onClick={() => fileRef.current.click()}>
                    <Upload /> Upload photo
                  </Button>
                </Label>
              </div>

              {!isCreating && (
                <div className="flex flex-col md:flex-row gap-3 md:gap-0">
                  <Label htmlFor="display_picture">
                    <Button type="button" variant="destructive" onClick={handleDeactivate}>
                      <CircleAlert /> Deactivate Account
                    </Button>
                  </Label>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
            <div className="md:w-[25%]">Full Name</div>

            <div className="md:w-[75%] flex items-center gap-[1rem]">
              <Input
                value={personal_name}
                onChange={(event) => updateField(event.target.value, "personal_name")}
                type="text"
                placeholder="Personal Name"
                required
              />
              <Input
                value={last_name}
                onChange={(event) => updateField(event.target.value, "last_name")}
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
            <div className="md:w-[25%]">Email</div>

            <div className="md:w-[75%] flex items-center gap-[1rem]">
              <Input
                value={email}
                onChange={(event) => updateField(event.target.value, "email")}
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-[1.5rem]">
            <div className="md:w-[25%] pt-[0.5rem]">Contacts</div>

            <div className="md:w-[75%] flex flex-col gap-[0.25rem]">
              {contacts.map((contact, index) => (
                <div className="flex mb-2" key={index}>
                  <Input
                    value={contact.value} onChange={(event) => updateContact(event.target.value, "value", index)} type="text" className="rounded-r-none" />

                  <Select value={contact.type} onValueChange={(updatedValue) => updateContact(updatedValue, "type", index)}>
                    <SelectTrigger className="w-[180px] rounded-l-none border-l-0">
                      <SelectValue placeholder="Contact Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                        <SelectItem value="Landline">Landline</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="icon" onClick={() => removeContact(index)}><Trash /></Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={addContact}
                className="w-fit text-blue-600"
                variant="link"
              >
                <CirclePlus /> Add Contact
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
            <div className="md:w-[25%]">Date of Birth</div>

            <div className="md:w-[75%] flex items-center gap-[1rem]">
              <DateInput defaultValue={date_of_birth && date_of_birth !== "0000-00-00" ? date_of_birth : ""} onChange={(updatedValue) => {
                const formatted = formatISODate(updatedValue);

                updateField(formatted, "date_of_birth");
              }} />
            </div>
          </div>

          {isProvider && (
            <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
              <div className="md:w-[25%]">Automated Message</div>

              <div className="md:w-[75%] flex items-center gap-[1rem]">
                <Textarea value={bio} onChange={(e) => updateField(e.target.value, "bio")} />
              </div>
            </div>
          )}

          {isProvider && (
            <PaymentsForm payments={profileState.payments} onChange={(value) => updateField(value, "payments")} />
          )}

          {isProvider && (
            <DocumentsForm documents={profileState.documents} onChange={(value) => updateField(value, "documents")} />
          )}

          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit" className="bg-[#183B4E] hover:bg-[#2e5e78]">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
};

export default ProfileForm;