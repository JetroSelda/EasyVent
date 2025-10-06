import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import DateInput from "../../ui/date";
import Textarea from "../../ui/textarea";
import { useMemo, useRef, useState } from "react";
import { formatISODate } from "../../../api/util";

const ProfileForm = ({ isCreating, defaultValues = {}, onSubmit, isLoading }) => {
  const [profileState, setProfileState] = useState(defaultValues);

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
    if (onSubmit) onSubmit(profileState);
  }

  console.log("Image data", fileImage ? fileImage : display_picture ? `${import.meta.env.VITE_API_URL}/uploads/${display_picture}` : "https://github.com/shadcn.png");

  
  return (
    <Card className="overflow-hidden w-[60%] rounded-md shadow-xs">
      <CardContent className="px-[3rem] py-[0.5rem]">
        {isCreating && <div className="font-title mb-[0.5rem] font-bold text-[1.5rem]">Profile</div>}
        {isCreating && <p className="mb-[3rem] text-gray-500">Finish setting up your profile name, contacts and other details to continue.</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex mb-[2rem]">
            <div className="w-[25%]">Profile Photo</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
              <Avatar className="w-[5rem] h-[5rem]">
                <AvatarImage src={fileImage ? fileImage : display_picture ? `${import.meta.env.VITE_API_URL}/uploads/${display_picture}` : "https://github.com/shadcn.png"} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <input accept=".png, .jpg, .jpeg" onChange={handlePhotoChange} ref={fileRef} type="file" className="hidden" id="display_picture" />

              <Label htmlFor="display_picture">
                <Button type="button" variant="outline" onClick={() => fileRef.current.click()}>
                  <Upload /> Upload photo
                </Button>
              </Label>
            </div>
          </div>

          <div className="flex mb-[1.5rem] items-center">
            <div className="w-[25%]">Full Name</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
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

          <div className="flex mb-[1.5rem] items-center">
            <div className="w-[25%]">Email</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
              <Input
                value={email}
                onChange={(event) => updateField(event.target.value, "email")}
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div className="flex mb-[1.5rem]">
            <div className="w-[25%] pt-[0.5rem]">Contacts</div>

            <div className="w-[75%] flex flex-col gap-[0.25rem]">
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

          <div className="flex mb-[1.5rem] items-center">
            <div className="w-[25%]">Date of Birth</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
              <DateInput defaultValue={date_of_birth} onChange={(updatedValue) => {
                const formatted = formatISODate(updatedValue);

                updateField(formatted, "date_of_birth");
              }} />
            </div>
          </div>

          

          <div className="flex mb-[1.5rem] pt-[0.5rem]">
            <div className="w-[25%]">BIO</div>

            <div className="w-[75%] flex items-center gap-[1rem]">
              <Textarea onChange={(event) => updateField(event.target.value, "bio")} value={bio} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit" className="bg-[#183B4E] hover:bg-[#2e5e78]">Save Changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
};

export default ProfileForm;