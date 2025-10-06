import { useLocation, useNavigate } from "react-router-dom";
import FooterSection from "../../custom-ui/Footer"
import NavigationMenu from "../../custom-ui/NavigationMenu"
import { useEffect, useState } from "react";
import { getServiceData } from "../../../api/services";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Circle, Clock, Image, LogIn, Mail, MapPinCheck, PhilippinePeso, Phone, Smartphone } from "lucide-react";
import GalleryCarousel from "../BookHotel/components/GalleryCarousel";
import { formatCurrencyWithoutSymbol } from "../../../api/util";
import { toast } from "sonner";

const CONTACT_ICONS = {
  Landline: Phone,
  Mobile: Smartphone,
  Email: Mail
};

const formatLocation = (location = {}) => {
  const { building_no, street, barangay, city, province, zip_code } = location;

  return `${[building_no, street, barangay, city, province].filter(Boolean).join(", ")} ${zip_code}`;
}

const PackagesSelection = ({ serviceId, packages_list = [] }) => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPackage = (packageItem) => {
    setSelectedPackage(packageItem);
  }

  const submitBooking = () => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    const userData = localStorage.getItem("user-data");
    const parsedUserData = JSON.parse(userData);

    formData.append("userId", parsedUserData.id);
    formData.append("serviceId", serviceId);
    formData.append("packageItem", JSON.stringify(selectedPackage));

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

  return (
    <form>
      <DialogHeader>
        <DialogTitle>Packages</DialogTitle>
        <DialogDescription>
          Select a package
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 gap-5 pt-7">
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
                  <p className="text-[0.9rem] text-gray-500 flex items-center gap-2 italic"><PhilippinePeso size={15} /> {formatCurrencyWithoutSymbol("en-US", "PHP", packageItem.price)}</p>
                  <p className="text-[0.9rem] text-gray-500 flex items-center gap-2 italic"><Clock size={15} /> {packageItem.duration} hours</p>
                </div>

                <p className="font-semibold mb-1">Inclusions</p>
                <ul className="mb-5">
                  {packageItem.inclusions.map((inclusion) => (
                    <li className="decoration" key={inclusion}>
                      <div className="flex pl-3 mb-3 gap-2">
                        <div className="w-[1.3rem] mt-[0.5rem]">
                          <Circle size={9} fill="#183B4E" />  
                        </div> {inclusion}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button
          disabled={isLoading}
          className="mt-5 w-fit bg-[#27548a] py-2 hover:bg-[#446a99] ml-auto"
          type="button"
          onClick={submitBooking}
        >Submit Booking</Button>
      </div>
    </form>
  )
}

const BookService = () => {
  const navigate = useNavigate();
  const [mapEnabled, setMapEnabled] = useState(false);
  const { state = {} } = useLocation();
  const [serviceState, setServiceState] = useState({});
  const [userData, setUserData] = useState(null);
  const [viewGallery, setViewGallery] = useState(null);

  const [enabledPackages, setEnabledPackages] = useState(false);

  const {
    id,
    property_name,
    property_description,
    skills = [],
    experiences = [],
    independent_locations = [],
    packages_list = [],
    images_url = [],
    contacts = [],
    email
  } = serviceState;

  const urls = images_url.map((item) => `${import.meta.env.VITE_API_URL}/uploads/${item}`);

  const initiateServiceData = async (id) => {
    const data = await getServiceData(id);

    setServiceState(data);
  }

  const openPackages = () => {
    setEnabledPackages(true);
  }

  const navigateLogin = () => {
    navigate("/login", { state: { redirect: { page: "/indenpendentservice", state: { id: state.id } }}})
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
      
      <div className="flex gap-5 py-6 px-2 md:px-[10rem]">
        <div className="w-[30%]">
          <Card className="shadow-none mb-3">
            <CardContent>
              <div className="h-[15rem] overflow-hidden rounded-md shadow-md">
                <img src={urls[0]} className="h-full w-full object-cover" />
              </div>

              <div className="pt-3 pb-2 font-title text-[1.2rem] font-bold">
                {property_name}
              </div>

              
              {contacts.map((contact) => {
                const IconComponent = CONTACT_ICONS[contact.type];

                return (
                  <div className="flex gap-2 items-center italic">
                    <IconComponent size={15} /> {contact.value}
                  </div>
                )
              })}

              <div className="flex gap-2 items-center italic">
                <Mail size={15} /> {email}
              </div>
            </CardContent>
          </Card>


          <Card className="shadow-none mb-3">
            <CardContent>
              <div className="font-poppins font-semibold mb-3">
                Covered Locations
              </div>

              
              {independent_locations.map((location) => (
                <div className="flex gap-2 mb-2 italic">
                  <div className="min-w-[1.2rem] pt-1">
                    <MapPinCheck size={15} />
                  </div> {formatLocation(location)}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex py-2">
            {!userData && <Button className="bg-[#27548a] w-full py-6 hover:bg-[#446a99]" type="button" onClick={navigateLogin}>Sign-In to Book <LogIn /></Button>}

            {!!userData && <Button className="bg-[#27548a] w-full py-6 hover:bg-[#446a99]" onClick={openPackages}>Book Now <Calendar /></Button>}
          </div>
        </div>

        <div className="w-[70%]">
          <Card  className="shadow-none mb-3">
            <CardContent>
              <div className="font-poppins font-semibold mb-3">
                About
              </div>

              <p className="mb-5">{property_description}</p>

              <div className="flex mb-5">
                <div className="w-[50%]">
                  <div className="font-poppins font-semibold mb-3">
                    Skills
                  </div>

                  {skills.map((skill) => (
                    <div className="flex gap-1 mb-2 italic">
                      <div className="min-w-[1.2rem] pt-[0.4rem]">
                        <Circle fill="#183B4E" size={10} />
                      </div> {skill}
                    </div>
                  ))}
                </div>

                
                <div className="w-[50%]">
                  <div className="font-poppins font-semibold mb-3">
                    Experiences
                  </div>

                  {experiences.map((exp) => (
                    <div className="flex gap-1 mb-2 italic">
                      <div className="min-w-[1.2rem] pt-[0.4rem]">
                        <Circle fill="#183B4E" size={10} />
                      </div> {exp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="font-poppins font-semibold mb-3">
                Services Offered
              </div>

              <div className="flex flex-wrap mb-5">
                {packages_list.map((packageItem) => (
                    <div className="flex w-[50%] gap-1 mb-2 italic">
                      <div className="min-w-[1.2rem] pt-[0.4rem]">
                        <Circle fill="#183B4E" size={10} />
                      </div> {packageItem.package_name}
                    </div>
                  ))}
              </div>

              <div className="py-5">
                <Button
                  type="button"
                  onClick={() => setViewGallery(0)}
                  variant="outline"
                  className="ml-2 mb-2"
                >View Gallery <Image /> </Button>
                <Carousel
                  opts={{
                    align: "start",
                  }}
                  className="w-[100%]"
                >
                  <CarouselContent>
                    {urls.slice(1).map((item, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card className="p-0 overflow-hidden">
                            <CardContent className="p-0 h-[19rem] overflow-hidden">
                              <img src={item} className="w-full h-full object-cover" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {typeof viewGallery === "number" && (
        <GalleryCarousel images={urls} selectedImage={viewGallery} setSelectedImage={setViewGallery} />
      )}
      
      <Dialog open={!!enabledPackages} onOpenChange={setEnabledPackages}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-auto">
          <PackagesSelection serviceId={id} packages_list={packages_list} />
        </DialogContent>
      </Dialog>
      <FooterSection />
    </div>
  )
};

export default BookService;