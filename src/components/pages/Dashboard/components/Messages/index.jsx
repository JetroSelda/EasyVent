import ChatMenu from "./components/ChatMenu";
import ChatBox from "./components/ChatBox";
import { useState } from "react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState();

  const handleSelect = (selected) => {
    setSelectedChat(selected);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 pt-0 h-[80vh] overflow-hidden">
      <ChatMenu handleSelect={handleSelect} />

      {selectedChat && (
        <ChatBox selectedChat={selectedChat} handleSelect={handleSelect} />
      )}
    </div>
  )
};

export default Messages;