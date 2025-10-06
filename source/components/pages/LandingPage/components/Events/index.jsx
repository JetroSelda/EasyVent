import EventTabs from "../EventTabs";

import { Button } from "@/components/ui/button";
import Slider from "../Slider";
import { Banknote, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";


const Events = ({ services = [] }) => {
  const [selectedTab, setSelectedTab] = useState("");

  const { hotels = [], restaurants = [], functionHalls = [], indProviders = [] } = useMemo(() => {
    const hotelServc = [];
    const restServc = [];
    const funcServc = [];
    const indProviderServc = [];

    services.forEach((service) => {
      const { location, property_name, images_url, category, id, independent_locations = [] } = service;

      const { province, city, barangay, street, zip_code } = location;
      const serviceObj = {
        id,
        category,
        name: property_name,
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

    return { hotels: hotelServc, restaurants: restServc, functionHalls: funcServc, indProviders: indProviderServc };
  }, [services])
  return (
    <div className="px-[1rem] md:px-[10rem]">
      <EventTabs updateEventTab={setSelectedTab} />

      <div className="relative">
        <div className="flex items-center gap-2 absolute top-5 right-0">
          <Button variant="outline"><Banknote /> Price</Button>
          <Button variant="outline"><ChevronsUpDown /> Sort By</Button>
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