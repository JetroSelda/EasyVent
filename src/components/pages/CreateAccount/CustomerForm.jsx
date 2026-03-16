
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { toast } from "sonner"
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CustomerForm = () => {
  const { state = {} } = useLocation();
  const [userState, setUserState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [isOTPForm, setIsOTPForm] = useState(false);

  const [correctOTP, setCorrectOTP] = useState("");

  const navigate = useNavigate();

  const { email, password, confirm_password, otp_code } = userState;

  const updateUser = (event, fieldName) => {
    const { value } = event.target;

    setUserState((prev) => ({ ...prev, [fieldName]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (otp_code !== correctOTP) {
      // Throw Error
      toast("Validation Error", {
        description: "Invalid OTP code.",
      })
      return;
    }

    setIsLoading(true);

    const form = new FormData();

    form.append("email", email);
    form.append("password", password);
    form.append("role", "Customer");

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
          })
        }

        if (data) {
          const { id } = data;

          navigate("/signup/profile", { state: { id, email, redirect: state?.redirect, role: "Customer" }});
        }
      });
  }

  const initOTPForm = async (event) => {
    event.preventDefault();

    if (password !== confirm_password) {
      // Throw Error
      toast("Validation Error", {
        description: "Password did not match.",
      })
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/otp.php`, {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    const otp = json.data.code;

    setCorrectOTP(otp);
    setIsOTPForm(true);
  }

  if (isOTPForm) {
    return (
      <form className="p-6 md:p-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">We have sent an OTP!</h1>
            <p className="text-muted-foreground text-balance">
              Please confirm you email address by providing the OTP code we send into your email.
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="otp__code">OTP Code</Label>
            <Input
              id="otp__code"
              type="text"
              key="otp_code"
              onChange={(event) => updateUser(event, "otp_code")}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            Create Account
          </Button>
        </div>
      </form>
    )
  }

  return (
    <form className="p-6 md:p-8" onSubmit={initOTPForm}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Get Started as Customer!</h1>
          <p className="text-muted-foreground text-balance">
            Create account to start booking
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            key="email"
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
            minLength={8}
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
            minLength={8}
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

export default CustomerForm;