import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { formatISODate } from "../../../../../../api/util";

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
              const dateScheds = scheds.filter((schedItem) => schedItem.schedule === formatISODate(dateObj.date));
              return (
                <div className={className}>
                  {dateText}
                  
                  {dateScheds.map((item) => (
                    <div className="p-3 bg-green-500 rounded-md text-white">
                      {item.property_name} - {[item.personal_name, item.last_name].join(" ")}
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

export default CalendarForm;