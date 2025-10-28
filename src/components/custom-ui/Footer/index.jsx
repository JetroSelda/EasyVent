import { Button } from "@/components/ui/button";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronUp, Circle, Copyright, Facebook, Instagram, MessageCircleQuestion, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ChatBox = () => {
  const [shouldShow, setShouldShow] = useState(true);
  const [messages, setMessages] = useState([{ message: "Hello, how can I help you today?", isResponse: true }]);
  const [options, setOptions] = useState([]);
  const container = useRef();

  const initData = () => {
    const historyMsg = localStorage.getItem("quick-messages");

    if (historyMsg) {
      const parsedMsgs = JSON.parse(historyMsg ?? "[]");

      if (!!parsedMsgs.length) {
        setMessages(parsedMsgs);
      }
    }

    fetch(`${import.meta.env.VITE_API_URL}/settings/getQuestions.php`)
      .then((res) => res.json())
      .then(({ data }) => {
        const { questions = [] } = data ?? {};
        setOptions(questions);
      });
  }

  const handleNewMsg = (msg) => {
    const { question, response } = msg;
    setMessages((prev) => {
      const copy = [...prev];

      copy.push({ message: question }, { message: response, isResponse: true });
      localStorage.setItem("quick-messages", JSON.stringify(copy));

      return copy;
    });
  }

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (!container.current) return;

    container.current.scrollTop = container.current.scrollHeight;
  }, [messages]);

  return (
    <div className="absolute bottom-[100%] right-[1rem]">
      <div className="flex flex-col relative justify-end overflow-hidden max-w-lg w-[25rem] h-[30rem] bg-white rounded-lg shadow-lg border border-gray-300">
        <div className="w-full h-[3rem] bg-[#183B4E] flex items-center pl-4">
          Chat Support (FAQs)
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-10 " ref={container}>
          <div className="flex flex-col space-y-2">

            {messages.map((item) => {

              if (item.isResponse) {
                return (
                  <div className="flex items-start">
                    <div className="bg-gray-200 text-gray-700 p-2 rounded-lg max-w-xs">
                      <span dangerouslySetInnerHTML={{ __html: item.message}} />
                    </div>
                  </div>
                )
              }

              return (
                <div className="flex items-start justify-end">
                  <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                    <span>{item.message}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="absolute bottom-0 w-full left-0 text-blue-400 flex flex-col">
          {shouldShow && (
            <div className="flex flex-wrap items-start gap-1 px-2 py-1 grow">
              {options.map((optionItem) => (
                <div onClick={() => handleNewMsg(optionItem)} className="border-2 border-blue-400 bg-white px-2 py-1 rounded-full cursor-pointer hover:text-white hover:bg-blue-400">
                  {optionItem.question}
                </div>
              ))}
            </div>
          )}

          <div onClick={() => setShouldShow((prev) => !prev)} className="py-3 w-full flex justify-center text-gray-500 cursor-pointer">
            {shouldShow ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
      </div>
    </div>
  )
}

const CustomerSupport = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="fixed bottom-0 right-0 w-[6rem] h-[6rem] flex justify-center items-center">
      <div onClick={() => setEnabled((prev) => !prev)} className="relative w-[4rem] shadow-lg h-[4rem] rounded-full bg-[#183B4E] hover:bg-[#2e4e78] cursor-pointer grid place-items-center">
        {enabled ? <X /> : <MessageCircleQuestion />}
      </div>

      
      {enabled && <ChatBox />}
    </div>
  )
};

const FooterSection = () => {
  return (
    <div className="bg-[#183B4E] text-white mt-[3rem] p-[2rem] px-5 md:px-[10rem]">
      <CustomerSupport />

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Support</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Help Center</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Manage Bookings</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Contact Support</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Bookings FAQs</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">COVID-19 & Safety Guidelines</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Discover</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Browse Event Venues</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Restaurants for Events</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Hotels with Events Halls</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Planning Tips</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Popular Cities</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Featured Venues</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Wedding Packages</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Corporate Events</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Terms & Policies</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Privacy Policy</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Terms & Conditions</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Cookie Settings</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Cancellation Policy</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Accessibility Statement</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">User Aggreement</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">Partners</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Vendor Login</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Partner With Us (List Your Venue)</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Event Vendor Support</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Become an Affiliate</Button>
        </div>

        
        <div className="flex flex-col gap-0 w-[100%] md:w-[20%]">
          <p className="text-[1.2rem] font-semibold py-4">About</p>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">About</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">How It Works</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Sustainability</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Careers</Button>
          <Button variant="link" className="text-left justify-start px-0 text-gray-200 font-normal">Contact Us</Button>
        </div>
      </div>

      <p className="border-b-1 py-3 mt-5 flex gap-3 items-center">
        <Circle fill="white" size={14} /> English (US) | PH
      </p>

      <p className="text-center pt-10 flex flex-col md:flex-row items-center gap-2 w-full justify-center">
        Copyright &#169; 2025 Easyvent. All rights reserved. <span className="flex gap-5"><Facebook size={18} /> <Instagram size={18} /> </span>
      </p>
    </div>
  );
};

export default FooterSection;