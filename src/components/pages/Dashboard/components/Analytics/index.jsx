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

const Analytics = () => {
  const [userState, setUserState] = useState();
  const navigate = useNavigate();

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

  if (!userState) return null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {userState.role === "Provider" && (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
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
              <TotalServicesAdmin />
            </div>
            <div className="rounded-xl">
              <TotalBookingsAdmin />
            </div>
            <div className="rounded-xl">
              <TotalProviders />
            </div>
            <div className="rounded-xl">
              <TotalCustomers />
            </div>
            <div className="rounded-xl">
              <TotalFeedbacks />
            </div>
          </div>
          
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl">
              <TopCategories />
            </div>
            <div className="rounded-xl">
              <TopServices />
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
  )
};

export default Analytics;