import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { formatISODate } from "../../../../../../../api/util";

const ChatItem = ({ values = {}, handleSelect }) => {
  const { image, name, message, updated_at } = values;
  return (
    <div className="group/item hover:bg-muted relative flex min-w-0 cursor-pointer items-center gap-4 px-6 py-4" onClick={() => handleSelect(values)}>
      <Avatar className="relative flex size-8 shrink-0 rounded-full md:size-10">
        <AvatarImage src={`${import.meta.env.VITE_API_URL}/uploads/${image}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="min-w-0 grow">
        <div className="flex items-center justify-between">
          <span className="truncate text-sm font-medium">{name}</span>
          <span className="text-muted-foreground flex-none text-xs">{formatISODate(updated_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground truncate text-start text-sm">
            {message}
          </span>

          {/* <div className="ms-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm text-white">2</div> */}
        </div>
      </div>
    </div>
  );
}

const ChatList = ({ chatList = [], handleSelect }) => {
  return (
    <div className="flex-1 grow overflow-auto p-0">
      <div className="block min-w-0 divide-y">
        {chatList.map((chatItem) => <ChatItem values={chatItem} handleSelect={handleSelect} />)}
      </div>
    </div>
  )
}

const ChatMenu = ({ handleSelect }) => {
  const [chatList, setChatList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const initiateChats = () => {
    if (isFetching) return;
    setIsFetching(true);
    const userData = localStorage.getItem("user-data");
    const parsedUser = JSON.parse(userData);

    const formData = new FormData();

    formData.append("userId", parsedUser.id);

    fetch(`${import.meta.env.VITE_API_URL}/chat/contacts.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data = {} }) => {
        if (!data.contacts) return;

        const mappedData = data.contacts.map((item) => {
          let obj = { id: item.id_convo, message: item.message, updated_at: item.updated_at };
          if (String(item.id_user1) === String(parsedUser.id)) {
            return { ...obj, name: item.user2_name, image: item.user2_image };
          }

          return { ...obj, name: item.user1_name, image: item.user1_image };
        });

        setChatList(mappedData);
        setIsFetching(false);

      });
  };

  useEffect(() => {
    const interval = setInterval(() => initiateChats(), 1000);

    return () => {
      clearInterval(interval)
    }
  }, []);
  return (
    <Card className="p-0 shadow-none h-full w-[35%]">
      <CardContent className="p-0 flex flex-col gap-5 h-full">
        <header className="font-bold text-[1.5rem] px-6 pt-4">Chats</header>
        <div className="px-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />
            <Input 
              type="search" 
              placeholder="Chats search..."
              className="pl-10 pr-3 w-full h-8"
              // onChange={(evt) => setSearchFilter(evt.target.value)}
            />
          </div>
        </div>

        <ChatList chatList={chatList} handleSelect={handleSelect} />
      </CardContent>
    </Card>
  )
};

export default ChatMenu;