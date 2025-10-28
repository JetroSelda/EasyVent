import { Calendar, Circle, Heart, LogIn, MapPin, PhilippinePeso, Star, Users } from "lucide-react";
import FooterSection from "../../custom-ui/Footer";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import GalleryGrid from "./components/GalleryGrid";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MapLocation from "./components/MapLocation";
import { getServiceData } from "../../../api/services";
import { formatCurrencyWithoutSymbol, formatDate } from "../../../api/util";
import { toast } from "sonner";

const PackagesSelection = ({ serviceState, serviceId, packages_list = [] }) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState();

  const handleSelectPackage = (packageItem) => {
    setSelectedPackage(packageItem);
  }

  const submitBooking = async () => {
    const serviceUnvDates = serviceState?.availability ?? [];

    if (serviceUnvDates.some((dateItem) => dateItem === schedule)) {
      return toast("Validation Error", { description: "The selected schedule is not available" });
    }

    const checkForm = new FormData();
    checkForm.append("serviceId", serviceId);
    const checkRes = await fetch(`${import.meta.env.VITE_API_URL}/services/checkAvailability.php`, {
      method: "POST",
      body: checkForm,
    });

    const json = await checkRes.json();

    const { data } = json ?? {};
    const { bookings = [] } = data ?? {};

    if (bookings?.length) {
      if (bookings.some((dateItem) => dateItem.schedule === schedule)) {
        return toast("Validation Error", { description: "The selected schedule is not available" });
      }
    }

    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    const userData = localStorage.getItem("user-data");
    const parsedUserData = JSON.parse(userData);

    formData.append("userId", parsedUserData.id);
    formData.append("serviceId", serviceId);
    formData.append("packageItem", JSON.stringify(selectedPackage));
    formData.append("schedule", schedule);

    fetch(`${import.meta.env.VITE_API_URL}/booking/create.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          toast(json.error.title, {
            description: json.error.message,
          });

          return;
        }
        if (json.data) {
          toast(json.data.title, {
            description: json.data.message,
          });

          navigate("/dashboard/bookings");

          return;
        }
      })
      .catch((error) => {
        toast("Something Went wrong!", {
          description: error.message,
        });
      });

    setIsLoading(false);
  }

  console.log("Current Schedule", schedule);

  return (
    <form>
      <DialogHeader>
        <DialogTitle>Booking Form</DialogTitle>
        <DialogDescription>
          Select preferred schedule and package
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 gap-5 pt-7">
        <div className="grid gap-2 w-[9rem]">
          <Label>Schedule</Label>
          <Input type="date" onChange={(event) => setSchedule(event.target.value)} />
        </div>

        <div className="grid gap-2">
          <Label>Packages Selection</Label>
          {packages_list.map((packageItem) => (
            <Card
              key={packageItem.package_name}
              className={`rounded-md py-4 ${selectedPackage.package_name === packageItem.package_name ? "border-blue-400 border-2" : ""} hover:bg-gray-100 cursor-pointer`}
              onClick={() => handleSelectPackage(packageItem)}
            >
              <CardContent>
                <div className="py-2 rounded-sm mb-4">
                  <div className="font-semibold mb-1">
                    {packageItem.package_name}
                  </div>
                  <div className="flex gap-10 mb-5">
                    <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><PhilippinePeso size={15} /> {formatCurrencyWithoutSymbol("en-US", "PHP", packageItem.price)}</p>
                    <p className="text-[0.9rem] text-gray-500 flex items-center gap-2"><Users size={15} /> {packageItem.no_guest} Guests</p>
                  </div>

                  <p className="font-semibold mb-1">Inclusions</p>
                  <ul className="mb-5">
                    {packageItem.inclusions.map((inclusion) => (
                      <li className="decoration" key={inclusion}>
                        <div className="flex pl-3 gap-2 items-center">
                          <Circle size={9} fill="#183B4E" /> {inclusion}
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="font-semibold mb-1">Meal Sets</p>
                  <div className="grid grid-cols-2">
                    {packageItem.meal_sets.map(({ title = "", meals = [] }) => (
                      <ul key={title}>
                        <li className="decoration">
                          <div className="flex pl-3 gap-2 items-center">
                            <Circle size={9} fill="#183B4E" /> {title}
                          </div>

                          <ul>
                            {meals.map((mealItem) => (
                              <li key={mealItem}>
                                <div className="flex pl-6 gap-2 items-center">
                                  <Circle size={9} /> {mealItem}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          disabled={isLoading || (!schedule || !selectedPackage?.package_name)}
          className="mt-5 w-fit bg-[#27548a] py-2 hover:bg-[#446a99] ml-auto"
          type="button"
          onClick={submitBooking}
        >Submit Booking</Button>
      </div>
    </form>
  )
}

const Comments = ({ serviceId }) => {
  const [commentsList, setCommentsList] = useState([]);

  const initiateData = () => {
    const formData = new FormData();
    formData.append("serviceId", serviceId);

    fetch(`${import.meta.env.VITE_API_URL}/services/getComments.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setCommentsList(data?.comments ?? []);
      })
  }

  useEffect(() => {
    initiateData();
  }, []);

  console.log("Comments", commentsList)

  const CommentsList = commentsList.map((item, index) => (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card className="p-0">
          <CardContent className="flex flex-col aspect-square p-4 h-[19rem]">
            <div className="flex gap-2 items-center">
              <div className="flex text-[1.2rem] text-white items-center justify-center rounded-full bg-[#183B4E] border-1 shadow-2xl w-[2.5rem] h-[2.5rem]">
                {[item.personal_name[0], item.last_name[0]].join(" ")}
              </div>

              <div className="flex flex-col justify-between">
                <p className="text-[#183B4E] font-semibold">{[item.personal_name, item.last_name].join(" ")}</p>
                <p className="text-gray-400 text-[0.8rem]">Customer</p>
              </div>
            </div>

            <div className="py-5">
              {item.comment}
            </div>

            <div className="mt-auto text-right text-gray-400 text-[0.8rem]">
              Reviewed: {formatDate(item.created_at)}
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  ))

  return CommentsList;
}

