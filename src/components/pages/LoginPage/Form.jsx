import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"

const LoginForm = ({
  className,
  ...props
}) => {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState({});

  const navigateSignup = () => {
    navigate("/signup", { state: { redirect: state?.redirect }});
  };

  const updateLoginState = (event, fieldName) => {
    setLoginState((prev) => ({ ...prev, [fieldName]: event.target.value }));
  }

  const handleLogin = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("email", loginState.email);
    formData.append("password", loginState.password);

    fetch(`${import.meta.env.VITE_API_URL}/users/login.php`, {
      cache: "no-store",
      headers: {
        "Authorization": "Ok"
      },
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error } = {}) => {
        if (error) {
          toast(error.title, {
            description: error.message,
          });
          return;
        }

        if (data) {
          const parsedData = {
            ...data,
            contacts: JSON.parse(data.contacts ?? "[]"),
            payments: JSON.parse(data.payments ?? "[]"),
          };

          if (data.status === "Pending") return navigate("/listing", { state: { id_user: data.id } });
          if (data.status === "Verification") return navigate("/verification");

          const todayDate = new Date();
          todayDate.setDate(todayDate.getDate() + 1);

          const tomorrow = todayDate.getTime();

          localStorage.setItem("user-data", JSON.stringify({ ...parsedData, expiration: tomorrow }));
          const { personal_name, last_name } = data;

          if (!personal_name && !last_name) {

            navigate("/signup/profile", { state: { id: data.id, email: data.email, redirect: state?.redirect } });
            return;
          }

          if (state && state.redirect) {
            navigate(state.redirect.page, { state: state.redirect.state });
            return;
          }

          navigate("/dashboard");
        }
      })
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form className="p-6 md:p-8" onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your EasyVent account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(event) => updateLoginState(event, "email")}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/forgot"

                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(event) => updateLoginState(event, "password")}
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a onClick={navigateSignup} className="cursor-pointer underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

export default LoginForm;
