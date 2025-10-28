import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { formatDate } from "../../../../../api/util";

function timeFromNow(date) {
  const now = new Date();
  const diff = date - now; // positive if in future, negative if in past
  const diffAbs = Math.abs(diff);

  const seconds = Math.floor(diffAbs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let value, unit;

  if (seconds < 60) {
    value = seconds;
    unit = "second";
  } else if (minutes < 60) {
    value = minutes;
    unit = "minute";
  } else if (hours < 24) {
    value = hours;
    unit = "hour";
  } else if (days < 7) {
    value = days;
    unit = "day";
  } else if (weeks < 5) {
    value = weeks;
    unit = "week";
  } else if (months < 12) {
    value = months;
    unit = "month";
  } else {
    value = years;
    unit = "year";
  }

  const plural = value !== 1 ? "s" : "";
  const direction = diff < 0 ? "ago" : "from now";

  return `${value} ${unit}${plural} ${direction}`;
}


const FeedbackPage = () => {
  const [formState, setFormState] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchFilter, setSearchFilter] = useState("");

  const filteredItems = formState.filter((item) =>
    item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.title.toLowerCase().includes(searchFilter.toLowerCase())
  )

  const initiateData = () => {
    fetch(`${import.meta.env.VITE_API_URL}/settings/getFeedbacks.php`)
      .then((res) => res.json())
      .then(({ data }) => {
        setFormState(data?.feedbacks ?? []);
      })
  }

  useEffect(() => {
    initiateData();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Card className="py-0 shadow-none h-full">
        <CardContent className="px-0 h-full">
          <div className="flex h-full">
            
            <div className="min-w-[25rem] max-w-[25rem] border-r-1 flex flex-col h-full">

              <div className="p-5 border-b-1">Inbox</div>

              <div className="grow p-5">
                
                <div className="max-h-[99%]">
                  <div className="relative w-full mb-5">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2 pointer-events-none" />

                    <Input className="pl-10 pr-3 w-full" onChange={(event) => setSearchFilter(event.target.value)} />
                  </div>
                  
                  {filteredItems.map((item) => (
                    <button type="button" onClick={() => setSelectedItem(item)} className="hover:bg-accent/70 flex flex-col w-full mb-3 items-start gap-2 rounded-lg border p-3 text-left text-md transition-all">
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold">{item.name}</div>
                          </div>

                          <div className="ml-auto text-sm text-muted-foreground">
                            {timeFromNow(new Date(item.created_at))}
                          </div>
                        </div>

                        <div className="text-sm font-medium">
                          {item.title}
                        </div>

                        <div className="text-muted-foreground line-clamp-2 text-sm" dangerouslySetInnerHTML={{ __html: item.description}} />
                      </div>
                    </button>
                  ))}
                </div>

              </div>

            </div>

            <div className="grow h-full flex flex-col">
              {selectedItem && (
                  <div className="flex flex-col border-b-1">

                  <div className="flex items-start p-4">
                    <div className="flex items-start gap-4 text-md">
                      <Avatar>
                        <AvatarFallback>{selectedItem.name[0]}</AvatarFallback>
                      </Avatar>

                      <div className="grid gap-1">
                        <div className="font-semibold">{selectedItem.name}</div>
                        <div className="line-clamp-1 text-md">{selectedItem.title}</div>
                        <div className="line-clamp-1 text-md">
                          Reply-To: {selectedItem.email}
                        </div>
                      </div>

                    </div>

                    <div className="text-muted-foreground ml-auto text-md">
                      {formatDate(selectedItem.created_at)}
                    </div>

                  </div>
                </div>
              )}

              {selectedItem && (
                <div className="grow w-full">
                  <div className="h-[95%] overflow-x-hidden overflow-y-auto p-5" dangerouslySetInnerHTML={{ __html: selectedItem.description }} />
                </div>
              )}
            </div>

          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackPage;