import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { formatISODate } from "../../../../../../../api/util";

const SenderMessage = ({ message, created_at}) => {
  return (
    <div className="max-w-(--breakpoint-sm) space-y-1 self-end">
      <div className="flex items-center gap-2">
        <div className="bg-muted inline-flex rounded-md border p-4 order-1">
          {message}
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <time className="text-muted-foreground mt-1 flex items-center text-xs justify-end">{formatISODate(created_at)}</time>
      </div>
    </div>
  )
}

const ReceiverMessage = ({ message, created_at}) => {
  return (
    <div className="max-w-(--breakpoint-sm) space-y-1">
      <div className="flex items-center gap-2">
        <div className="bg-muted inline-flex rounded-md border p-4 order-1">
          {message}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <time className="text-muted-foreground mt-1 flex items-center text-xs justify-end">{formatISODate(created_at)}</time>
      </div>
    </div>
  )
}

const ChatBox = ({ selectedChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const boxRef = useRef();

  const formRef = useRef();

  const changeNewMessage = (event) => setNewMessage(event.target.value);

  const sendMessage = (event) => {
    event.preventDefault();
    if (!newMessage) return;
    if (isLoading) return;

    setIsLoading(true);
    
    const userData = localStorage.getItem("user-data");
    const parsedUser = JSON.parse(userData);
    const formData = new FormData();

    formData.append("convoId", selectedChat.id);
    formData.append("senderId", parsedUser.id);
    formData.append("message", newMessage);

    fetch(`${import.meta.env.VITE_API_URL}/chat/sendMessage.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data = {} }) => {
        setNewMessage("");
        setIsLoading(false);
      });
  }

  const initiateMessages = (id) => {
    if (isFetching) return;
    setIsFetching(true);
    const userData = localStorage.getItem("user-data");
    const parsedUser = JSON.parse(userData);
    const formData = new FormData();

    formData.append("convoId", id);

    fetch(`${import.meta.env.VITE_API_URL}/chat/messages.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data = {} }) => {
        if (!data.messages) return;

        console.log("Messages", data.messages);
        const MappedMSG = data.messages.map((item) => {
          if (String(item.id_sender) === String(parsedUser.id)) {
            return <SenderMessage message={item.message} created_at={item.created_at} />
          }
          
          return <ReceiverMessage message={item.message} created_at={item.created_at} />
        });
        
        setMessages((prev) => {
          setShouldScroll(prev.length !== MappedMSG.length);

          return MappedMSG;
        });

        setIsFetching(false);
      });
  }

  useEffect(() => {
    if (!selectedChat.id) return;

    const interval = setInterval(() => initiateMessages(selectedChat.id), 1000);

    return () => {
      clearInterval(interval);
    }

  }, [selectedChat]);

  useEffect(() => {
    if (!shouldScroll) return;
    boxRef.current.scrollTop = boxRef.current.scrollHeight;

    setShouldScroll(false);
  }, [shouldScroll, setShouldScroll])
  return (
    <div className="grow">
      <div className="bg-background fixed inset-0 z-50 flex h-full flex-col p-4 lg:relative lg:z-10 lg:bg-transparent lg:p-0">
        <div className="flex justify-between gap-4 lg:px-4">
          <div className="flex gap-4">
            <Avatar className="relative flex size-8 shrink-0 rounded-full md:size-10">
              <AvatarImage src={`${import.meta.env.VITE_API_URL}/uploads/${selectedChat.image}`} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold">
                {selectedChat.name}
              </div>
              <div className="text-xs text-green-500">Active</div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto lg:px-4" ref={boxRef}>
          <div>
            <div className="flex flex-col items-start space-y-10 py-8">
              {messages}
            </div>
          </div>
        </div>

        <form onSubmit={sendMessage} ref={formRef}>
          <div className="lg:px-4">
            <div className="bg-muted relative flex items-center rounded-md border">
              <Input placeholder="Enter message..." value={newMessage} onChange={changeNewMessage} className="border-0 h-14 bg-white" />

              <div className="absolute end-4 flex items-center">
                <Button variant="outline" onClick={() => formRef.current.requestSubmit()}>Send</Button>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ChatBox;