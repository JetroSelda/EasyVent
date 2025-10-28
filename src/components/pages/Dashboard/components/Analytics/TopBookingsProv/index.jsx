import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react";

const chartData = [
  { item: "January", item_count: 186, fill: "var(--chart-2)" },
  { item: "February", item_count: 305, mobile: 200 },
  { item: "March", item_count: 237, mobile: 120 },
  { item: "April", item_count: 73, mobile: 190 },
  { item: "May", item_count: 209, mobile: 130 },
  { item: "June", item_count: 214, mobile: 140 },
];

const chartConfig = {
  label: {
    color: "var(--background)",
  },
}

function TopBookingsProv() {
  const [bookings, setBookings] = useState([]);

  const data = useMemo(() => {
    if (bookings.length === 0) return [];

    const map = new Map();
    bookings.forEach(obj => {
      if (!map.has(obj.id_service)) {
        map.set(obj.id_service, { id: obj.id_service, name: obj.property_name });
      }
    });
    const distinctServices = Array.from(map.values());

    return distinctServices.map((item) => {
      const count = bookings.filter((booking) => booking.id_service === item.id)?.length ?? 0;

      return { item: item.name, item_count: count, fill: "var(--chart-2)" }
    })
  }, [bookings]);
  
  const initiateData = (userData) => {
    const formData = new FormData();

    formData.append("userId", userData.id);

    fetch(`${import.meta.env.VITE_API_URL}/services/allBookings.php`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setBookings(data?.bookings ?? []);
      })
  }

  console.log("All Bookings", bookings);

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
        <CardTitle>Top Services</CardTitle>
        <CardDescription>Showing your overall top serivces</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="item"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="item_count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="item_count"
              layout="vertical"
              fill="var(--color-item_count)"
              radius={4}
            >
              <LabelList
                dataKey="item"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              />
              <LabelList
                dataKey="item_count"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TopBookingsProv;