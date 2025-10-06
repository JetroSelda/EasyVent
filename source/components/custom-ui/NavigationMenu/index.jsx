import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
  const navigate = useNavigate();

  const navigateLogin = () => navigate("/login");

  const navigateDashboard = () => navigate("/dashboard/");

  const userData = localStorage.getItem("user-data");

  return (
    <div className="w-[100%] flex h-[3.8rem] shadow-2xs bg-white justify-between items-center-safe px-8 sticky z-[10] top-[0px]">
      <div></div>

      <div className="flex gap-3">
        <div className="md:flex gap-2 items-center-safe hidden">
          <Button variant="ghost" onClick={() => navigate("/")}>Home</Button>
          
          <Button variant="ghost">About</Button>
          
          <Button variant="ghost">Contact</Button>
          
          <Button variant="ghost">Business</Button>
          
          <Button variant="ghost">Privacy Policy</Button>
          
          <Button variant="ghost">Terms & Conditions</Button>
          
          <Button variant="ghost">Help & Support</Button>
        </div>

        {!userData && <Button className="bg-[#183B4E] hover:bg-[#2e5e78]" onClick={navigateLogin}>Log In <LogIn /> </Button>}
        {userData && <Button className="bg-[#183B4E] hover:bg-[#2e5e78]" onClick={navigateDashboard}>Dashboard </Button>}
      </div>
    </div>
  )
};

export default NavigationMenu;