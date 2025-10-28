import { useLocation, useNavigate } from "react-router-dom";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import ServiceForm from "../Dashboard/components/Services/form/ServiceForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Building2, HandPlatter, Landmark, Users } from "lucide-react";

const CategorySelection = ({ onClick }) => {

  return (
    <form>
      <DialogHeader>
        <DialogTitle>Categories</DialogTitle>
        <DialogDescription>
          Select category to list your service
        </DialogDescription>
      </DialogHeader>

      <div className="grid grid-cols-1 gap-5 py-7">
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => onClick("Hotel/Resort")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Building2 size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Hotel/Resort</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => onClick("Restaurant")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <HandPlatter size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.5rem]">Restaurant</div>
                <p className="text-[0.9rem] text-gray-500">
                  Provision of food services at various locatins, categorized into commercial, noncommercial and military
                  segments. It encompasses on-premise and off-premise services, with types of caterers ranging from full service
                  to party food caterers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => onClick("Function Hall")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Landmark size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Function Hall</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-md py-4 hover:bg-gray-100 cursor-pointer" onClick={() => onClick("Independent Provider")}>
          <CardContent>
            <div className="flex align-center gap-5">
              <div className="w-[15%] flex items-center justify-center">
                <Users size={50} />
              </div>
              <div className="w-[70%]">
                <div className="font-title font-bold text-[1.2rem]">Independent Provider</div>
                <p className="text-[0.9rem] text-gray-500">
                  A place where a special occasion or event can be held. These venues can range from large spacious convention centers to small
                  intimate banquet halls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  )
}

const Listing = () => {
  const { state } = useLocation();
  const [enabledForm, setEnabledForm] = useState(true);
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const setupFormData = async (formState, status, documents = []) => {
    const {
      id,
      category,
      property_details = {},
      images_url = [],
      highlights = [],
      location = {},
      amenities = [],
      packages_list = [],
      independent_locations = [],
      required_documents = [],
      availability = [],
      id_user,
    } = formState;

    const formData = new FormData();
    const { property_name = "", property_description = "", skills = [], experiences = [] } = property_details;
    const files = []
    const urls = [];

    const documentsUrls = [];

    images_url.forEach((item) => {
      if (typeof item === "string") return urls.push(item);

      if (typeof item === "object") return files.push(item);
    });

    if (documents.length > 0) {
      const documentForm = new FormData();

      documents.forEach((file) => documentForm.append("files[]", file))

      const res = await fetch(`${import.meta.env.VITE_API_URL}/services/upload_documents.php`, {
        method: 'POST',
        body: documentForm,
      });

      const json = await res.json();

      if (json.files)  {
        documentsUrls.push(...json.files);
      }
    }

    if (files.length > 0) {
      const uploadForm = new FormData();

      files.forEach((file) => uploadForm.append("images[]", file))

      const res = await fetch(`${import.meta.env.VITE_API_URL}/services/upload_images.php`, {
        method: 'POST',
        body: uploadForm,
      });

      const json = await res.json();

      if (json.files)  {
        urls.push(...json.files);
      }
    }

    if (id) formData.append("id", id);

    formData.append("userId", id_user);

    formData.append("category", category);
    formData.append("status", status);
    formData.append("property_name", property_name);
    formData.append("property_description", property_description);
    formData.append("images_url", JSON.stringify(urls ?? []));
    formData.append("highlights", JSON.stringify(highlights ?? []));
    formData.append("amenities", JSON.stringify(amenities ?? []));
    formData.append("location", JSON.stringify(location ?? {}));
    formData.append("availability", JSON.stringify(availability));
    formData.append("packages_list", JSON.stringify(packages_list));
    formData.append("required_documents", JSON.stringify(documentsUrls?.length > 0 ? documentsUrls : required_documents));
    
    formData.append("skills", JSON.stringify(skills ?? []));
    formData.append("experiences", JSON.stringify(experiences ?? []));
    formData.append("independent_locations", JSON.stringify(independent_locations ?? []));

    return formData;
  }

  const createService = async (formState, status, documents) => {
    const formData = await setupFormData(formState, status, documents);

    const res = await fetch(`${import.meta.env.VITE_API_URL}/services/create.php`, {
      method: 'POST',
      body: formData,
    });

    const json = await res.json();

    const userData = new FormData();
    userData.append("id", formState.id_user);

    await fetch(`${import.meta.env.VITE_API_URL}/users/verifyUser.php`, {
      method: "POST",
      body: userData,
    });

    if (json.error)  {
      
    }

    if (json.data) {
      navigate("/verification");
    }
    
  }

  const onSubmit = (formState, documents) => {
    createService(formState, "Verification", documents);
  };

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />
      <div className="w-full flex items-center justify-center py-[2rem]">
        <div className="w-[80%]">
          {category && <ServiceForm initialListing onSubmit={onSubmit} defaultValue={{ category }} />}
        </div>
      </div>

      <Dialog open={enabledForm}>
        <DialogContent className="sm:max-w-[825px] max-h-[85vh] overflow-y-auto overflow-x-hidden">
          <CategorySelection onClick={(value) => {
            setEnabledForm(false);
            setCategory(value);
          }} />
        </DialogContent>
      </Dialog>
    </div>
  )
};

export default Listing;