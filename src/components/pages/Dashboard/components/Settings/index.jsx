import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BookOpen, Handshake, MessageCircleQuestion, ShieldAlert, Wallpaper } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LandingSettings from "./components/Landing";
import AboutSettings from "./components/About";
import PrivacySettings from "./components/Privacy";
import TermsSettings from "./components/Terms";
import SupportSettings from "./components/Support";


const SettingsPage = () => {
  const [formState, setFormState] = useState({});

  const initiateData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/getSettings.php`)
      .then((data) => data.json())
      .then(({ data }) => {
        setFormState(data.settings);
      })
  }

  useEffect(() => {
    initiateData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs defaultValue={"landing"}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="landing"><Wallpaper /> Landing Page</TabsTrigger>
            <TabsTrigger value="about"><BookOpen /> About</TabsTrigger>
            <TabsTrigger value="policy"><ShieldAlert /> Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms"><Handshake /> Terms & Conditions</TabsTrigger>
            <TabsTrigger value="support"><MessageCircleQuestion /> Support (FAQs)</TabsTrigger>
          </TabsList>
        </div>
          <TabsContent value="landing">
            <LandingSettings settings={formState} refresh={initiateData} />
          </TabsContent>
          <TabsContent value="about">
            <AboutSettings settings={formState} refresh={initiateData} />
          </TabsContent>
          <TabsContent value="policy">
            <PrivacySettings settings={formState} refresh={initiateData} />
          </TabsContent>
          <TabsContent value="terms">
            <TermsSettings settings={formState} refresh={initiateData} />
          </TabsContent>
          <TabsContent value="support">
            <SupportSettings settings={formState} refresh={initiateData} />
          </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;