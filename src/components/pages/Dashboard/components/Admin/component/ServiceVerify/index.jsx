import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BadgeCheckIcon, Ban, CheckCheck, CircleOff, Edit3, FileInput, Lock, MapPin, ShieldEllipsis, SquarePen, Unlock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { getServiceData } from "../../../../../../../api/services";
import Details from "./components/Details";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/textarea";

const BlockServiceForm = ({ id, onSubmit }) => {
  const [reason, setReason] = useState("");
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (onSubmit) onSubmit(id, reason);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Block Service</DialogTitle>
        <DialogDescription>
          Please fill in the reason for blocking this service
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <Label>Reason</Label>
        <Textarea value={reason} onChange={(event) => setReason(event.target.value)} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit" variant="destructive" onClick={() => formRef.current.requestSubmit()}>Block Service</Button>
      </DialogFooter>
    </form>
  )
}

const RejectServiceForm = ({ id, onSubmit, isLoading }) => {
  const [reason, setReason] = useState("");
  const formRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (onSubmit) onSubmit(id, reason);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Reject Service</DialogTitle>
        <DialogDescription>
          Please fill in the reason for rejecting this service
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <Label>Reason</Label>
        <Textarea value={reason} onChange={(event) => setReason(event.target.value)} required />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button disabled={isLoading} type="button" variant="outline">Cancel</Button>
        </DialogClose>
        <Button disabled={isLoading} type="submit" variant="destructive" onClick={() => formRef.current.requestSubmit()}>Reject Service</Button>
      </DialogFooter>
    </form>
  )
}

const ServiceVerify = () => {
  const { state = {} } = useLocation();
  const navigate = useNavigate();
  const [serviceState, setServiceState] = useState({});
  const [blockService, setBlockService] = useState(null);
  const [rejectingForm, setRejectingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  } = serviceState;

  const { province, city, barangay, street, building_no, zip_code } = location;

  console.log()

  const initiateServiceData = async (id) => {
    const data = await getServiceData(id);

    setServiceState(data);
  }

  const handleError = (error) => {
    return toast(error.message);
  }

  const handleblockService = (id, reason) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", "Blocked");
    formData.append("block_reason", reason);

    fetch(`${import.meta.env.VITE_API_URL}/services/blockService.php`, {
      method: "POST",
      body: formData,
    }).then(() => {
      toast("Successfully Blocked Service", { description: "Service will now be hidden from the public."});

      setBlockService(null);
      initiateServiceData(id);
      setIsLoading(false);
    })
    .catch(handleError);
  };

  const handleRejectService = (id, reason) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", "Rejected");
    formData.append("reject_reason", reason);
    formData.append("name", property_name);
    formData.append("email", serviceState.email);

    fetch(`${import.meta.env.VITE_API_URL}/services/rejectService.php`, {
      method: "POST",
      body: formData,
    }).then(() => {
      toast("Updated Service", { description: "You have successfully rejected this service."});

      setBlockService(null);
      initiateServiceData(id);
      setIsLoading(false);
    })
    .catch(handleError);
  };

  const unblockService = (id) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", "Published");
    formData.append("block_reason", "");

    fetch(`${import.meta.env.VITE_API_URL}/services/blockService.php`, {
      method: "POST",
      body: formData,
    }).then(() => {
      toast("Successfully Unblocked Service", { description: "Service will now be visible again."});
      initiateServiceData(id);
      setIsLoading(false);
    })
    .catch(handleError);
  };

  const confirmService = (id) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", property_name);
    formData.append("email", serviceState.email);

    fetch(`${import.meta.env.VITE_API_URL}/services/confirmService.php`, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        toast("Updated Service", { description: "Successfully published service."});
        initiateServiceData(id);
        setIsLoading(false);
      });
  }

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
            <div className="flex items-center gap-2 pt-3">
              <div className="w-[2rem]"><MapPin size={20} /></div> {formattedLocation} {zip_code}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            { status === "Verification" && (
              <Button disabled={isLoading} onClick={() => setRejectingForm(true)} variant="destructive"><CircleOff /> Reject Service</Button>
            )}

            { status === "Verification" && (
              <Button disabled={isLoading} onClick={() => confirmService(state?.id)} className="bg-[#183B4E] hover:bg-[#2e5e78]"><CheckCheck /> Confirm Service</Button>
            )}

            { status === "Published" && (
              <Button disabled={isLoading} onClick={() => setBlockService(state?.id)} variant="destructive"><Ban /> Block Service</Button>
            )}

            { status === "Blocked" && (
              <Button disabled={isLoading} onClick={() => unblockService(state?.id)} className="bg-[#183B4E] hover:bg-[#2e5e78]"><Unlock /> Unblock Service</Button>
            )}

          </div>
        </div>

        <Details
          property_description={property_description}
          amenities={amenities}
          highlights={highlights}
          packages_list={packages_list}
        />
      </div>

      <Dialog open={!!blockService} onOpenChange={setBlockService}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          {!!blockService && (
            <BlockServiceForm id={blockService} onSubmit={handleblockService} />
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!rejectingForm} onOpenChange={setRejectingForm}>
        <DialogContent className="sm:max-w-[355px] max-h-[85vh] overflow-auto">
          {!!rejectingForm && (
            <RejectServiceForm isLoading={isLoading} id={state?.id} onSubmit={handleRejectService} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default ServiceVerify;