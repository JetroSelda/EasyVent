import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner";

const ForgotForm = ({
  className,
  ...props
}) => {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigateSignup = () => {
    navigate("/signup", { state: { redirect: state?.redirect }});
  };

  const updateState = (event, fieldName) => {
    setFormState((prev) => ({ ...prev, [fieldName]: event.target.value }));
  }

  const submitEmail = (event) => {
    event.preventDefault();

    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();

    formData.append("email", formState.email);

    fetch(`${import.meta.env.VITE_API_URL}/users/forgotPassword.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error }) => {
        if (error) {
          return toast(error.title, { description: error.message });
        }

        setIsLoading(false);

        setFormState((prev) => ({ ...prev, ...(data ?? {})}));
      });
  }

  const submitOTP = (event) => {
    event.preventDefault();

    if (formState.code !== formState.confirm_code) {
      return toast("Validation Error", { description: "Incorrect OTP Code." });
    }

    setFormState((prev) => ({ ...prev, confirmed: true }));
  }

  const submitPassword = (event) => {
    event.preventDefault();

    const { new_password, confirm_password } = formState;

    if (new_password !== confirm_password) {
      return toast("Validation Error", { description: "Password did not match." });
    }

    if (isLoading) return;
    setIsLoading(true);

    const formData = new FormData();

    formData.append("id", formState.id);
    formData.append("password", new_password);

    fetch(`${import.meta.env.VITE_API_URL}/users/updatePassword.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        toast(data.title, { description: data.message });
        navigate("/login");
      })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          {!formState.id && (
            <form className="p-6 md:p-8" onSubmit={submitEmail}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Forgot Password</h1>
                  <p className="text-muted-foreground text-balance">
                    Fill in your account email address
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    disabled={isLoading}
                    type="email"
                    placeholder="m@example.com"
                    value={formState.email}
                    required
                    onChange={(event) => updateState(event, "email")}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading && <Spinner />} Submit
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a onClick={navigateSignup} className="cursor-pointer underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          )}

          {formState.id && !formState.confirmed && (
            <form className="p-6 md:p-8" onSubmit={submitOTP}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">OTP Verification</h1>
                  <p className="text-muted-foreground text-balance">
                    Please fill in the OTP sent into {formState.email}:
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirm_code">OTP Code</Label>
                  <Input
                    id="confirm_code"
                    value={formState.confirm_code}
                    required
                    onChange={(event) => updateState(event, "confirm_code")}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  Submit
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a onClick={navigateSignup} className="cursor-pointer underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          )}

          {formState.confirmed && (
            <form className="p-6 md:p-8" onSubmit={submitPassword}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">New Password</h1>
                  <p className="text-muted-foreground text-balance">
                    Fill in your new Password
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="new_password">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={formState.new_password}
                    disabled={isLoading}
                    required
                    onChange={(event) => updateState(event, "new_password")}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={formState.confirm_password}
                    disabled={isLoading}
                    required
                    onChange={(event) => updateState(event, "confirm_password")}
                  />
                </div>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading && <Spinner />} Submit
                </Button>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a onClick={navigateSignup} className="cursor-pointer underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ForgotForm;
