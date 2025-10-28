import { useEffect, useState } from "react";
import NavigationMenu from "../../custom-ui/NavigationMenu";
import FooterSection from "../../custom-ui/Footer";

import { Card, CardContent } from "@/components/ui/card";

const PolicyPage = () => {
  const [settingsState, setSettingsState] = useState({});

  const initiateData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/getSettings.php`)
      .then((data) => data.json())
      .then(({ data }) => {
        setSettingsState(data.settings);
      });
  }

  useEffect(() => {
    initiateData();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] overflow-y-auto overflow-x-hidden relative">
      <NavigationMenu />

      <div className="px-[15rem] pt-[3rem]">
        <Card className="py-6 shadow-sm">
          <CardContent className="px-6">
            <p className="font-title font-bold mb-[1rem] text-[1.5rem]">Privacy Policy</p>

            <div dangerouslySetInnerHTML={{ __html: settingsState.policy}} />
          </CardContent>
        </Card>
      </div>

      <FooterSection />
    </div>
  );
};

export default PolicyPage;