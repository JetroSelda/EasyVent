import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react";

import { toast } from "sonner"
import { useNavigate } from "react-router-dom";

const ProviderForm = () => {
  const [userState, setUserState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password, confirm_password } = userState;

  const updateUser = (event, fieldName) => {
    const { value } = event.target;

    setUserState((prev) => ({ ...prev, [fieldName]: value }));
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

    form.append("email", email);
    form.append("password", password);
    form.append("role", "Provider");

    fetch(`${import.meta.env.VITE_API_URL}/users/create.php`, {
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

          navigate("/signup/profile", { state: { id, email, role: "Provider" }})
        }
      });
  }

  return (
    <form className="p-6 md:p-8" onSubmit={onSubmit}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Get Started as Provider!</h1>
          <p className="text-muted-foreground text-balance">
            Create account to list your services
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            onChange={(event) => updateUser(event, "email")}
            required
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
  )
};

export default ProviderForm;