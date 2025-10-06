import { useEffect, useState } from "react";
import FooterSection from "../../custom-ui/Footer";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import Banner from "./components/Banner";
import Events from "./components/Events";
import { getPublishedServices } from "../../../api/services";

const LandingPage = () => {
  const [services, setServices] = useState();
  const initiateServices = async () => {
    const list = await getPublishedServices();
    setServices(list);
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-data");

    const parsedUserData = JSON.parse(userData ?? null) || {};

    const { expiration } = parsedUserData;

    const today = new Date();

    const hasExpired = expiration < today.getTime();

    if (!userData || !expiration || hasExpired) {
      localStorage.removeItem("user-data");
      return;
    }

  }, []);

  useEffect(() => {
    initiateServices();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />

      <Banner />

      <Events services={services} />

      <FooterSection />
    </div>
  )
};

export default LandingPage;