import { useEffect, useState } from "react";
import ServicesTable from "../Admin/component/ServicesTable";

const ServiceListing = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user-data");
    const parsedData = JSON.parse(user ?? "{}");

    setUserData(parsedData);
  }, []);

  if (!userData.id) return;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <ServicesTable />
    </div>
  );
};

export default ServiceListing;