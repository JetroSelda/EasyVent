import { useEffect, useState } from "react";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import FooterSection from "../../custom-ui/Footer";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextEditor from "../../custom-ui/TextEditor";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Save } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsloading] = useState(false);

  const { personal_name, last_name, email, title, description } = formState;

  const handleChange = (value, fieldName) => {
    setFormState((prev) => ({ ...prev, [fieldName]: value}));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLoading) return;
    setIsloading(true);

    const formData = new FormData();
    formData.append("name", [personal_name, last_name].join(" "));
    formData.append("email", email);
    formData.append("title", title);
    formData.append("description", description);

    fetch(`${import.meta.env.VITE_API_URL}/settings/sendFeedback.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast(data.title, { description: data.message });
        setIsloading(false);
        setFormState({});
      })
  }

  console.log("Curr State", formState)

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />

      <div className="px-[15rem] pt-[3rem]">
        <div className="flex">
          <div className="w-[40%]">
            <p className="font-title font-bold mb-[1rem] text-[1.5rem]">Contact Our Team</p>

            <p className="text-[1.3rem] mb-5">
              Have a question or just want to say hello? Fill out the form below to send us a message — we’re always here to help.
            </p>

            <p className="text-[1.3rem] mb-5">
              Just enter your name, email address, and a brief message about what you need, and we’ll get back to you as soon as possible.
            </p>

            <p className="text-[1.3rem]">
              Whether it’s feedback, support, or anything in between, your voice matters — we look forward to hearing from you!
            </p>
          </div>

          <div className="w-[60%] pl-[5rem]">
            <Card className="py-6 shadow-sm">
              <CardContent>
                <p className="font-title font-bold mb-[1rem] text-[1.5rem]">Feedback Form</p>

                <form className="grid gap-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-5">
                    <div className="grid gap-2">
                      <Label>Personal Name</Label>
                      <Input disabled={isLoading} value={personal_name} onChange={(event) => handleChange(event.target.value, "personal_name")} required />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label>Last Name</Label>
                      <Input disabled={isLoading} value={last_name} onChange={(event) => handleChange(event.target.value, "last_name")} required />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Email Address</Label>
                    <Input disabled={isLoading} value={email} onChange={(event) => handleChange(event.target.value, "email")} required type="email" />
                  </div>

                  <div className="grid gap-2">
                    <Label>Title</Label>
                    <Input disabled={isLoading} value={title} onChange={(event) => handleChange(event.target.value, "title")} required />
                  </div>

                  <div className="grid gap-2 mb-5">
                    <Label>Description</Label>
                    <TextEditor disabled={isLoading} onChange={(value) => handleChange(value, "description")} defaultValue={description} />
                  </div>

                  <Button disabled={isLoading}>{isLoading ? <Spinner /> : <Save />} Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FooterSection />
    </div>
  );
};

export default ContactPage;