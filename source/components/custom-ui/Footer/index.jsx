import { Button } from "@/components/ui/button";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { Circle, Copyright, Facebook, Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <div className="bg-[#183B4E] text-white mt-[3rem] p-[2rem] px-5 md:px-[10rem]">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Support</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Help Center</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Manage Bookings</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Contact Support</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Bookings FAQs</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">COVID-19 & Safety Guidelines</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Discover</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Browse Event Venues</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Restaurants for Events</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Hotels with Events Halls</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Planning Tips</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Popular Cities</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Featured Venues</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Wedding Packages</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Corporate Events</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Terms & Policies</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Privacy Policy</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Terms & Conditions</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Cookie Settings</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Cancellation Policy</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Accessibility Statement</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">User Aggreement</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Partners</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Vendor Login</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Partner With Us (List Your Venue)</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Vendor Support</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Become an Affiliate</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">About</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">About</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">How It Works</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Sustainability</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Careers</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Contact Us</Button>
        </div>
      </div>

      <p className="border-b-1 py-3 mt-5 flex gap-3 items-center">
        <Circle fill="white" size={14} /> English (US) | PH
      </p>

      <p className="text-center pt-10 flex flex-col md:flex-row items-center gap-2 w-full justify-center">
        Copyright &#169; 2025 Easyvent. All rights reserved. <span className="flex gap-5"><Facebook size={18} /> <Instagram size={18} /> </span>
      </p>
    </div>
  );
};

export default FooterSection;