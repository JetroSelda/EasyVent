import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import BannerImage from "@/assets/images/banner.jpg";
import { BadgeCheckIcon, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import BannerImg from "@/assets/images/background.jpg";

const Banner = ({ settingsState = {} }) => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  const navigateSearchPage = () => {
    navigate("/search");
  }

  const navigateCreateAccount = () => {
    navigate("/signup");
  }

  useEffect(() => {
    const user = localStorage.getItem("user-data");

    if (!user) return;

    setUserData(JSON.parse(user ?? ""));
  }, []);

  const BannerUrl = `${import.meta.env.VITE_API_URL}/uploads/${settingsState.landing_bg}`;

  return (
    <div className="p-10 lg:px-[10rem] relative h-[90vh]">
      <div className="absolute top-0 left-0 w-full h-full bg-red-500">
        <img src={BannerImg} className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-0 left-0 bg-black w-full h-full opacity-[0.7]" />

      <div className="flex gap-[5rem] flex-col lg:flex-row h-[100%] w-full z-[1px] relative">
        <div className="flex flex-col w-[100%] lg:w-[50%] pt-20">
        <Badge
          variant="secondary"
          className="mb-3"
        >
          <BadgeCheckIcon size={10} />
          Easy Events
        </Badge>
        
          <p className="font-poppins text-4xl md:text-6xl font-bold text-white">{settingsState.landing_title}</p>

          <p className="font-poppins text-[1.1rem] font-medium my-7 text-white">
            {settingsState.landing_description}
          </p>

          <div className="flex w-[100%] flex-col md:flex-row gap-4 mt-3">
            <Button className="font-bold text-[1.2rem] p-10 py-7 cursor-pointer" onClick={navigateSearchPage}>Search Best Match <Search /></Button>
            {!userData && (
              <Button variant="outline" onClick={navigateCreateAccount} className="font-bold text-[1.2rem] p-10 py-7 cursor-pointer">Create Account <User /> </Button>
            )}
          </div>
        </div>
        <div className="md:flex h-[100%] w-[100%] md:w-[50%] items-center pt-[1rem] pr-[1rem] justify-end hidden">
          <div className="overflow-hidden rounded-3xl h-full w-full">
            <img src={BannerUrl} alt="Banner" className="w-full h-full object-fill" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Banner;