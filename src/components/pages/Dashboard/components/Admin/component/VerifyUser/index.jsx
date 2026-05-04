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
import { useMemo, useRef, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DocumentsForm from "../../../../../../custom-ui/ProfileForm/components";
import DateInput from "../../../../../../ui/date";
import Textarea from "../../../../../../ui/textarea";

const VerifyUser = ({ user, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { display_picture, file, personal_name, last_name, email, date_of_birth, bio, contacts = [] } = user || {};

  const verifyUser = async () => {
    const formData = new FormData();

    formData.append("id", user.id);
    await fetch(`${import.meta.env.VITE_API_URL}/users/verify.php`, {
      method: "POST",
      body: formData,
    });

    onSubmit();
  };

  const rejectUser = async () => {
    const formData = new FormData();

    formData.append("id", user.id);
    await fetch(`${import.meta.env.VITE_API_URL}/users/reject.php`, {
      method: "POST",
      body: formData,
    });

    onSubmit();
  };

  return (
    <div className="w-full flex items-start justify-start p-[2rem]">
      <Card className="overflow-hidden w-full md:w-[60%] rounded-md shadow-xs">
        <CardContent className="px-[3rem] py-[0.5rem]">
          <form>
            <div className="flex gap-1 flex-col md:flex-row mb-[2rem]">
              <div className="md:w-[25%]">Profile Photo</div>

              <div className="w-[75%] flex items-center gap-[1rem]">
                <Avatar className="w-[5rem] h-[5rem]">
                  <AvatarImage src={display_picture ? `${import.meta.env.VITE_API_URL}/uploads/${display_picture}` : "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
              <div className="md:w-[25%]">Full Name</div>

              <div className="md:w-[75%] flex items-center gap-[1rem]">
                <Input
                  value={personal_name}
                  type="text"
                  placeholder="Personal Name"
                  required
                  readOnly
                />
                <Input
                  value={last_name}
                  type="text"
                  placeholder="Last Name"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
              <div className="md:w-[25%]">Email</div>

              <div className="md:w-[75%] flex items-center gap-[1rem]">
                <Input
                  value={email}
                  type="email"
                  placeholder="Email Address"
                  required
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-[1.5rem]">
              <div className="md:w-[25%] pt-[0.5rem]">Contacts</div>

              <div className="md:w-[75%] flex flex-col gap-[0.25rem]">
                {contacts.map((contact, index) => (
                  <div className="flex mb-2" key={index}>
                    <Input
                      value={contact.value} type="text" className="rounded-r-none" />

                    <Select value={contact.type}>
                      <SelectTrigger disabled className="w-[180px] rounded-l-none border-l-0">
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
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
              <div className="md:w-[25%]">Date of Birth</div>

              <div className="md:w-[75%] flex items-center gap-[1rem]">
                <DateInput readOnly defaultValue={date_of_birth && date_of_birth !== "0000-00-00" ? date_of_birth : ""} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row mb-[1.5rem] md:items-center">
              <div className="md:w-[25%]">Automated Message</div>

              <div className="md:w-[75%] flex items-center gap-[1rem]">
                <Textarea value={bio} />
              </div>
            </div>

            <DocumentsForm documents={user.documents} readOnly />

            <div className="flex justify-end gap-3">
              <Button disabled={isLoading} type="button" onClick={verifyUser} className="bg-[#183B4E] hover:bg-[#2e5e78]">Verify</Button>
              <Button disabled={isLoading} variant="destructive" onClick={rejectUser} type="button">Reject</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )  
};

export default VerifyUser;