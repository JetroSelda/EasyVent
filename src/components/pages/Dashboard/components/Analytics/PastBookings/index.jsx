import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react";
import { formatISODate } from "../../../../../../api/util";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "McDonalds",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Hue Hotel",
    color: "var(--chart-2)",
  },
};

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

const getCurrMonths = ({ startDate, lastDate }) => {
  const currMonths = [];
  for (let i = 0; i < 6; i++) {
    const currDate = new Date(startDate);
    currDate.setMonth(currDate.getMonth() + i);

    currMonths.push(currDate);
  }

  return currMonths;
};

const PastBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [dateRange, setDateRange] = useState();
  
  const [data, config] = useMemo(() => {
    if (bookings.length === 0 || !dateRange) return [[], {}];

    let configData = {};
    const list = [];

    const currMonths = getCurrMonths(dateRange);

    const map = new Map();
    bookings.forEach(obj => {
      if (!map.has(obj.id_service)) {
        map.set(obj.id_service, { id: obj.id_service, name: obj.property_name });
      }
    });
    const distinctSerivces = Array.from(map.values());

    currMonths.forEach((monthData) => {
      let monthChart = {
        month: months[monthData.getMonth()],
      };

      distinctSerivces.forEach((servc, index) => {
        let count = bookings.filter((bookingItem) => {
          const schedule = new Date(bookingItem.schedule);
          return bookingItem.id_service === servc.id && schedule.getMonth() === monthData.getMonth();
        })?.length ?? 0;

        monthChart = {
          ...monthChart,
          [`service__${servc.id}`]: count,
        };

        configData = {
          ...configData,
          [`service__${servc.id}`]: {
            label: servc.name,
            color: `var(--chart-${index + 1})`,
          },
        }
      });

      list.push(monthChart);
    });

    return [list, configData];
  }, [bookings, dateRange]);

  console.log("Data/Config", data, config)

  const initiateData = (userData) => {
    const formData = new FormData();

    const start = new Date();
    const last = new Date();
    
    last.setMonth(last.getMonth() + 1);
    last.setDate(-1);
    start.setMonth(start.getMonth() - 5);
    start.setDate(1);

    formData.append("userId", userData.id);
    formData.append("startMonth", formatISODate(start));
    formData.append("lastMonth", formatISODate(last));

    fetch(`${import.meta.env.VITE_API_URL}/stats/lastMonths.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setBookings(data?.bookings ?? []);
        setDateRange({ startDate: start, lastDate: last });
      })
  }

  useEffect(() => {
    const userData = localStorage.getItem("user-data");
    if (!userData) return;

    const parsedData = JSON.parse(userData ?? "");

    if (!parsedData) return;

    initiateData(parsedData);
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>
          Showing total bookings for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.keys(config).map((item) => (
              <Area
                dataKey={item}
                type="natural"
                fill={`var(--color-${item})`}
                fillOpacity={0.4}
                stroke={`var(--color-${item})`}
                stackId="a"
              />
            ))}
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
};

export default PastBookings;