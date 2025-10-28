import { useEffect, useState } from "react";
import ProfileForm from "../../../../custom-ui/ProfileForm";
import { toast } from "sonner";
import ProviderHistory from "./components/ProviderHistory";
import { formatCurrency } from "../../../../../api/util";
import xlsx from "json-as-xlsx";
import ActivityLog from "./components/ActivityLog";

const Profile = () => {
  const [profileState, setProfileState] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    const parsedData = JSON.parse(userData);

    setProfileState({ ...parsedData, });
  }, []);

  const onSubmit = (formValues) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    const { id, file, personal_name, last_name, email, date_of_birth, bio, contacts = [], payments = [] } = formValues;

    formData.append("personal_name", personal_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("bio", bio ?? "");
    formData.append("date_of_birth", date_of_birth ?? "");
    formData.append("id", id)
    
    formData.append("contacts", JSON.stringify(contacts));
    formData.append("payments", JSON.stringify(payments));

    if (file) formData.append("file", file);

    fetch(`${import.meta.env.VITE_API_URL}/users/update.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data, error } = {}) => {
        setProfileState((prev) => ({ ...prev, file: undefined }))
        setIsLoading(false);
        if (error) {
          toast(error.title, {
            description: error.message,
          });
          return;
        }

        if (data) {
          toast(data.title, {
            description: "Successfully updated your profile data.",
          });

          localStorage.setItem("user-data", JSON.stringify({ ...formValues, display: data.display_picture ?? "", file: undefined }));
        }
      })
  }

  const downloadProvTrans = async () => {
    const formData = new FormData();
    formData.append("userId", profileState.id);
    const request = await fetch(`${import.meta.env.VITE_API_URL}/services/allBookings.php`, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    const { data } = response;
    const bookings = data?.bookings ?? [];

    const parsedData = bookings.map((item) => {
      const packageItem = JSON.parse(item.package_item ?? "{}");

      return ({
        id: `Transaction${item.id?.padStart(4, "0")}`,
        service_name: item.property_name,
        customer_name: [item.personal_name, item.last_name].join(" "),
        customer_email: item.email,
        schedule: item.schedule,
        package: packageItem.package_name,
        price: formatCurrency(packageItem.price),
        status: item.status,
      });
    })

    let excelData = [
      {
        sheet: "Transaction History",
        columns: [
          { label: "Transaction ID", value: "id" },
          { label: "Service", value: "service_name" },
          { label: "Customer", value: "customer_name" },
          { label: "Customer Email", value: "customer_email" },
          { label: "Booking Date", value: "schedule" },
          { label: "Booking Package", value: "package" },
          { label: "Booking Price", value: "price" },
          { label: "Status", value: "status" },
        ],
        content: parsedData,
      },
    ]

    let settings = {
      fileName: "TRANSACTION_HISTORY", 
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
    }

    xlsx(excelData, settings);
  };

  const downloadCusTrans = async () => {
    const formData = new FormData();
    formData.append("userId", profileState.id);
    const request = await fetch(`${import.meta.env.VITE_API_URL}/booking/customerBooking.php`, {
      method: "POST",
      body: formData,
    });

    const response = await request.json();

    const { data } = response;
    const bookings = data?.bookings ?? [];

    const parsedData = bookings.map((item) => {
      const packageItem = JSON.parse(item.package_item ?? "{}");

      return ({
        id: `Transaction${item.id?.padStart(4, "0")}`,
        service_name: item.property_name,
        schedule: item.schedule,
        package: packageItem.package_name,
        price: formatCurrency(packageItem.price),
        status: item.status,
      });
    })

    let excelData = [
      {
        sheet: "Transaction History",
        columns: [
          { label: "Transaction ID", value: "id" },
          { label: "Service", value: "service_name" },
          { label: "Booking Date", value: "schedule" },
          { label: "Booking Package", value: "package" },
          { label: "Booking Price", value: "price" },
          { label: "Status", value: "status" },
        ],
        content: parsedData,
      },
    ]

    let settings = {
      fileName: "TRANSACTION_HISTORY", 
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
    }

    xlsx(excelData, settings);
  }


  if (!profileState) return null;

  return (
    <div className="flex items-start flex-1 gap-4 p-4 pt-0">
      <ProfileForm
        isProvider={profileState.role === "Provider"}
        isCustomer={profileState.role === "Customer"}
        onSubmit={onSubmit}
        defaultValues={profileState}
        downloadTransaction={profileState.role === "Provider" ? downloadProvTrans : profileState.role === "Customer" ? downloadCusTrans : undefined}
      />

      <ActivityLog profileState={profileState} />
    </div>
  )
};

export default Profile;