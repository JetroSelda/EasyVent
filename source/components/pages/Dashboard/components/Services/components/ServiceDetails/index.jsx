import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeCheckIcon, CircleOff, Edit3, FileInput, Lock, MapPin, ShieldEllipsis, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { getServiceData } from "../../../../../../../api/services";
import Details from "./Details";
import Bookings from "./Bookings";

import { Badge } from "@/components/ui/badge";


const ServiceDetails = () => {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const [serviceState, setServiceState] = useState({});

  const [selectedImageIndx, setSelectedImageIndx] = useState(0);

  console.log("Serivce State", serviceState);

  const {
    property_name,
    property_description,
    status,
    location = {},
    highlights = [],
    amenities = [],
    packages_list = [],
    images_url = [],
    required_documents = [],
    reject_reason,
    block_reason,
  } = serviceState;

  const { province, city, barangay, street, building_no, zip_code } = location;

  console.log()

  const initiateServiceData = async (id) => {
    const data = await getServiceData(id);

    setServiceState(data);
  }

  const editService = () => {
    navigate("/dashboard/services/form", { state: { ...serviceState }});
  };

  useEffect(() => {
    if (!state?.id) {
      navigate("/dashboard/services");
      return;
    }

    initiateServiceData(state.id);
  }, [state]);

  const formattedLocation = ["Philippines", province, city, barangay, street, building_no].filter(Boolean).join(", ");
  const selectedUrl = images_url[selectedImageIndx];

  
  return (
    <div className="flex relative px-5">
      <div className="w-[35%]">
        <div className="">
          <Card className="py-0 bg-gray-400 h-[18rem] rounded-md overflow-hidden">
          <CardContent className="px-0 h-full">
            <img className="w-full h-full" src={`${import.meta.env.VITE_API_URL}/uploads/${selectedUrl}`} />
          </CardContent>
        </Card>

        <Carousel
            opts={{
              align: "start",
            }}
            className="w-[100%] py-4"
          >
            <CarouselContent>
              {images_url.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="py-0 bg-gray-400 h-[8rem] rounded-md overflow-hidden" onClick={() => setSelectedImageIndx(index)}>
                    <CardContent className="px-0 h-full">
                      <img className="w-full h-full" src={`${import.meta.env.VITE_API_URL}/uploads/${item}`} />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div className="py-5">
          <p className="font-semibold">
            Legal Documents
          </p>

          <div className="grid gap-3 py-2">

            {required_documents.map((doc) => (
              <Card className="p-0 shadow-none" onClick={() => {
                window.open(`${import.meta.env.VITE_API_URL}/uploads/${doc.url}`, "_blank")
              }}>
                <CardContent className="flex h-[4rem] px-3 items-center gap-2 cursor-pointer">
                  <div className="w-[3rem] h-full flex items-center justify-center">
                    <FileInput size={28} />
                  </div>

                  <p className="w-[20rem]">
                    <h4 className="font-semibold w-[90%] text-nowrap text-ellipsis overflow-hidden">{doc.name}</h4>
                    <p className="text-gray-500 text-[0.9rem] w-[90%] text-nowrap text-ellipsis overflow-hidden">{doc.type} file</p>
                  </p>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </div>

      <div className="w-[65%] px-5">
        <div className="flex justify-between mb-4">
          <div className="flex flex-col justify-between">
            <p className="font-title font-bold text-[2rem] mb-1">{property_name}</p>

            {status === "Published" && (
              <Badge
                variant="secondary"
                className="bg-blue-500 text-white dark:bg-blue-600"
              >
                <BadgeCheckIcon />
                Verified
              </Badge>
            )}

            {status === "Blocked" && (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white"
              >
                <Lock />
                Blocked
              </Badge>
            )}

            {status === "Rejected" && (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white"
              >
                <CircleOff />
                Rejected
              </Badge>
            )}

            {status === "Deactivated" && (
              <Badge
                variant="secondary"
                className="bg-red-500 text-white"
              >
                <Lock />
                Deactivated
              </Badge>
            )}

            {status === "Verification" && (
              <Badge
                variant="secondary"
                className="bg-green-500 text-white"
              >
                <ShieldEllipsis />
                For Verification
              </Badge>
            )}

            {status === "Draft" && (
              <Badge
                variant="secondary"
                className="bg-gray-400 text-white"
              >
                <SquarePen />
                Draft
              </Badge>
            )}

            <div className="flex items-center pt-3">
              <div className="w-[2rem]"><MapPin size={20} /></div> {formattedLocation} {zip_code}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={editService} className="bg-[#183B4E] hover:bg-[#2e5e78]"><Edit3 /> Edit Service</Button>
          </div>
        </div>

        {status === "Rejected" && (
          <div className="border-2 border-red-500 bg-red-300 px-3 py-2 rounded-sm mb-3">
            <p className="font-semibold">Service Rejected</p>
            <p>{reject_reason}</p>
          </div>
        )}

        {status === "Blocked" && (
          <div className="border-2 border-red-500 bg-red-300 px-3 py-2 rounded-sm mb-3">
            <p className="font-semibold">Service Blocked</p>
            <p>{block_reason}</p>
          </div>
        )}

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="bookings">Event Bookings</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Details
              property_description={property_description}
              amenities={amenities}
              highlights={highlights}
              packages_list={packages_list}
            />
          </TabsContent>
          <TabsContent value="bookings">
            <Bookings service={serviceState} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
};

export default ServiceDetails;