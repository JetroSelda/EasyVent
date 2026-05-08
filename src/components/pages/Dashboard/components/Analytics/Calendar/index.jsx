import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatDate, formatISODate } from "../../../../../../api/util";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

function getCalendarDates(dateObj) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();

  // First and last day of current month
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();

  // Determine the weekday index of the first day (0 = Sunday, 6 = Saturday)
  const startWeekday = firstDayOfMonth.getDay();

  // Fill in dates from the previous month
  const prevMonthLastDay = new Date(year, month, 0); // Last day of previous month
  const daysInPrevMonth = prevMonthLastDay.getDate();

  const calendarDates = [];

  // Fill previous month's trailing days
  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarDates.push({
      date: new Date(year, month - 1, day),
      currentMonth: false,
    });
  }

  // Fill current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDates.push({
      date: new Date(year, month, i),
      currentMonth: true,
    });
  }

  // Fill next month's leading days to complete the 6x7 grid (42 total days)
  const totalFilled = calendarDates.length;
  const remaining = 42 - totalFilled;

  for (let i = 1; i <= remaining; i++) {
    calendarDates.push({
      date: new Date(year, month + 1, i),
      currentMonth: false,
    });
  }

  return calendarDates;
}

const CalendarForm = ({ userState }) => {
  const [open, setOpen] = useState(null);

  console.log("open", open)

  const [currDate, setCurrDate] = useState(() => {
    const today = new Date();

    today.setDate(1);
    return today;
  });
  const [scheds, setScheds] = useState([]);

  const calendarDates = getCalendarDates(currDate);

  const nextMonth = new Date(currDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(-1);

  const handlePrev = () => {
    const copy = new Date(currDate);
    copy.setMonth(copy.getMonth() - 1);

    setCurrDate(copy);
  }

  const handleNext = () => {
    const copy = new Date(currDate);
    copy.setMonth(copy.getMonth() + 1);

    setCurrDate(copy);
  }

  const initateData = () => {
    const formData = new FormData();
    formData.append("userId", userState.id);
    fetch(`${import.meta.env.VITE_API_URL}/services/schedules.php`, {
      method:"POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setScheds(data?.schedules);
      })
  }

  console.log("Schedules", scheds);

  useEffect(() => initateData(), [])

  return (
    <Card>
      <CardContent>
        <p className="font-semibold mb-5 text-[1.15rem] flex items-center justify-between">
          <span>Calendar Events</span>
        </p>

        <div className="border-1 rounded-md">
          <div className="flex border-b-1 gap-3 p-3 items-center">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                {months[currDate.getMonth()]} {currDate.getFullYear()}
              </div>

              <div className="flex items-center gap-3 w-full">
                <Button variant="outline" type="button" onClick={handlePrev}>
                  <ChevronLeft />
                </Button>

                <div className="w-[10rem] text-center">
                  {months[currDate.getMonth()]} {currDate.getDate()} - {nextMonth.getDate()}, {currDate.getFullYear()}
                </div>
                
                <Button variant="outline" type="button" onClick={handleNext}>
                  <ChevronRight />
                </Button>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-7">
            <div className="text-center">Sun</div>
            <div className="text-center">Mon</div>
            <div className="text-center">Tue</div>
            <div className="text-center">Wed</div>
            <div className="text-center">Thu</div>
            <div className="text-center">Fri</div>
            <div className="text-center">Sat</div>
          </div>

          <div className="grid grid-cols-7">
            {calendarDates.map((dateObj) => {
              const dateText = dateObj.date.getDate();
              const className = dateObj.currentMonth ? "h-[10rem] p-3 border-r-1 border-t-1" : "h-[10rem] p-3 border-r-1 border-t-1 text-gray-500"
              
              const dateScheds = scheds.filter((schedItem) => schedItem.schedule?.slice(0, 10) === formatISODate(dateObj.date));

              if (dateScheds.length) console.log("dateScheds", dateScheds, scheds, dateObj.date);
              return (
                <div className={className} onClick={() => setOpen({ schedules: dateScheds || [], date: dateObj.date })}>
                  {dateText}
                  
                  {dateScheds.slice(0, 3).map((item) => (
                    <div className="p-1 mb-1 px-2 cursor-pointer line-clamp-1 bg-green-500 rounded-md text-white">
                      {item.property_name} - {[item.personal_name, item.last_name].join(" ")}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>

      <Sheet open={open} onOpenChange={setOpen}>
        {open && (
          <SheetContent className="w-full border-l border-border bg-background sm:max-w-2xl">
            <SheetHeader className="relative overflow-hidden border-b px-6 py-6">
              {/* Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

              {/* Decorative Blur */}
              <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="space-y-1">
                  <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
                    Booking List
                  </SheetTitle>

                  <p className="text-sm text-muted-foreground">
                    {formatDate(open.date)}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </SheetHeader>

            <div className="mt-2 mx-5 overflow-hidden rounded-xl border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                        Service
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-muted-foreground">
                        Schedule
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {open.schedules.length > 0 ? (
                      open.schedules.map((booking, index) => (
                        <tr
                          key={booking.id}
                          className={`
                            border-b transition-colors hover:bg-muted/40
                            ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}
                          `}
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium text-foreground">
                                {[booking.personal_name, booking.last_name]
                                  .filter(Boolean)
                                  .join(" ")}
                              </span>

                              <span className="text-xs text-muted-foreground">
                                Customer
                              </span>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {booking.property_name}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {formatDate(booking.schedule)}
                              </span>

                              <span className="text-xs text-muted-foreground">
                                Scheduled event
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-12 text-center text-muted-foreground"
                        >
                          No bookings found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </Card>
  )
};

export default CalendarForm;