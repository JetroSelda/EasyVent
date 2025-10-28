import { useEffect, useState } from "react";
import FooterSection from "../../custom-ui/Footer";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import Banner from "./components/Banner";
import Events from "./components/Events";
import { getPublishedServices } from "../../../api/services";

const LandingPage = () => {
  const [services, setServices] = useState();
  const [settingsState, setSettingsState] = useState({});
  const initiateServices = async () => {
    const list = await getPublishedServices();
    setServices(list);
  }

  const initiateData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/getSettings.php`)
      .then((data) => data.json())
      .then(({ data }) => {
        setSettingsState(data.settings);
      });
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
    initiateData();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />

      <Banner settingsState={settingsState} />

      <Events services={services} />

      <FooterSection />
    </div>
  )
};

export default LandingPage;