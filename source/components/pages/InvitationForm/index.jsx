import NavigationMenu from "../../custom-ui/NavigationMenu";
import Footer from "../../custom-ui/Footer";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

const InvitationForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState();

  const { email, password, confirm_password } = formState ?? {};

  const updateUser = (event, fieldName) => {
    const { value } = event.target;

    setFormState((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== confirm_password) {
      // Throw Error
      toast("Validation Error", {
        description: "Password did not match.",
      })
      return;
    }

    setIsLoading(true);

    const form = new FormData();

    form.append("id", formState.id)
    form.append("password", password);

    fetch(`${import.meta.env.VITE_API_URL}/users/createAdmin.php`, {
      method: "POST",
      body: form,
    })
      .then((response) => {
        return response.json();
      })
      .then(({ data, error } = {}) => {
        if (error) {
          toast(error.title, {
            description: error.message,
          });

          return;
        }

        if (data) {
          const { id } = data;

          navigate("/signup/profile", { state: { id, email, role: formState.role }})
        }
      })
      .catch((error) => toast("Something went wrong!", { description: error.message }))
  }

  const handleError = (error) => {
    toast("Invitation Error", { description: error.message });
    navigate("/");
  }

  const initiateInvitation = () => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");

    if (!ref) {
      return navigate("/");
    }

    const formData = new FormData();
    formData.append("reference", ref);

    fetch(`${import.meta.env.VITE_API_URL}/users/invitation.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error }) => {
        if (error) {
          handleError(error);
          return;
        }

        setFormState(data.invitation);

      })
      .catch(handleError);
  }

  useEffect(() => {
    initiateInvitation();
  }, []);

  if (!formState) return

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-1xl">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-1">
                <form className="p-6 md:p-8" onSubmit={onSubmit}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center text-center">
                      <h1 className="text-2xl font-bold">Welcome to EasyVent!</h1>
                      <p className="text-muted-foreground text-balance">
                        You have been invited to be part of the EasyVent Team Management.
                      </p>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        value={formState.email}
                        required
                        readOnly
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        onChange={(event) => updateUser(event, "password")}
                        required
                      />
                    </div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <Label htmlFor="confirm_password">Confirm Password</Label>
                      </div>
                      <Input
                        id="confirm_password"
                        type="password"
                        onChange={(event) => updateUser(event, "confirm_password")}
                        required
                      />
                    </div>
            
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
              By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
              and <a href="#">Privacy Policy</a>.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default InvitationForm;
