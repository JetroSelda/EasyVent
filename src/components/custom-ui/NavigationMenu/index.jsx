import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";

import Logo from "@/assets/easy-logo.png";
import { NavUser } from "../../ui/nav-user";

const NavigationMenu = ({ isLanding }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const navigateLogin = () => navigate("/login");

  const navigateDashboard = () => navigate("/dashboard/");

  const userData = localStorage.getItem("user-data");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact Us" },
    { href: "/policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ]

  return (
    <div className={`w-[100%] ${isLanding ? "bg-transparent absolute top-0 left-0" : "bg-white shadow-2xs"} flex h-[3.8rem] justify-between items-center-safe px-8 z-[10]`}>
      <div>
        <img src={Logo} className="w-20" />
      </div>

      <div className="flex gap-3">
        <div className={`md:flex gap-2 items-center-safe hidden ${isLanding ? "text-white" : ""}`}>
          <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
          
          <Button variant="ghost" onClick={() => navigate("/about")}>About</Button>
          
          <Button variant="ghost" onClick={() => navigate("/contact")}>Contact Us</Button>
          
          <Button variant="ghost" onClick={() => navigate("/policy")}>Privacy Policy</Button>
          
          <Button variant="ghost" onClick={() => navigate("/terms")}>Terms & Conditions</Button>
        </div>

        {userData && <Notifications isLanding={isLanding} userData={userData} />}

        {!userData && <Button className="bg-[#183B4E] hover:bg-[#2e5e78]" onClick={navigateLogin}>Log In <LogIn /> </Button>}
        {userData && (
          <NavUser user={userData} />
        )}

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div
                    key={link.href}
                    className="px-4 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => navigate(link.href)}
                  >
                    {link.label}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
};

export default NavigationMenu;