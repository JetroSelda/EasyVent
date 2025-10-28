import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const Notifications = ({ userData }) => {
  const [notifications, setNotifications] = useState([]);
  const sorted = [...notifications];
  sorted.reverse();
  const navigate = useNavigate();

  const initiateData = () => {
    if (!userData) return;

    const parsedUser = JSON.parse(userData ?? "{}");

    const formData = new FormData();

    formData.append("userId", parsedUser.id);
    
    fetch(`${import.meta.env.VITE_API_URL}/settings/getNotifications.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setNotifications(data?.notifications ?? []);

        setTimeout(() => initiateData(), 5000);
      })

  }

  const initiateAdminData = () => {
    if (!userData) return;

    fetch(`${import.meta.env.VITE_API_URL}/settings/getAdminNotifications.php`)
      .then((res) => res.json())
      .then(({ data }) => {
        setNotifications(data?.notifications ?? []);

        setTimeout(() => initiateAdminData(), 5000);
      })
  }

  const navigateNotif = (item) => {
    const formData = new FormData();

    formData.append("id", item.id);
    fetch(`${import.meta.env.VITE_API_URL}/settings/updateNotification.php`, {
      method: "POST",
      body: formData,
    });

    if (item.title === "New Payment" || item.title === "New Booking" || item.title === "Approved Listing" || item.title === "Rejected Listing" || item.title === "Blocked Listing" || item.title === "Published Listing") {
      return navigate("/dashboard/services/details", { state: { id: item.id_ref } });
    }

    if (item.title === "New Listing") {
      return navigate("/dashboard/admin/service", { state: { id: item.id_ref } });
    }

    if (item.title === "Approved Listing") {
      return navigate("/dashboard/services/details", { state: { id: item.id_ref } });
    }

    if (item.title === "Confirmed Booking" || item.title === "Rejected Booking" || item.title === "Confirmed Payment" || item.title === "Rejected Payment") {
      return navigate("/dashboard/bookings");
    }

    if (item.title === "New Feedback") {
      return navigate("/dashboard/feedback");
    }

    return navigate("/dashboard/messages")
  };

  useEffect(() => {
    const parsedData = JSON.parse(userData ?? "{}");
    if (parsedData.role === "Provider" || parsedData.role === "Customer") {
      initiateData();

      return;
    }

    if (parsedData.role === "Admin" || parsedData.role === "Staff") {
      initiateAdminData();
    }
  }, [userData]);

  const hasNewNotifs = notifications.some((item) => item.status === "Unread");
  return (
    <Popover align="right">
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell />
          {hasNewNotifs && <div className="w-2 h-2 absolute right-1 top-1 rounded-full bg-green-500" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0"  side="bottom" align="end">
        <p className="px-5 py-3 border-b-1">Notifications</p>
        <div className="h-[350px] overflow-y-auto">
          
          {sorted.map((item) => (
            <div onClick={() => navigateNotif(item)} className="cursor-pointer hover:bg-gray-100 px-5 py-3 border-b-1 relative">
            
              {item.status === "Unread" && <div className="px-2 py-[0.1rem] text-white text-[0.65rem] absolute right-4 top-4 rounded-full bg-green-500">New</div>}
              <p className="">{item.title}</p>
              <p className="text-gray-500 text-sm font-normal line-clamp-1">{item.description}</p>
              <p className="flex pt-1 text-gray-400 gap-1 items-center text-xs">
                <Clock className="w-3 h-3" /> {timeFromNow(new Date(item.created_at))}
              </p>

            </div>
          ))}

        </div>
      </PopoverContent>
    </Popover>
  )
};

export default Notifications;