import EventTabs from "../EventTabs";

import { Button } from "@/components/ui/button";
import Slider from "../Slider";
import { Banknote, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


const Events = ({ services = [] }) => {
  const [selectedTab, setSelectedTab] = useState("");
  const [sortBy, setSortBy] = useState("");

  const handleSort = (list, methodBy) => {
    if (!methodBy) return list;

    if (methodBy === "price") {
      const copy = [...list];

      copy.sort((a, b) => Number(a.lowestPrice) - Number(b.lowestPrice));

      return copy;
    }

    if (methodBy === "rate") {
      const copy = [...list];

      copy.sort((a, b) => Number(a.rate) - Number(b.rate));

      return copy;

    }
  }

  const { hotels = [], restaurants = [], functionHalls = [], indProviders = [] } = useMemo(() => {
    const hotelServc = [];
    const restServc = [];
    const funcServc = [];
    const indProviderServc = [];

    services.forEach((service) => {
      const { location, property_name, images_url, category, id, independent_locations = [], comments, packages_list = [] } = service;

      const cheapestItem = packages_list.reduce((lowest, item) => {
        return Number(item.price) < Number(lowest.price) ? item : lowest
      }, {});

      let reviewNo = 0;
      const totalRate = JSON.parse(comments ?? "[]").reduce((total, curr) => {
        if (typeof curr.rating !== "number") return total;

        reviewNo++;

        return total + curr.rating;
      }, 0);

      const { province, city, barangay, street, zip_code } = location;
      const serviceObj = {
        id,
        category,
        name: property_name,
        rate: Math.floor(totalRate / reviewNo),
        reviewNo,
        lowestPrice: cheapestItem?.price ?? 0,
        location: `${[street, barangay, city, province].filter(Boolean).join(", ")} ${zip_code}`,
        image: `${import.meta.env.VITE_API_URL}/uploads/${images_url[0]}`
      };

      if (category === "Hotel/Resort") {
        hotelServc.push(serviceObj);
      }

      if (category === "Restaurant") {
        restServc.push(serviceObj);
      }

      if (category === "Function Hall") {
        funcServc.push(serviceObj);
      }

      if (category === "Independent Provider") {
        const [firstLocation = {}] = independent_locations;

        indProviderServc.push({
          ...serviceObj,
          location: `${[
            firstLocation.street,
            firstLocation.barangay,
            firstLocation.city,
            firstLocation.province
          ].filter(Boolean).join(", ")} ${firstLocation.zip_code}`,
        });
      }
    })

    return {
      hotels: handleSort(hotelServc, sortBy),
      restaurants: handleSort(restServc, sortBy),
      functionHalls: handleSort(funcServc, sortBy),
      indProviders: handleSort(indProviderServc, sortBy),
    };
  }, [services, sortBy])
  return (
    <div className="px-[1rem] md:px-[10rem]">
      <EventTabs updateEventTab={setSelectedTab} />

      <div className="relative">
        <div className="flex items-center gap-2 absolute top-5 right-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline"><ChevronsUpDown /> Sort By</Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 overflow-auto p-0">
              <p onClick={() => setSortBy("price")} className="p-4 py-3 border-b-1">Price</p>
              <p onClick={() => setSortBy("rate")} className="p-4 py-3">Top Rated</p>
            </PopoverContent>
          </Popover>
        </div>

        {(!selectedTab || selectedTab === "hotels") && (
          <>
            <p className="font-title font-bold text-[1.3rem] pb-4 pt-5 px-3">Hotels/Resorts</p>
            <Slider list={hotels} />
          </>
        )}

        {(!selectedTab || selectedTab === "restaurants") && (
          <>
            <p className="font-title font-bold text-[1.3rem] pb-4 pt-5 px-3">Restaurants</p>
            <Slider list={restaurants} />
          </>
        )}

        {(!selectedTab || selectedTab === "functionHalls") && (
          <>
            <p className="font-title font-bold text-[1.3rem] pb-4 pt-5 px-3">Function Halls</p>
            <Slider list={functionHalls} />
          </>
        )}

        {(!selectedTab || selectedTab === "serviceProviders") && (
          <>
            <p className="font-title font-bold text-[1.3rem] pb-4 pt-5 px-3">Independent Providers</p>
            <Slider list={indProviders} />
          </>
        )}
      </div>
    </div>
  )
};

export default Events;