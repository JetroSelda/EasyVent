import { useEffect, useState } from "react";
import CalendarForm from "./Calendar";
import ChartAreaLegend from "./AreaChart";
import { useNavigate } from "react-router-dom";
import PastBookings from "./PastBookings";
import TopBookingsProv from "./TopBookingsProv";
import TotalServicesProv from "./TotalServicesProv";
import TotalBookingsProv from "./TotalBookingsProv";
import UpcommingEvents from "./UpcommingEvents";
import TotalServicesAdmin from "./TotalServicesAdmin";
import TotalBookingsAdmin from "./TotalBookingsAdmin";
import TotalProviders from "./TotalProviders";
import TotalCustomers from "./TotalCustomers";
import TotalFeedbacks from "./TotalFeedbacks";
import TopCategories from "./TopCategories";
import TopServices from "./TopServices";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const Analytics = () => {
  const [userState, setUserState] = useState();
  const navigate = useNavigate();

  const [filter, setFilter] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user-data");

    if (!user) return;

    const parsedData = JSON.parse(user ?? "{}");

    if (parsedData.role === "Customer") {
      navigate("/dashboard/bookings");

      return;
    }

    setUserState(parsedData);
  }, []);

  const handleFilter = (selectedFilter, data) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    if (!selectedFilter || selectedFilter === "all") return data;

    const startDate = new Date();
    const lastDate = new Date();
    let start;
    let last;

    if (selectedFilter === "this_month") {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0);

      lastDate.setMonth(lastDate.getMonth() + 1);
      lastDate.setDate(1);
      lastDate.setHours(0, 0, 0);
    }

    if (selectedFilter === "last_month") {
      startDate.setMonth(startDate.getMonth() - 1);
      startDate.setDate(1);
      startDate.setHours(0, 0 , 0);

      lastDate.setDate(1);
      lastDate.setHours(0, 0, 0);
    }

    if (selectedFilter === "this_year") {
      startDate.setMonth(0);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0);

      lastDate.setFullYear(lastDate.getFullYear() + 1);
      lastDate.setMonth(0);
      lastDate.setDate(1);
      lastDate.setHours(0, 0, 0);
    }

    if (selectedFilter === "last_year") {
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setMonth(0);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0);
      
      lastDate.setMonth(0);
      lastDate.setDate(1);
      lastDate.setHours(0, 0, 0);
    }

    start = startDate.getTime();
    
    last = lastDate.getTime();

    const filteredData = data.filter((item) => {
      const dataTimestamp = (new Date(item.created_at)).getTime();

      return dataTimestamp >= start && dataTimestamp < last;
    });

    return filteredData;
  };

  if (!userState) return null;

  return (
    <div className="grid gap-y-6">
      {(userState.role === "Admin" || userState.role === "Staff") && (
        <div className="flex justify-between px-5">
          <div className="flex items-center gap-y-3">
            <div className="flex items-center mr-3 gap-2">
              <Filter className="w-4 h-4" /> Filter By
            </div>
            <Select value={filter || "all"} onValueChange={setFilter}>
              <SelectTrigger className="w-50">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="last_month">Last Month</SelectItem>
                <SelectItem value="this_year">This Year</SelectItem>
                <SelectItem value="last_year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {userState.role === "Provider" && (
          <div className="grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl">
              <PastBookings />
            </div>
            <div className="bg-muted/50 aspect-video rounded-xl">
              <TopBookingsProv />
            </div>
            <div className="aspect-video rounded-xl">
              <div className="grid gap-4">
                <TotalServicesProv />
                <UpcommingEvents />
                <TotalBookingsProv />
              </div>
            </div>
          </div>
        )}

        {(userState.role === "Admin" || userState.role === "Staff") && (
          <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="rounded-xl">
                <TotalServicesAdmin filter={(data) => handleFilter(filter, data)} />
              </div>
              <div className="rounded-xl">
                <TotalBookingsAdmin filter={(data) => handleFilter(filter, data)} />
              </div>
              <div className="rounded-xl">
                <TotalProviders filter={(data) => handleFilter(filter, data)} />
              </div>
              <div className="rounded-xl">
                <TotalCustomers filter={(data) => handleFilter(filter, data)} />
              </div>
              <div className="rounded-xl">
                <TotalFeedbacks filter={(data) => handleFilter(filter, data)} />
              </div>
            </div>
            
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="rounded-xl">
                <TopCategories filter={(data) => handleFilter(filter, data)} />
              </div>
              <div className="rounded-xl">
                <TopServices filter={(data) => handleFilter(filter, data)} />
              </div>
            </div>
          </>
        )}
        {userState.role === "Provider" && (
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <CalendarForm userState={userState} />
          </div>
        )}
      </div>
    </div>
  )
};

export default Analytics;