const BookHotel = () => {
  const navigate = useNavigate();
  const [mapEnabled, setMapEnabled] = useState(false);
  const { state = {} } = useLocation();
  const [serviceState, setServiceState] = useState({});
  const [userData, setUserData] = useState(null);

  const [enabledPackages, setEnabledPackages] = useState(false);

  const {
    id,
    property_name,
    property_description,
    location = {},
    highlights = [],
    amenities = [],
    packages_list = [],
    images_url = []
  } = serviceState;

  const { province, city, barangay, street, building_no, zip_code, geocode } = location;
  const formattedLocation = [building_no, street, barangay, city, province].filter(Boolean).join(", ");

  const urls = images_url.map((item) => `${import.meta.env.VITE_API_URL}/uploads/${item}`);

  const initiateServiceData = async (id) => {
    const data = await getServiceData(id);

    setServiceState(data);
  }

  const openPackages = () => {
    setEnabledPackages(true);
  }

  const navigateLogin = () => {
    navigate("/login", { state: { redirect: { page: "/serviceHotel", state: { id: state.id } }}})
  };

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    if (!userData) return;

    setUserData(JSON.parse(userData));
  }, [])

  useEffect(() => {
    if (!state || !state.id) {
      navigate("/");

      return;
    }

    initiateServiceData(state.id);
  }, [state]);

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
        <div className="py-6 px-2 md:px-[10rem]">
          <Card className="rounded-sm">
            <CardContent>
              <GalleryGrid imagesUrl={urls} />

              <div className="flex gap-5">
                <div className="flex flex-col gap-5 w-[70%]">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      <p className="font-title font-bold text-[1.3rem] text-[#183B4E]">{property_name}</p>
                      <p className="flex gap-2 items-center text-[#27548a]"><MapPin size={14} /> {formattedLocation} {zip_code}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center gap-2 text-orange-300">
                        <Star size={20} />
                        <Star size={20} />
                        <Star size={20} />
                        <Star size={20} />
                        <Star size={20} />
                      </div>
                      <Button variant="outline" className="rounded-full w-[2.3rem] h-[2.3rem] ml-5">
                        <Heart />
                      </Button>
                    </div>
                  </div>

                  <p>
                    {property_description}
                  </p>

                  <Card className="py-4">
                    <CardContent>
                      <p className="font-title text-[#183B4E] text-[1rem] font-semibold mb-5">
                        Key Highlights for Events
                      </p>

                      <ul>
                        {highlights.map((item) => (
                          <li key={item.title}>
                            <div className="flex items gap-2 py-2">
                              <div className="pt-[0.4rem]"><Circle fill="#183B4E" size={10} stroke={0} /></div>
                              <p>
                                <span className="text-[#183B4E] font-bold">{item.title}</span> - {item.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="w-[30%]">
                  <div className="relative mb-5 h-[12rem] shadow-md border-1 rounded-sm overflow-hidden">
                    {geocode && <MapLocation name={property_name} rate={0} geocode={geocode} zoom={13} />}

                    <div onClick={() => setMapEnabled(true)} className="opacity-0 cursor-pointer hover:opacity-100 absolute top-0 left-0 w-full h-full z-[5] bg-[#000000AA] text-white flex items-center justify-center">
                      View Location on Map
                    </div>
                  </div>
                  <Card>
                    <CardContent>
                      <p className="font-title text-[#183B4E] text-[1rem] font-semibold mb-5">
                        Inclusions & Amenities
                      </p>
                      <p>Included accross venues: </p>
                      <ul>
                        {amenities.map((item) => (
                          <li key={item}>
                            <div className="flex items gap-2 py-2">
                              <div className="pt-[0.4rem]"><Circle fill="#183B4E" size={10} stroke={0} /></div>
                              <p>
                                {item}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <div className="flex py-5">
                    {!userData && <Button className="bg-[#27548a] w-full py-6 hover:bg-[#446a99]" type="button" onClick={navigateLogin}>Sign-In to Book <LogIn /></Button>}

                    {(!!userData && userData.role === "Customer") && <Button className="bg-[#27548a] w-full py-6 hover:bg-[#446a99]" onClick={openPackages}>Book Now <Calendar /></Button>}
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-10 rounded-sm">
            <CardContent>
              <div className="flex items-center justify-between mb-8">
                <p className="font-title font-bold text-[1.3rem] text-[#183B4E]">Guest Reviews</p>

              </div>
              
            <div className="px-[4rem]">
              <Carousel
                opts={{
                  align: "start",
                }}
                className="w-[100%] min-h-[10rem]"
              >
                <CarouselContent>
                  {id && <Comments serviceId={id} />}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            </CardContent>
          </Card>
        </div>
      <FooterSection />

      {mapEnabled && (
        <div onClick={() => setMapEnabled(false)} className="fixed top-0 left-0 w-[100vw] h-[100vh] px-[10rem] py-10 bg-[#000000AA] backdrop-blur-xs z-[10]">
          <div onClick={(event) => event.stopPropagation()} className="h-full">
            <MapLocation name={property_name} rate={0} geocode={geocode} zoom={13} />
          </div>
        </div>)}

      <Dialog open={!!enabledPackages} onOpenChange={setEnabledPackages}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-auto">
          <PackagesSelection serviceState={serviceState} serviceId={id} packages_list={packages_list} />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default BookHotel;