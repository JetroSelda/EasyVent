import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import BannerImage from "@/assets/images/banner.jpg";
import { BadgeCheckIcon, Search, User } from "lucide-react";

const Banner = () => {
  return (
    <div className="p-10 px-[10rem] relative">
      <div className="flex gap-[5rem] h-[100%] z-[1px] relative">
        <div className="flex flex-col w-[50%]">
        <Badge
          variant="secondary"
          className="mb-3"
        >
          <BadgeCheckIcon size={10} />
          Easy Events
        </Badge>
        
          <p className="font-poppins text-6xl font-bold text-[#183B4E]">A small business is only as good as its tools</p>

          <p className="font-poppins text-[1.1rem] font-medium my-7 text-[#24343d]">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>

          <div className="flex w-[100%] gap-4 mt-3">
            <Button className="font-bold text-[1.2rem] p-10 py-7">Search Best Match <Search /></Button>
            <Button variant="outline" className="font-bold text-[1.2rem] p-10 py-7">Create Account <User /> </Button>
          </div>
        </div>
        <div className="flex h-[100%] w-[50%] items-center pt-[1rem] pr-[1rem] justify-end">
          <div className="overflow-hidden rounded-3xl h-full w-[90%]">
            <img src={BannerImage} alt="Banner" className="w-full h-full object-fill" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Banner;